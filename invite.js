/*
Author: chankruze (chankruze@geekofia.in)
Created: Tue Aug 18 2020 12:10:03 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

// Invite Command
module.exports.run = (client, prefix, message, args, con, dbl) => {
	client.generateInvite(['SEND_MESSAGES', 'MANAGE_MESSAGES'])
		.then(link => {
			message.author.send(`If you'd like to add TinyURL to your server please use the link below...\n${link}`).catch(err => console.log(err.stack));
			console.log(`Invite link ${link} created and sent to ${message.author.username}`);
		}).catch(err => console.log(err.stack));

	if (message.channel.type != 'dm') {
		message.delete(0).catch(err => console.log(err.stack));
	}
}
