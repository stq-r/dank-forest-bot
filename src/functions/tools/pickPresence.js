const { ActivityType } = require('discord.js')


module.exports = (client) => {
    // Sets the bot's status to a random option from the list
    client.pickPresence = async () => {
        const options = [
            {
                type: ActivityType.Watching,
                text: "over Dank Forest",
                status: "idle"

            },
            {
                type: ActivityType.Competing,
                text: "to get Dank Forest to 1k",
                status: "idle"

            },
            {
                type: ActivityType.Listening,
                text: "to DS | Stqr ✫#7166 scream at me",
                status: "idle"

            },
        ]

        // Pick a random index
        const option = Math.floor(Math.random() * options.length)

        // Apply the chosen presence
        client.user.setPresence({
            activities: [
                {
                    name: options[option].text,
                    type: options[option].type
                }
            ],
            status: options[option].status
        })
    }
}