const { REST } = require("@discordjs/rest")
const { Routes } = require('discord-api-types/v9')
const fs = require("fs");

const clientId = '1070572731885686834'
const guildId = '825767615577456660'

module.exports = (client) => {
    
    // Loads command files and registers them with Discord
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync("./src/commands")
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith(".js"))

            const { commands, commandArray } = client
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`)
                // Store the command by name and add its JSON data for registration
                commands.set(command.data.name, command)
                commandArray.push(command.data.toJSON())

            }



        }

        const clientId = '1056702524154982472'
        const guildId = '915627419774386216'
        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN || process.env.token)

        try {
            console.log(`Started refreshing application (/) commands.`);

            // Register all commands globally
            await rest.put(Routes.applicationCommands(clientId), {
                body: client.commandArray,
            });

            console.log(`Successfully reloaded application (/) commands.`);
        } catch (error) {
            console.error(error);
        }



    }
}
