const { EmbedBuilder, PermissionsBitField, ChannelType, SlashCommandBuilder, ActionRowBuilder, PermissionFlagsBits, client } = require('discord.js')

/**
 * Posts an embed announcing an event and pings the event role (limited to admins)
 */
module.exports = {
  // Command definition with the event, donator, prize, and message inputs (default permissions of 0 limit it to admins)
  data: new SlashCommandBuilder()
    .setName("eping")
    .setDescription("Pings event ping for an event!")
    .addStringOption(option =>
      option.setName('event')
        .setDescription('Name of the event you are running')
        .setRequired(true))

    .addStringOption(option =>
      option.setName('donator')
        .setDescription('Ping the user who donated towards the event')
        .setRequired(true))

    .addStringOption(option =>
      option.setName('prize')
        .setDescription('Prize of the event')
        .setRequired(true))

    .addStringOption(option =>
      option.setName('message')
        .setDescription('The input to say how much you are donating + what you are donating')
        .setRequired(true))
    .setDefaultMemberPermissions(0),



  async execute(interaction, client) {

    // Get the inputs
    let event = interaction.options.getString('event')
    let donator = interaction.options.getString('donator')
    let prize = interaction.options.getString('prize')
    let message = interaction.options.getString('message')

    const { roles } = interaction.member
    interaction.guild.roles.fetch('1049516178269294614')

    // Only members with this role can run the command
    if (roles.cache.has('1049516178269294614')) {


      // Event embed
      const embed = new EmbedBuilder()
        .setTitle(`<a:xs_gaw2:997198573122895972> **Dank Forest Event!** <a:xs_gaw2:997198573122895972>`)
        .setDescription(`<a:blue_heart:1033933112276684800> __Dank Forest is hosting an Event!!!__ \n \n <a:blue_arrow:1073838639588585523> **Event:** ${event} \n <a:blue_arrow:1073838639588585523> **Donator:** ${donator} \n <a:blue_arrow:1073838639588585523> **Prize:** ${prize} \n <a:blue_arrow:1073838639588585523> **Message:** ${message} \n <a:blue_arrow:1073838639588585523> **Channel:** <#977937904024305704>  \n \n \n Please thank donator for the event! <:thx:989029071163904010>`)
        .setColor(0x89CFF0)
        .setThumbnail('https://media.tenor.com/QWAo2echlVEAAAAM/cute.gif')
        .setFooter({
          iconURL: client.user.displayAvatarURL(),
          text: client.user.tag
        })


      // Replies with the embed and pings the role (only that role can be mentioned)
      await interaction.reply({
        content: '<@&977937713284149249>',
        embeds: [embed],
        allowedMentions: {
          roles: ['977937713284149249'],
        }
      })

    // Missing the role response
    } else {
      await interaction.reply({
        content: `You do not have the right permissions to run this command`, ephemeral: true
      })
    }

  }
}