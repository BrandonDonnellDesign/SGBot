module.exports = {
    name: 'map',
    aliases: [],
    description: 'Send image of current map',
    guildOnly: false,
    execute(message,args, Discord) {
        const attachment = new Discord.MessageAttachment(`${process.env.LOCAL_IP}/map.jpg`, 'map.jpg');
        const embed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Map')
            .attachFiles(attachment)
            .setImage('attachment://map.jpg');
        message.channel.send(embed)
    }
}