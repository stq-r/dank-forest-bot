const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js")

/**
 * Posts an embed explaining how to donate to heists (limited to admins)
 */
module.exports = {
    // Command definition (default permissions of 0 limit it to admins)
    data: new SlashCommandBuilder()
        .setName("hem")
        .setDescription("Returns an embed to tell how to donate to heists.")
        .setDefaultMemberPermissions(0),

    async execute(interaction, client) {
        const { roles } = interaction.member
        const role = await interaction.guild.roles.fetch('978352423036923904')

        // Only members with this role can run the command
        if (roles.cache.has('978352423036923904')) {

            // Embed with the heist donation instructions
            const embed = new EmbedBuilder()
                .setTitle(`Heist Donations`)
                .setDescription("**__Heist Donation:__**\nTo make a heist donation, run the command <\/serverevents donate:1011560371267579936> and donate your coins. The **minimum** amount of coins required to host a separate heist is 15m. If you meet these prerequisites and would like to make a requirement to your heist, please state so after you donate to the heist.\n \n**After that, please run the command <\/hdono:1069841761406558302>**\n \nThank you for your contributions!")
                .setColor(14583807)
                .setFooter({
                    iconURL: client.user.displayAvatarURL(),
                    text: client.user.tag
                })

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