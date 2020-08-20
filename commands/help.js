/*
Author: chankruze (chankruze@geekofia.in)
Created: Thu Aug 20 2020 14:00:26 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const Discord = require('discord.js');

// Help Command
module.exports.run = (client, prefix, message, args) => {
    // inside a command, event listener, etc.
    const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#007bff')
        .setTitle('TinyURL-Help')
        .setDescription('TinyURL is the easiest way to shorten long URLs in your Discord server as well as DM. It supports all direct urls!\n\n**Note**: It don\'t shorten already shortened URLs (by other services).')
        .setURL('https://geekofia.in/TinyURL-DiscordBot')
        .addField('\u200b', '\u200b')
        .addField('⌨️ Commands', `→ To see all available commands, use \`${prefix}commands\`.` , false)
        .addField('💰 Donations', '→ UPI: `chankruze@oksbi` | [scan QR code](https://res.cloudinary.com/chankruze/image/upload/v1597921018/Discord/IMG_20200820_162354.jpg)', false)
        .addField('\u200b', '\u200b')
        .addFields(
            { name: '🔗 Add to Discord', value: '[📌 Invite TinyURL](https://discord.com/api/oauth2/authorize?client_id=744989604997759016&permissions=26624&scope=bot)', inline: true },
            { name: '💬 Support Server', value: '[📌 Join Geekofia](http://discord.gg/uNKRMua)', inline: true },
            { name: '📱 Install TinyURL App', value: '[📌 Get it on Playstore](https://play.google.com/store/apps/details?id=com.geekofia.tinyurl)', inline: true },
        )
        .setTimestamp()
        .setFooter('Developed with ❤️ by chankruze', 'https://avatars1.githubusercontent.com/u/41100705');

    message.channel.send(exampleEmbed)
}
