/*
Author: chankruze (chankruze@geekofia.in)
Created: Thu Aug 20 2020 18:15:38 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/
const glob = require('glob')
const Discord = require('discord.js');

function listCommands(path, prefix) {
    var glob = require('glob')
    var obj = {}
    var command

    glob.sync('*.js', { cwd: path, ignore: 'commands.js' }).forEach(function (option) {
        command = option.replace(/\.js$/, '')
        obj[`${prefix}${command}`] = command
    })

    return obj
}

module.exports.run = (client, prefix, message, args) => {
    let obj = listCommands("./commands/", prefix)

    let commandEmbed = new Discord.MessageEmbed()
        .setColor('#007bff')
        .setTitle('TinyURL-Commands')
        .setURL('https://geekofia.in/TinyURL-DiscordBot')
        .setDescription("All available commands are listed below. **Note:** Commands are NOT case sensitive")


    for (elem in obj) {
        commandEmbed.addField(`\`${elem}\``, obj[elem])
    }

    commandEmbed.addField('\u200b', '\u200b')
        .setTimestamp()
        .setFooter('Developed with ❤️ by chankruze', 'https://avatars1.githubusercontent.com/u/41100705');

    message.channel.send(commandEmbed)
}