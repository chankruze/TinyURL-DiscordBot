/*
Author: chankruze (chankruze@geekofia.in)
Created: Tue Aug 18 2020 12:01:13 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

if (!process.env.BOT_TOKEN) {
	require('dotenv').config({ path: __dirname + '/.env' });
}

const config = require('config');
const discord = require('discord.js');
// const DBL = require('dblapi.js');

const client = new discord.Client({ disableEveryone: true });
// const dbl = new DBL(process.env.DBL_TOKEN);

const prefix = config.get('prefix');

// ready event
client.on('ready', () => {
	// Set the client user's activity
	client.user.setActivity(`${prefix}help`, { type: 'LISTENING' })
		.then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
		.catch(console.error);

	console.log(`Logged in as ${client.user.username}!`);
	console.log(`Connected to ${client.guilds.cache.size} servers`);

	// client.setInterval(() => {
	// 	dbl.postStats(client.guilds.cache.size);
	// }, 1800 * 1000);
});

client.on('message', async message => {
	if (message.channel.type != 'dm') {
		if (message.guild.member(client.user)) {
			let user = message.guild.member(client.user);
			if (message.channel.permissionsFor(user).has('SEND_MESSAGES')) {
				if (/(?:https:?\/)?discord(?:app.com\/invite|.gg)/gi.test(message.content)) {
					let msgUser = message.guild.member(message.author);
					if (!msgUser.hasPermission('ADMINISTRATOR', false, true, true)) {
						message.delete(0).catch(err => console.log(err.stack));
						return;
					}
				}
			}
		}
	}

	if (!message.content.startsWith(prefix)) {
		return;
	}

	// --trim -s yes -c hello -q yes -u test.com

	const args = message.content.split(/\s+/g);
	const command = args.shift().slice(prefix.length);
	try {
		let cmdFile = require(`./commands/${command.toLowerCase()}.js`);
		cmdFile.run(client, message, args);
	} catch (err) {
		console.error(err);
	}
});

// Client add Guild Event
client.on('guildCreate', guild => {
	guild.owner.send(`TinyURL has been added to your guild \`${guild.name}\`, if you'd like to see the features and commands for this bot please use the link provided below and also consider giving the bot an upvote...\nhttps://top.gg/bot/744989604997759016`);
	console.log(`TinyURL was added to, Name:${guild.name} | ID:${guild.id} | Members:${guild.memberCount}`);
});

// Client leave Guild Event
client.on('guildDelete', guild => {
	console.log(`TinyURL removed from, Name:${guild.name} | ID:${guild.id}`);
});

client.login(process.env.BOT_TOKEN);
