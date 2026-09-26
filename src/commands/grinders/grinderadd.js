const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function getUtcDayStart(date = new Date()) {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('grinderadd')
        .setDescription('Add grinder payment days for a user.')
        .setDefaultMemberPermissions(0)
        .addUserOption(option => option
            .setName('user')
            .setDescription('User receiving the payment days')
            .setRequired(true))
        .addIntegerOption(option => option
            .setName('amount')
            .setDescription('Number of payment days to add')
            .setMinValue(1)
            .setRequired(true))
        .addStringOption(option => option
            .setName('tier')
            .setDescription('Grinder tier for this user')
            .setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');
        const grinderTier = interaction.options.getString('tier').trim();

        if (!grinderTier) {
            return interaction.reply({ content: 'Grinder tier cannot be empty.', ephemeral: true });
        }

        const now = new Date();
        const today = getUtcDayStart(now);
        await interaction.client.grinders.updateOne(
            { userid: user.id },
            [{
                $set: {
                    userid: { $literal: user.id },
                    username: { $literal: user.username },
                    amount: { $add: [{ $ifNull: ['$amount', 0] }, amount] },
                    grinderTier: { $literal: grinderTier },
                    lastDailyDecrementDate: {
                        $ifNull: ['$lastDailyDecrementDate', { $literal: today }]
                    },
                    paidThrough: {
                        $add: [{ $ifNull: ['$paidThrough', { $literal: now }] }, amount * DAY_IN_MS]
                    }
                }
            }],
            { upsert: true }
        );

        const embed = new EmbedBuilder()
            .setTitle('Grinder Payment Added!')
            .setDescription(`Added ${amount} day(s) to ${user}'s grinder payment.\nTier: **${grinderTier}**`)
            .setColor('#097969')
            .setThumbnail('https://media.tenor.com/WsmiS-hUZkEAAAAj/verify.gif');

        await interaction.reply({ embeds: [embed] });
    }
};
