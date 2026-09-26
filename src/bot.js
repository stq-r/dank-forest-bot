// Sets up the MongoDB client
require('dotenv').config();
const { MongoClient } = require('mongodb');


// Load the bot info from the .env file
const token = process.env.TOKEN || process.env.token;


// Sets up the MongoDB client
const database = process.env.DATABASE;
if (!database) {
    throw new Error('DATABASE must be set to a MongoDB connection string.');
}
const mongoClient = new MongoClient(database);


// Import what we need from discord.js
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');


// Create the client and the collections that store commands and components
const client = new Client({ intents: 32767 });
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];


// Load every function file in src/functions/<folder> and attach it to the client
const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith('.js'));
    for (const file of functionFiles) require(`./functions/${folder}/${file}`)(client);
}

// Connects to mongoDB to run the commands
async function connectToMongoDB() {
    await mongoClient.connect();

    client.grinders = mongoClient.db().collection('grinders');
    await client.grinders.createIndex({ userid: 1 }, { unique: true });
    await applyDailyGrinderDecrement();
    scheduleDailyGrinderDecrement();

    console.log('Successfully logged into MongoDB.');
    return mongoClient;
}

// Gets the UTC day start to reduce a day
function getUtcDayStart(date = new Date()) {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}


// Applies the decrememt to all of the grinders each day
async function applyDailyGrinderDecrement() {
    const today = getUtcDayStart();
    const cursor = client.grinders.find({
        $or: [
            { lastDailyDecrementDate: { $lt: today } },
            { lastDailyDecrementDate: { $exists: false } }
        ]
    });
    let updatedCount = 0;

    for await (const grinder of cursor) {
        const previousDate = grinder.lastDailyDecrementDate
            ? getUtcDayStart(new Date(grinder.lastDailyDecrementDate))
            : today;
        const daysElapsed = Math.max(0, Math.floor((today - previousDate) / (24 * 60 * 60 * 1000)));
        const filter = { userid: grinder.userid };
        if (grinder.lastDailyDecrementDate) {
            filter.lastDailyDecrementDate = grinder.lastDailyDecrementDate;
        } else {
            filter.lastDailyDecrementDate = { $exists: false };
        }

        const update = { $set: { lastDailyDecrementDate: today } };
        if (daysElapsed > 0) update.$inc = { amount: -daysElapsed };

        const result = await client.grinders.updateOne(filter, update);
        updatedCount += result.modifiedCount;
    }

    if (updatedCount > 0) {
        console.log(`Updated daily grinder countdown for ${updatedCount} grinder(s).`);
    }
}


// Schedules the decrement
function scheduleDailyGrinderDecrement() {
    const now = new Date();
    const nextUtcMidnight = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + 1
    ));

    setTimeout(async () => {
        try {
            await applyDailyGrinderDecrement();
        } catch (err) {
            console.error('Failed to apply daily grinder decrement:', err);
        } finally {
            scheduleDailyGrinderDecrement();
        }
    }, nextUtcMidnight.getTime() - now.getTime());
}

async function disconnectFromMongoDB() {
    await mongoClient.close();
}



// Start the handlers for events, slash commands, and buttons/menus/modals
client.handleEvents();
client.handleCommands();
client.handleComponents();


// Connect to MongoDB before starting the bot.
connectToMongoDB()
    .then(() => client.login(token))
    .catch(async (err) => {
        console.error('Failed to connect to MongoDB:', err);
        await mongoClient.close();
        process.exitCode = 1;
    });
