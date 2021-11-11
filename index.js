const fs = require('fs');
require("dotenv").config();
const Discord = require('discord.js');
const prefix = process.env.PREFIX;
const token = process.env.DISCORD_TOKEN
const mongoose = require('mongoose');

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