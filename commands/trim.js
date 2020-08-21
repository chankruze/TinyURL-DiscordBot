/*
Author: chankruze (chankruze@geekofia.in)
Created: Tue Aug 18 2020 12:12:45 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const isgd = require('../utils/shorten');

const config = require('config');
const prefix = config.get('prefix');

function shortenURL(message, args) {
	let arguments = {
		"-s": false,
		"-c": null,
		"-q": true,
		"-u": null
	};

	// check arguments length (if flags present grab flags and theirvalue)
	if (args.length > 1) {
		for (let index = 0; index < args.length; index += 2) {
			const elem = args[index];

			switch (elem) {
				case "-s":
				case "-c":
				case "-q":
				case "-u":
					arguments[elem] = args[index + 1];
					break;
				default:
					break;
			}
		}

		// console.log(arguments);
		const data = {
			longUrl: arguments["-u"],
			logStats: arguments["-s"],
			customUrl: arguments["-c"],
			generateQr: arguments["-q"]
		};

		isgd.shorten(data, (res, err) => {
			if (res) {
				const { shorturl, qrurl, statsurl } = res;
				let msg = `${config.get("emoji-tick")} ${message.author} URL shortened successfully!\n**Short URL:** ${shorturl}`;

				if (statsurl) {
					msg += `\n**Statistics URL:** ${statsurl}`;
				}

				if (qrurl) {
					msg += `\n**QR Code:** ${qrurl}`;
				}

				message.channel.send(msg);
			} else {
				const { errorcode, errormessage } = err;
				message.channel.send(`${config.get("emoji-warn")} ${message.author} Opps! something bad happened ;(\n**Error Code:** ${errorcode}\n**Error Message:** ${errormessage}`);
			}
		});
	} else {
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
				isgd.shorten({ longUrl: args[0] }, (res, err) => {
					if (res) {
						message.channel.send(`${config.get("emoji-tick")} ${message.author} Your requested short URL is ${res.shorturl}`);
					} else {
						const { errorcode, errormessage } = err;
						message.channel.send(`${config.get("emoji-warn")} ${message.author} Opps! something bad happened ;(\n**Error Code:** ${errorcode}\n**Error Message:** ${errormessage}`);
					}
				});
		}
	}
}

// Trim Command
module.exports.run = (client, message, args) => {
	if (args.length > 0) {
		if (message.channel.type === 'dm') {
			shortenURL(message, args);
			message.delete(0).catch(err => console.log(err.stack));
			return;
		} else {
			const clientMember = message.guild.member(client.user);

			if (!message.channel.permissionsFor(clientMember).has('SEND_MESSAGES')) {
				message.author.send(`I do not have permission to send messages in \`#${message.channel.name}\`...\nIf you believe this is incorrect then please ensure the channels permissions allow TinyURL to \`MANAGE_MESSAGES\`.`)
					.then(msg => msg.delete(10 * 1000)).catch(err => console.log(err.stack));
				return;
			}

			shortenURL(message, args);
			message.delete({ timeout: 0, reason: 'It had to be done.' });
		}
	} else {
		message.author.send(`TinyURL Usage: *\`${prefix}trim <long url>\`* | \`<required>\``).catch(err => console.log(err.stack));
		message.delete({ timeout: 0, reason: 'It had to be done.' });
	}
}
