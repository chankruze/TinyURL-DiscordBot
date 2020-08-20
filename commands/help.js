/*
Author: chankruze (chankruze@geekofia.in)
Created: Thu Aug 20 2020 14:00:26 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const Discord = require('discord.js')

const config = require('config');
const prefix = config.get('prefix');

// Help Command
module.exports.run = (client, message, args) => {
    // inside a command, event listener, etc.
    const helpEmbed = new Discord.MessageEmbed()
        .setColor(config.get('bg-tiny-url'))
        .setTitle('TinyURL-Help')
        .setDescription('TinyURL is the easiest way to shorten long URLs in your Discord server as well as DM. It supports all direct urls!\n\n**Note**: It don\'t shorten already shortened URLs (by other services).')
        .setThumbnail(config.get('url-logo'))
        .setURL(config.get("url-home"))
        .addField('\u200b', '\u200b')
        .addField(`${config.get("emoji-keyboard")} Commands`, `${config.get("ascii-arrow-right")} To see all available commands, use \`${prefix}commands\`.`, false)
        .addField(`${config.get("emoji-money")} Donations`, `${config.get("ascii-arrow-right")} UPI: \`chankruze@oksbi\` | [scan QR code](${config.get("url-gpay-qr")})`, false)
        .addField('\u200b', '\u200b')
        .addFields(
            { name: `${config.get("emoji-link")} Add to Discord`, value: `[${config.get("emoji-pin")} Invite TinyURL](${config.get("url-invite")})`, inline: true },
            { name: `${config.get("emoji-chat")} Support Server`, value: `[${config.get("emoji-pin")} Join Geekofia](${config.get("url-invite")})`, inline: true },
            { name: `${config.get("emoji-mobile")} Install TinyURL App`, value: `[${config.get("emoji-pin")} Get it on Playstore](${config.get("url-playstore")})`, inline: true },
        )
        .setTimestamp()
        .setFooter(`Developed with ${config.get("emoji-heart")}  by chankruze`, config.get("url-avatar-git-geekofia"))

    // check if DM
    if (message.channel.type === 'dm') {
        message.channel.send(helpEmbed)
    } else {
        const clientMember = message.guild.member(client.user)

        if (!message.channel.permissionsFor(clientMember).has('EMBED_LINKS')
            || !message.channel.permissionsFor(clientMember).has('SEND_MESSAGES')) {
            message.author.send(`I do not have permission to send messages in \`#${message.channel.name}\`...\nIf you believe this is incorrect then please ensure the channels permissions allow TinyURL to \`SEND_MESSAGES & EMBED_LINKS\`.`)
                .then(msg => msg.delete(10 * 1000)).catch(err => console.log(err.stack))
            return;
        } else {
            message.channel.send(helpEmbed)
        }
    }
}
