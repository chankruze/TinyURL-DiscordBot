/*
Author: chankruze (chankruze@geekofia.in)
Created: Tue Aug 18 2020 12:10:03 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/
const Discord = require('discord.js');

const config = require('config');
const prefix = config.get('prefix');

// Invite Command
module.exports.run = (client, message, args) => {
	let inviteEmbed = new Discord.MessageEmbed()
		.setColor(config.get('bg-success'))
		.setTitle('TinyURL-Invite')
		.setURL(config.get('url-home'))
		.setDescription("If you'd like to add TinyURL to your server please use the link below")
		.setThumbnail(config.get('url-logo'))

	client.generateInvite(config.get('required-permissions'))
		.then(link => {
			inviteEmbed.addField(`${config.get("emoji-pin")} Invitation Link`, `[${config.get("emoji-link")} ${config.get('url-invite-short')}](${link})`)
			inviteEmbed.setTimestamp()
				.setFooter(`Developed with ${config.get("emoji-heart")}  by chankruze`, config.get("url-avatar-git-geekofia"))
			message.author.send(inviteEmbed).catch(err => console.log(err.stack));
			console.log(`Invite link ${link} created and sent to ${message.author.username}`)
		}).catch(err => console.log(err.stack));

	if (message.channel.type != 'dm') {
		message.delete(0).catch(err => console.log(err.stack));
	}
}
