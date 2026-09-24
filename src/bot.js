// Load the bot token from the .env file
require('dotenv').config();
const { token } = process.env;


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


// Start the handlers for events, slash commands, and buttons/menus/modals
client.handleEvents();
client.handleCommands();
client.handleComponents();


// Log the bot into Discord
client.login(token);
