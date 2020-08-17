/*
Author: chankruze (chankruze@geekofia.in)
Created: Tue Aug 18 2020 12:12:45 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const isgd = require('./shorten');

// Trim Command
module.exports.run = (client, prefix, message, args) => {

	const clientMember = message.guild.member(client.user);

	// if (message.channel.type === 'dm') { return message.author.send('This command can only be used inside of guilds.'); }
	if (!message.channel.permissionsFor(clientMember).has('SEND_MESSAGES')) {
		message.author.send(`I do not have permission to send messages in \`#${message.channel.name}\`...\nIf you believe this is incorrect then please ensure the channels permissions allow CommandCleanup to \`MANAGE_MESSAGES\`.`)
			.then(msg => msg.delete(10 * 1000)).catch(err => console.log(err.stack))
		return
	}

	if (args.length > 0) {
		if (message.channel.permissionsFor(message.member).has('SEND_MESSAGES')) {
			switch (args[0]) {
				case 'help':
					message.author
						.send(`TinyURL Usage: *\`${prefix}trim <long url>\`* | \`<required>\``)
						.catch(err => console.log(err.stack));
					break;

				default:
					// message.channel.send(`Your Long URL is ${args[0]}`);
					let longUrl = args[0];

					isgd.shorten(longUrl, function (res) {
						message.channel.send(`${message.author} Your requested short URL is\n${res}`);
					});
				// shorten api call
			}
		} else {
			message.author
				.send(`You have insufficient permissions to use TinyURL command in \`#${message.channel.name}\``)
				.then(msg => msg.delete(10 * 1000))
				.catch(err => console.log(err.stack));
		}
	} else {
		message.author.send(`TinyURL Usage: *\`${prefix}trim <long url>\`* | \`<required>\``).catch(err => console.log(err.stack));
	}

	message.delete(0).catch(err => console.log(err.stack));
}
