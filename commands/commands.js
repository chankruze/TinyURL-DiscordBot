/*
Author: chankruze (chankruze@geekofia.in)
Created: Thu Aug 20 2020 18:15:38 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/
const glob = require('glob');
const Discord = require('discord.js');

const config = require('config');
const prefix = config.get('prefix');

let commands = {
    [prefix + 'help']: 'To see all information about TinyURL',
    [prefix + 'invite']: 'To generate an invite link for your',
    [prefix + 'commands']: 'To see list all commands',
    [prefix + 'trim']: 'To shorten a long URL',
};

// function listCommands(path, prefix) {
//     var glob = require('glob')
//     var obj = {}
//     var command

//     glob.sync('*.js', { cwd: path, ignore: 'commands.js' }).forEach(function (option) {
//         command = option.replace(/\.js$/, '')
//         obj[`${prefix}${command}`] = command
//     })

//     return obj
// }

module.exports.run = (client, message, args) => {
    let commandsEmbed = new Discord.MessageEmbed()
        .setColor(config.get('bg-warning'))
        .setTitle('TinyURL-Commands')
        .setURL(config.get("url-home"))
        .setDescription("All available commands are listed below. **Note:** Commands are NOT case sensitive")
        .setThumbnail(config.get('url-logo'))

    for (elem in commands) {
        commandsEmbed.addField(`${config.get("emoji-keyboard")}  ${elem}`, `${config.get("ascii-arrow-right")}  ${commands[elem]}`)
    }

    commandsEmbed.setTimestamp()
        .setFooter(`Developed with ${config.get("emoji-heart")}  by chankruze`, config.get("url-avatar-git-geekofia"))

    // check if DM
    if (message.channel.type === 'dm') {
        message.channel.send(commandsEmbed)
    } else {
        const clientMember = message.guild.member(client.user);

        if (!message.channel.permissionsFor(clientMember).has('EMBED_LINKS')
            || !message.channel.permissionsFor(clientMember).has('SEND_MESSAGES')) {
            message.author.send(`I do not have permission to send messages in \`#${message.channel.name}\`...\nIf you believe this is incorrect then please ensure the channels permissions allow TinyURL to \`SEND_MESSAGES & EMBED_LINKS\`.`)
                .then(msg => msg.delete(10 * 1000)).catch(err => console.log(err.stack));
            return;
        } else {
            message.channel.send(commandsEmbed)
        }
    }
}