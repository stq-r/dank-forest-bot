const { SlashCommandBuilder, EmbedBuilder, Embed, options, hyperlink, Client, } = require('discord.js')

/**
 * Posts an embed announcing a giveaway donation and pings the giveaway role
 */
module.exports = {
    // Command definition with the donation, time, winners, and optional requirement and message inputs
    data: new SlashCommandBuilder()
        .setName('gdono')
        .setDescription('Run this command to donate to the server!')
        .addStringOption(option =>
            option.setName('donation')
                .setDescription('The input to say how much you are donating + what you are donating')
                .setRequired(true))

        .addStringOption(option =>
            option.setName('time')
                .setDescription('The input to say how long you want the giveaway to be')
                .setRequired(true))

        .addStringOption(option =>
            option.setName('winners')
                .setDescription('How many winners should the giveaway have?')
                .setRequired(true))

        .addStringOption(option =>
            option.setName('req')
                .setDescription('The input to say how much you are donating + what you are donating')
                .setRequired(false))

        .addStringOption(option =>
            option.setName('message')
                .setDescription('The input to say how much you are donating + what you are donating')
                .setRequired(false)),



    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return

        // Get the inputs (requirement and message default to N/A)
        let donation = interaction.options.getString('donation')
        let time = interaction.options.getString('time')
        let winners = interaction.options.getString('winners')
        let req = interaction.options.getString('req') || '`N/A`'
        let message = interaction.options.getString('message') || '`N/A`'


        // Donation embed
        const embed = new EmbedBuilder()
            .setTitle(`<a:xs_gaw2:997198573122895972> **Dank Forest Giveaway Donation!** <a:xs_gaw2:997198573122895972>`)
            .setDescription(`<a:pink_arrow:1056620456817471600> **Donation:** ${donation} \n <a:pink_arrow:1056620456817471600> **Time (length):** ${time} \n <a:pink_arrow:1056620456817471600> **Winners:** ${winners} \n <a:pink_arrow:1056620456817471600> **Requirement:** ${req} \n <a:pink_arrow:1056620456817471600> **Message:** ${message} \n \n \n Thank you so much for your generous donation <:thx:989029071163904010>`)
            .setColor(0x097969)
            .setThumbnail('https://images-ext-1.discordapp.net/external/6uU6dV6wbr3fl3CasRh_JUD-D6Qih9f0YAnosGH5rPM/%3Fsize%3D1024/https/cdn.discordapp.com/icons/915627419774386216/c7ca79ef5efea9d1f034a12482e8166a.png')
            .setFooter({
                iconURL: client.user.displayAvatarURL(),
                text: client.user.tag
            })


            // Replies with the embed and pings the role (only that role can be mentioned)
            await interaction.reply({
                content: '<@&1049516012783009812>',
                embeds: [embed],
                allowedMentions: {
                  roles: ['1049516012783009812'],
                }
        })

    }
}