/*
Author: chankruze (chankruze@geekofia.in)
Created: Tue Aug 18 2020 12:01:13 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

const discord = require('discord.js');
const DBL = require('dblapi.js');
const mysql = require('mysql');

const client = new discord.Client({ disableEveryone: true });
const dbl = new DBL(process.env.DBL_TOKEN);

var auth = require('./auth.json');

const prefix = auth.prefix;

//ready event
client.on('ready', () => {
	// Set the client user's status
	// client.user.setStatus('idle')
	// 	.then(console.log)
	// 	.catch(console.error);

	// Set the client user's activity
	client.user.setActivity('!trim', { type: 'LISTENING' })
		.then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
		.catch(console.error);

	console.log(`Logged in as ${client.user.username}!`);
	console.log(`Connected to ${client.guilds.size} servers`);

	client.setInterval(() => {
		dbl.postStats(client.guilds.size);
	}, 1800 * 1000);
});

let con = mysql.createConnection({
	host: process.env.SQL_HOST,
	user: process.env.SQL_USER,
	password: process.env.SQL_PASS,
	database: process.env.SQL_DATABASE,
	port: process.env.SQL_PORT
});

con.connect(err => {
	if (err) {
		console.log(err.stack);
	} else {
		console.log(`Connected to database`);
	}
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

	const args = message.content.split(/\s+/g);
	const command = args.shift().slice(prefix.length);

	try {
		let cmdFile = require(`./${command.toLowerCase()}.js`)
		cmdFile.run(client, prefix, message, args, con, dbl);
	} catch (err) {
		console.log(`cmdFile, ${command.toLowerCase()}.js does not exist`);
	}

})

client.on('guildCreate', guild => {
	guild.owner.send(`TinyURL has been added to your guild \`${guild.name}\`, if you'd like to see the features and commands for this bot please use the link provided below and also consider giving the bot an upvote...\nhttps://top.gg/bot/744989604997759016`);
	console.log(`TinyURL was added to, Name:${guild.name} | ID:${guild.id} | Members:${guild.memberCount}`);
})

//Client leave Guild Event
client.on('guildDelete', guild => {
	console.log(`TinyURL removed from, Name:${guild.name} | ID:${guild.id}`);
})

client.login(auth.token)
