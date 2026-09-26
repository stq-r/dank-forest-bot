const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const DAY_IN_MS = 24 * 60 * 60 * 1000;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('grinderremove')
        .setDescription('Remove grinder payment days from a user.')
        .setDefaultMemberPermissions(0)
        .addUserOption(option => option
            .setName('user')
            .setDescription('User to remove payment days from')
            .setRequired(true))
        .addIntegerOption(option => option
            .setName('amount')
            .setDescription('Number of payment days to remove')
            .setMinValue(1)
            .setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');
        const result = await interaction.client.grinders.updateOne(
            { userid: user.id },
            [{
                $set: {
                    amount: { $subtract: [{ $ifNull: ['$amount', 0] }, amount] },
                    paidThrough: {
                        $subtract: [
                            { $ifNull: ['$paidThrough', { $literal: new Date() }] },
                            amount * DAY_IN_MS
                        ]
                    }
                }
            }]
        );

        if (!result.matchedCount) {
            return interaction.reply({
                content: `${user} is not in the grinder tracker.`,
                ephemeral: true
            });
        }

        const embed = new EmbedBuilder()
            .setTitle('Grinder Payment Removed!')
            .setDescription(`Removed ${amount} day(s) from ${user}'s grinder payment.`)
            .setColor('#FF0000')
            .setThumbnail('https://media1.giphy.com/media/KPVJXH61g2jHkdqZES/200w.gif?cid=6c09b952puhd0ne74xp4u962psnnp78joox53vnnjwji1ldg&ep=v1_gifs_search&rid=200w.gif&ct=g');

        await interaction.reply({ embeds: [embed] });
    }
};
