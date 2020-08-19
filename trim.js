/*
Author: chankruze (chankruze@geekofia.in)
Created: Tue Aug 18 2020 12:12:45 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const isgd = require('./shorten');

function shortenURL(prefix, message, args) {
	if (args.length > 0) {
		switch (args[0]) {
			case 'help':
				// show usage in dm
				message.author
					.send(`TinyURL Usage: *\`${prefix}trim <long url>\`* | \`<required>\``)
					.catch(err => console.log(err.stack));
					
				// show usage in channel 
				message.channel.send(`TinyURL Usage: *\`${prefix}trim <long url>\`* | \`<required>\``)
					.catch(err => console.log(err.stack));
				break;

			default:
				let longUrl = args[0];

				isgd.shorten(longUrl, function (res) {
					message.channel.send(`${message.author} Your requested short URL is\n${res}`);
				});
		}
	} else {
		message.author.send(`TinyURL Usage: *\`${prefix}trim <long url>\`* | \`<required>\``).catch(err => console.log(err.stack));
	}
}

// Trim Command
module.exports.run = (client, prefix, message, args) => {

	if (message.channel.type === 'dm') {
		shortenURL(prefix, message, args);
		return;
	} else {
		const clientMember = message.guild.member(client.user);

		if (!message.channel.permissionsFor(clientMember).has('SEND_MESSAGES')) {
			message.author.send(`I do not have permission to send messages in \`#${message.channel.name}\`...\nIf you believe this is incorrect then please ensure the channels permissions allow TinyURL to \`MANAGE_MESSAGES\`.`)
				.then(msg => msg.delete(10 * 1000)).catch(err => console.log(err.stack));
			return;
		}

		shortenURL(prefix, message, args);
		message.delete(0).catch(err => console.log(err.stack));
	}
}
