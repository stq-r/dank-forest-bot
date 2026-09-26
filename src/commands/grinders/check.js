const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('check')
        .setDescription('Check a user\'s grinder payment.')
        .setDefaultMemberPermissions(0)
        .addUserOption(option => option
            .setName('user')
            .setDescription('User whose grinder payment to check')
            .setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const grinder = await interaction.client.grinders.findOne({ userid: user.id });

        if (!grinder) {
            return interaction.reply({
                content: `${user} is not in the grinder tracker.`,
                ephemeral: true
            });
        }

        const daysLeft = Math.ceil((new Date(grinder.paidThrough) - Date.now()) / (24 * 60 * 60 * 1000));
        const nextPay = new Date(grinder.paidThrough).toLocaleDateString();
        const embed = new EmbedBuilder()
            .setTitle(`${grinder.username}'s Grinder Payment`)
            .setDescription(`**Days paid:** ${grinder.amount}\n**Grinder tier:** ${grinder.grinderTier}\n**Next payment date:** ${nextPay} (in ${daysLeft} day(s))`)
            .setColor('#FFFF8F')
            .setThumbnail('https://www.icegif.com/wp-content/uploads/2022/05/icegif-609.gif');

        await interaction.reply({ embeds: [embed] });
    }
};
