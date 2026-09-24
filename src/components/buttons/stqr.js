/**
 * creates a button with the text stqr and returns an image
 */

module.exports = {
    data: {
        name: `stqr`
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `https://discord.gg/forests`
        })
    }
}