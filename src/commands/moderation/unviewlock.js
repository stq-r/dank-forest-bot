const { EmbedBuilder, PermissionsBitField, ChannelType, SlashCommandBuilder, ActionRowBuilder, PermissionFlagsBits } = require('discord.js')

/**
 * Restores a channel's visibility for the Arborists role (limited to admins)
 */
module.exports = {
  // Command definition with a required text channel input (default permissions of 0 limit it to admins)
  data: new SlashCommandBuilder()
    .setName('unviewlock')
    .setDescription('Unviewlock the channel for Arborists!')
    .addChannelOption(option => option.setName('channel')
      .setDescription('The channel you want to unviewlock')
      .addChannelTypes(ChannelType.GuildText)
      .setRequired(true))
    .setDefaultMemberPermissions(0),

  async execute(interaction, client) {
    const { roles } = interaction.member
    interaction.guild.roles.fetch('991916408957063208')

    // Only members with this role can run the command
    if (roles.cache.has('991916408957063208')) {
      let channel = interaction.options.getChannel('channel')

      // Give view access to the channel back to the Arborists role
      channel.permissionOverwrites.edit('977937739691470858', { ViewChannel: true })

      // Confirmation embed
      const embed = new EmbedBuilder()
        .setColor(0x89CFF0)
        .setDescription(`<a:verified:937468649017577472> ${channel} has been **unviewlocked** for <@&977937739691470858>`)

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