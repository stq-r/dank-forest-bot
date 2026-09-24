const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder, PermissionsBitField, PermissionFlagsBits } = require('discord.js')


/**
 * Creates a select menu and posts it (limited to admins)
 */
module.exports = {
    // Command definition (default permissions of 0 limit it to admins)
    data: new SlashCommandBuilder()
        .setName('menu')
        .setDescription('Return a select menu!')
        .setDefaultMemberPermissions(0),

    async execute(interaction, client) {
        const { roles } = interaction.member
        const role = await interaction.guild.roles.fetch('977937667037732904')

        // Only members with this role can run the command
        if (roles.cache.has('977937667037732904')) {

            // Select menu with four options (pick exactly one)
            const menu = new StringSelectMenuBuilder()
                .setCustomId(`sub-menu`)
                .setMinValues(1)
                .setMaxValues(1)
                .setOptions(new StringSelectMenuOptionBuilder({
                    label: `Option 1`,
                    value: `<@579779885141065738> is cool`
                }), new StringSelectMenuOptionBuilder({
                    label: `Option 2`,
                    value: `<@634076095175589909> is cool`
                }), new StringSelectMenuOptionBuilder({
                    label: `Option 3`,
                    value: `<@437040053412298773> is cool`
                }), new StringSelectMenuOptionBuilder({
                    label: `Option 4`,
                    value: `<@828992152913838080> is cool`
                }))

            // Replies with the menu
            await interaction.reply({
                components: [new ActionRowBuilder().addComponents(menu)]
            })

            // Missing the role response
        } else {
            await interaction.reply({
                content: `You do not have the right permissions to run this command`, ephemeral: true
            })
        }

    }
}