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


async function connectToMongoDB() {
    await mongoClient.connect();
    console.log('Successfully logged into MongoDB.');
    return mongoClient;
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
