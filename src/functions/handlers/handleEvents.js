const fs = require('fs')


module.exports = (client) => {

    // Loads event files and registers them on the client
    client.handleEvents = async () => {
        const eventFolders = fs.readdirSync(`./src/events`)

        for (const folder of eventFolders) {
            const eventFiles = fs.readdirSync(`./src/events/${folder}/`).filter((file) => file.endsWith(".js"))
            switch (folder) {

                // Client events (ready, etc.)
                case "client":
                    for (const file of eventFiles) {
                        const event = require(`../../events/${folder}/${file}`)

                        // Run once or on every trigger, depending on the event
                        if (event.once) client.once(event.name, (...args) => event.execute(...args, client))
                        else client.on(event.name, (...args) => event.execute(...args, client))
                    }
                    break;


                default:
                    break;
            }
        }
    }
}
