const { readdirSync } = require('fs')

module.exports = (client) => {

    // Loads button and select menu files into the client's collections
    client.handleComponents = async () => {
        const componentFolders = readdirSync(`./src/components`)
        for (const folder of componentFolders) {
            const componentFiles = readdirSync(`./src/components/${folder}`).filter(
                (file) => file.endsWith(".js")
            )

            const { buttons, selectMenus } = client


            switch (folder) {

                // Store each button by its name
                case "buttons":
                    for (const file of componentFiles) {
                        const button = require(`../../components/${folder}/${file}`)
                        buttons.set(button.data.name, button)
                    }
                    break;


                // Store each select menu by its name
                case "selectMenus":
                    for (const file of componentFiles) {
                        const menu = require(`../../components/${folder}/${file}`)
                        selectMenus.set(menu.data.name, menu)
                    }
                    break
                default:
                    break
            }
        }
    }
}