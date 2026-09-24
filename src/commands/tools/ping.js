const { SlashCommandBuilder } = require('discord.js')

/**
 * Replies with the bot's API latency and client ping
 */
module.exports = {

    // Command definition
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Return my ping!'),

    async execute(interaction, client) {

        // Acknowledge the command and fetch the reply message
        const message = await interaction.deferReply({
            fetchReply: true
        })

        // Compare the reply time to the command time for the client ping
        const newMessage = `API Latency: ${client.ws.ping} \n Client Ping: ${message.createdTimestamp - interaction.createdTimestamp}`

        // Edit the reply with the results
        await interaction.editReply({
            content: newMessage
        })
    }
}