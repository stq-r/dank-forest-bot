const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js")

/**
 * Posts an embed explaining how to donate to events (limited to admins)
 */
module.exports = {
    // Command definition (default permissions of 0 limit it to admins)
    data: new SlashCommandBuilder()
        .setName("eem")
        .setDescription("Returns an embed to tell how to donate to heists.")
        .setDefaultMemberPermissions(0),
    
    
        async execute(interaction, client) {
        const { roles } = interaction.member
        const role = await interaction.guild.roles.fetch('978352423036923904')

        // Only members with this role can run the command
        if (roles.cache.has('978352423036923904')) {

            // Embed with the event donation instructions
            const embed = new EmbedBuilder()
                .setTitle(`Event Donations`)
                .setDescription("To make an event donation, run the command **<\/edono:1069841761406558299>**. After that, you can donate to the server using \"\/serverevents donation\" (even if staff isn't online, we can add donation when we are)\n\n**After that, please use <\/edono:1069841761406558299>**\n\nThank you for contributions!")
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