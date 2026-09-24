const { SlashCommandBuilder, EmbedBuilder, Embed, options, hyperlink, Client, } = require('discord.js')

/**
 * Posts an embed announcing a heist donation and pings the heist role
 */
module.exports = {
    // Command definition with the donation, separate heist, and optional message inputs
    data: new SlashCommandBuilder()
        .setName('hdono')
        .setDescription('Run this command to donate to a heist!')
        .addStringOption(option =>
            option.setName('donation')
                .setDescription('The input to say how much DMC you are donating')
                .setRequired(true))

        .addStringOption(option =>
            option.setName('separate')
                .setDescription('Whether the heist should be a separate heist (min: 10m)')
                .setRequired(true))

        .addStringOption(option =>
            option.setName('message')
                .setDescription('The input to say how much you are donating + what you are donating')
                .setRequired(false)),



    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return

        // Get the inputs (message defaults to N/A)
        let donation = interaction.options.getString('donation')
        let separate = interaction.options.getString('separate')
        let message = interaction.options.getString('message') || '`N/A`'


        // Donation embed
        const embed = new EmbedBuilder()
            .setTitle(`<a:xs_gaw2:997198573122895972> **Dank Forest Giveaway Donation!** <a:xs_gaw2:997198573122895972>`)
            .setDescription(`<a:pink_arrow:1056620456817471600> **Donation:** ${donation} \n <a:pink_arrow:1056620456817471600> **Separate heist?** ${separate} \n <a:pink_arrow:1056620456817471600> **Message:** ${message} \n \n \n Thank you so much for your generous donation <:thx:989029071163904010>`)
            .setColor(0x097969)
            .setThumbnail('https://images-ext-1.discordapp.net/external/6uU6dV6wbr3fl3CasRh_JUD-D6Qih9f0YAnosGH5rPM/%3Fsize%3D1024/https/cdn.discordapp.com/icons/915627419774386216/c7ca79ef5efea9d1f034a12482e8166a.png')
            .setFooter({
                iconURL: client.user.displayAvatarURL(),
                text: client.user.tag
            })


        // Replies with the embed and pings the role (only that role can be mentioned)
        await interaction.reply({
            content: '<@&991916408957063208>',
            embeds: [embed],
            allowedMentions: {
                roles: ['991916408957063208'],
            }
        })

    }
}