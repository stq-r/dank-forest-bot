const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js")

/**
 * Creates a sample embed and posts it (limited to admins)
 */
module.exports = {
    // Command definition (default permissions of 0 limit it to admins)
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Returns an embed.")
        .setDefaultMemberPermissions(0),

    async execute(interaction, client) {
        const { roles } = interaction.member
        const role = await interaction.guild.roles.fetch('977937667037732904')

        // Only members with this role can run the command
        if (roles.cache.has('977937667037732904')) {

            // Sample embed with an image, thumbnail, link, and three fields
            const embed = new EmbedBuilder()
                .setTitle(`This is an EMBED!`)
                .setDescription('This is a very cool description')
                .setColor(0o000000)
                .setImage('https://images-ext-1.discordapp.net/external/6uU6dV6wbr3fl3CasRh_JUD-D6Qih9f0YAnosGH5rPM/%3Fsize%3D1024/https/cdn.discordapp.com/icons/915627419774386216/c7ca79ef5efea9d1f034a12482e8166a.png')
                .setThumbnail('https://images-ext-1.discordapp.net/external/6uU6dV6wbr3fl3CasRh_JUD-D6Qih9f0YAnosGH5rPM/%3Fsize%3D1024/https/cdn.discordapp.com/icons/915627419774386216/c7ca79ef5efea9d1f034a12482e8166a.png')
                .setFooter({
                    iconURL: client.user.displayAvatarURL(),
                    text: client.user.tag
                })
                .setURL(`https://discord.gg/forests`)
                .addFields([
                    {
                        name: `Field 1`,
                        value: `Field Val 1`,
                        inline: false
                    },
                    {
                        name: `Field 2`,
                        value: `Field Val 2`,
                        inline: false
                    },
                    {
                        name: `Field 3`,
                        value: `Field Val 3`,
                        inline: false
                    }
                ])

            // Replies with the embed
            await interaction.reply({
                embeds: [embed]
            })

        // Missing the role response
        } else {
            await interaction.reply({
                content: `You do not have the right permissions to run this command`, ephemeral: true
            })
        }
    }

}