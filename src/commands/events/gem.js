const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js")

/**
 * Posts an embed explaining how to donate to giveaways (limited to admins)
 */
module.exports = {
    // Command definition (default permissions of 0 limit it to admins)
    data: new SlashCommandBuilder()
        .setName("gem")
        .setDescription("Returns an embed to tell how to donate to giveaways.")
        .setDefaultMemberPermissions(0),

    async execute(interaction, client) {
        const { roles } = interaction.member
        const role = await interaction.guild.roles.fetch('978352423036923904')

        // Only members with this role can run the command
        if (roles.cache.has('978352423036923904')) {

            // Embed with the giveaway rules and donation steps
            const embed = new EmbedBuilder()
                .setTitle(`Giveaway Donations`)
                .setDescription("\u2500\u2500 \u22c5 \u22c5 \u2500\u2500 \u2729 \u2500\u2500 \u22c5 \u22c5 \u2500\u2500\u2500\u2500 \u22c5 \u22c5 \u2500\u2500 \u2729 \u2500\u2500 \u22c5 \u22c5 \u2500\u2500\u2500\u2500 \u22c5 \u22c5 \u2500\u2500 \u2729 \u2500\u2500 \u22c5 \u22c5 \u2500\u2500\n**Giveaway Rules:**\n<a:pink_dot:1056789996150997053> The time for giveaways `under 15m` must not be longer than 1d\n<a:pink_dot:1056789996150997053> ALL giveaways with requirements MUST have the <@&1007912270824751135> \n<a:pink_dot:1056789996150997053> Booster and grinder multi will **not be removed** `no exceptions`\n<a:pink_dot:1056789996150997053> `private\/vip roles` are not allowed to be made a requirement\n\n\u2500\u2500 \u22c5 \u22c5 \u2500\u2500 \u2729 \u2500\u2500 \u22c5 \u22c5 \u2500\u2500\u2500\u2500 \u22c5 \u22c5 \u2500\u2500 \u2729 \u2500\u2500 \u22c5 \u22c5 \u2500\u2500\u2500\u2500 \u22c5 \u22c5 \u2500\u2500 \u2729 \u2500\u2500 \u22c5 \u22c5 \u2500\u2500\n**Donation Steps:**\n<a:pink_dot:1056789996150997053> Run <\/gdono:1069841761406558301> and fill out the options\n<a:pink_dot:1056789996150997053> Run <\/serverevents donate:1011560371267579936> to donate\n<a:pink_dot:1056789996150997053> Wait patiently while a staff creates the giveaway!\n\n<a:pink_arrow:1056620456817471600> Thank you for your contributions! <a:l_panda_heart:1041938397884858399>")
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