/**
 * Builds the interations with the different things in the bot (slash cmds, buttons, menus)
 */


module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        // Slash commands
        if (interaction.isChatInputCommand()) {
            const { commands } = client
            const { commandName } = interaction
            const command = commands.get(commandName)
            if (!command) return

            try {
                await command.execute(interaction, client)
            } catch (error) {
                console.error(error)
                await interaction.reply({
                    content: `Something went wrong while executing this command...`,
                    ephermeral: true
                })

            }

            // Buttons
        } else if (interaction.isButton()) {
            const { buttons } = client
            const { customId } = interaction
            const button = buttons.get(customId)
            if (!button) return new Error('There is no code for this button')

            try {
                await button.execute(interaction, client)
            } catch (err) {
                console.error(err)
            }


            // Select menus
        } else if (interaction.isSelectMenu()) {
            const { selectMenus } = client
            const { customId } = interaction
            const menu = selectMenus.get(customId)
            if (!menu) return new Error("There is no code for this select menu.")

            try {
                await menu.execute(interaction, client)
            } catch (err) {
                console.error(error)
            }


        }

    }
}