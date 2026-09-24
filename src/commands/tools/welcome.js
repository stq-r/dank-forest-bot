const { SlashCommandBuilder, EmbedBuilder, Embed} = require("discord.js")


/**
 * Creates an embed for the welcome message and posts it (limited to admins)
 */
module.exports = {
    // Command definition (default permissions of 0 limit it to admins)
    data: new SlashCommandBuilder()
        .setName("welcome")
        .setDescription("Returns an embed.")
        .setDefaultMemberPermissions(0),

    async execute(interaction, client) {
        const { roles } = interaction.member
        const role = await interaction.guild.roles.fetch('977937667037732904')
        

        // Only members with this role can run the command
        if (roles.cache.has ('977937667037732904')) {

            // First embed: welcome message and what the server offers
            const embed = new EmbedBuilder()
                .setTitle(`✧*:･ Welcome to Dank Forest!`)
                .setDescription('We are a growing Dank Memer server where members of all kind can join us in chat, grind, and win some DMC! Since we house members from all over the world, please be kind and respectful to eachother no matter the `race, gender, age, or ethnic background`. With that said, we like to keep chat free of foul language and unkind words. ')
                .setColor(0x5F9EA0)
                .setThumbnail('https://images-ext-1.discordapp.net/external/6uU6dV6wbr3fl3CasRh_JUD-D6Qih9f0YAnosGH5rPM/%3Fsize%3D1024/https/cdn.discordapp.com/icons/915627419774386216/c7ca79ef5efea9d1f034a12482e8166a.png')
                .setFooter({
                    iconURL: client.user.displayAvatarURL(),
                    text: `Dank Forest | Road to 2.5k`
                })
                .addFields([
                    {
                        name:`────────────❀*̥˚───────❀*̥˚──↝`,
                        value:"**What we offer with Dank Memer!** \n <a:pink_arrow:1056620456817471600> We host `daily 50m heists` where members typically get **1m+** payouts \n <a:pink_arrow:1056620456817471600> We host `insane giveaways` and well as occasional **nitro giveaways** \n <a:pink_arrow:1056620456817471600> Finally, we offer HUGE events with `1B coin heists \n`",
                        inline: false
                    },
                    {
                        name:`────────────❀*̥˚───────❀*̥˚──↝`,
                        value:"**Non Dank Related Stuff we offer:** \n <a:white_arrow:1056619671668936724> Lots of `amazing` members you can talk to \n <a:white_arrow:1056619671668936724> Amazing `staff and mods` that will readily help you with problems/issues \n <a:white_arrow:1056619671668936724> Fun and cool emojis that you can use <a:blue_heart:1033933112276684800>",
                        inline: false
                    }
                ])
            // Second embed: getting started guide
            const embed2 = new EmbedBuilder()
                .setTitle(`✧*:･ Getting Started`)
                .setDescription('────────────❀*̥˚───────❀*̥˚──↝ \n <a:pink_arrow:1056620456817471600> First off, please check out and read through <#977937842565156997>\n\n <a:pink_arrow:1056620456817471600> After that, I would **highly suggest** taking a peak at all the `roles you can have`, ranging from the color roles in <#977937846432301167> to ping roles in <#977937844259672114>.\n\n <a:pink_arrow:1056620456817471600> Then, I would suggest taking a peak at all `our perks` in <#977937861368229959>.\n\n <a:pink_arrow:1056620456817471600> Next, I suggest saying \u201cHi\u201d in <#977937871526850630>, where you can engage with `many of the other server members`.\n\n <a:pink_arrow:1056620456817471600> Finally, if you are really **enjoying the server**, feel free to donate in <#977937889356820542>, <#977937898529771540>, or <#977937909049086113>. If you are REALLY enjoying this server, you can `boost the server` as well, which would be **greatly** appreciated.\n\nOnce again, thank you so much! <:DogLove:1007484141467611156> \n ~Dank Forest Staff Team')
                .setColor(0x5F9EA0)
                .setImage('https://thumbs.gfycat.com/FilthyEarnestDegu-max-1mb.gif')
                .setThumbnail('https://images-ext-1.discordapp.net/external/6uU6dV6wbr3fl3CasRh_JUD-D6Qih9f0YAnosGH5rPM/%3Fsize%3D1024/https/cdn.discordapp.com/icons/915627419774386216/c7ca79ef5efea9d1f034a12482e8166a.png')
                .setFooter({
                    iconURL: client.user.displayAvatarURL(),
                    text: `Dank Forest | Road to 2.5k`
                })


            // Replies with both embeds
            await interaction.reply({
                embeds: [embed, embed2]
            })

        // Missing the role response
        } else {
            await interaction.reply({
                content: `You do not have the right permissions to run this command`, ephemeral: true 
            })
        }
    }

}