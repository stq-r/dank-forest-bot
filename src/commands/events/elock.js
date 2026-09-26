const { EmbedBuilder, PermissionsBitField, ChannelType, SlashCommandBuilder, ActionRowBuilder, PermissionFlagsBits } = require('discord.js')

/**
 * Stops the Arborists role from sending messages in an event channel (limited to admins)
 */
module.exports = {
    // Command definition with a required text channel input (default permissions of 0 limit it to admins)
    data: new SlashCommandBuilder()
        .setName('elock')
        .setDescription('Locks the event channel!')
        .addChannelOption(option => option.setName('channel')
            .setDescription('The channel you want to viewlock')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true))
        .setDefaultMemberPermissions(0),

    async execute(interaction, client) {
        const { roles } = interaction.member
        interaction.guild.roles.fetch('1049516178269294614')

        // Only members with this role can run the command
        if (roles.cache.has('1049516178269294614')) {
            let channel = interaction.options.getChannel('channel')


            // Remove send access in the channel for the Arborists role
            await channel.permissionOverwrites.edit('977937739691470858', { SendMessages: false })

                // Confirmation embed
                const embed = new EmbedBuilder()
                    .setColor(0x89CFF0)
                    .setDescription(`<a:verified:937468649017577472> ${channel} has been **locked** for <@&977937739691470858>`)

                // Replies with the embed
                await interaction.reply({ embeds: [embed] })


        // Missing the role response
        } else {
            await interaction.reply({
                content: `You do not have the right permissions to run this command`, ephemeral: true
            })
        }

    }



}
