const fs = require('fs');
require("dotenv").config();
const Discord = require('discord.js');
const prefix = process.env.PREFIX;
const token = process.env.DISCORD_TOKEN
const mongoose = require('mongoose');

const axios = require("axios");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}


client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('with code!', {type: "PLAYING"});
	async function mapMarkerPolling() {
		/* Get the map markers from the server. */
		const msg = await axios.get(`${process.env.LOCAL_IP}/server/4/map/`).then(function (response) {
			return response.data.response.mapMarkers.markers;
		});
		let channel = client.channels.cache.get("914661140133462026");
		/* Update notifications */
		for (const notification of notifications) {
			notification.execute(msg,channel, client);
		}
		
		setTimeout(mapMarkerPolling, 10000);
	}
	
	var notifications = [];
	
	/* Extract all the notification files from the notifications directory. */
	const notificationFiles = fs.readdirSync("./notifications").filter(file => file.endsWith(".js"));
	/* Add the file to notifications list. */
	for (const file of notificationFiles) {
		const notification = require("./notifications/" + file);
		notifications.push(notification);
	}
	
	mapMarkerPolling()
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You can\'t do this!');
		}
	}

	try {
		command.execute(message, args, Discord);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

mongoose.connect(process.env.MONGODB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(()=>[
	console.log('Connected to Database!')
]).catch((err) => {
	console.log(err)
});

client.login(token);