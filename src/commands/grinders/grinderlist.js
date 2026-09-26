const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const MAX_DESCRIPTION_LENGTH = 3900;
const GRINDER_ROLE_ID = '977937679033442304';

function chunkLines(lines) {
    const chunks = [];
    let current = '';

    for (const line of lines) {
        const next = current ? `${current}\n${line}` : line;
        if (next.length > MAX_DESCRIPTION_LENGTH && current) {
            chunks.push(current);
            current = line;
        } else {
            current = next;
        }
    }

    if (current) chunks.push(current);
    return chunks;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('grinderlist')
        .setDescription('List grinder payments and users due for demotion.')
        .setDefaultMemberPermissions(0),

    async execute(interaction) {
        await interaction.deferReply();
        const grinders = await interaction.client.grinders.find({}).sort({ username: 1 }).toArray();
        const paymentLines = grinders.map(grinder => {
            const daysLeft = Math.ceil((new Date(grinder.paidThrough) - Date.now()) / (24 * 60 * 60 * 1000));
            return `• **${grinder.username}** (${grinder.userid}) — ${grinder.amount} day(s), tier **${grinder.grinderTier}**; next payment in ${daysLeft} day(s)`;
        });
        const overdueLines = grinders
            .map(grinder => ({
                grinder,
                daysLeft: Math.ceil((new Date(grinder.paidThrough) - Date.now()) / (24 * 60 * 60 * 1000))
            }))
            .filter(({ daysLeft }) => daysLeft <= -3)
            .map(({ grinder, daysLeft }) => `• ${grinder.username} (${grinder.userid}) — ${Math.abs(daysLeft)} day(s) overdue`);

        const lines = [
            '**Grinder payments**',
            ...(paymentLines.length ? paymentLines : ['No grinders are registered.']),
            '',
            '**Grinders at least 3 days overdue**',
            ...(overdueLines.length ? overdueLines : ['None'])
        ];
        const chunks = chunkLines(lines);

        for (let index = 0; index < chunks.length; index++) {
            const embed = new EmbedBuilder()
                .setTitle(index === 0 ? 'Grinder Payments' : 'Grinder Payments (continued)')
                .setDescription(chunks[index])
                .setColor('#AFE1AF');
            const payload = { embeds: [embed] };

            if (index === 0) {
                payload.content = `<@&${GRINDER_ROLE_ID}>`;
                payload.allowedMentions = { roles: [GRINDER_ROLE_ID] };
                await interaction.editReply(payload);
            } else {
                await interaction.followUp(payload);
            }
        }
    }
};
