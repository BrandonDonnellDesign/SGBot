const axios = require('axios');
module.exports = {
    name: 'pop',
    aliases: ['population'],
    description: 'Grabs Current Server Population',
    guildOnly: false,
    async execute(message,args, Discord) {
        //if args1 is not empty set id equal to args1 if empty set id equal to 1
        let id = args[0] || 1;

        server = await axios.get(`${process.env.LOCAL_IP}/server/population`).then(function (response) {
            return response.data;
        });
    
        const embed = new Discord.MessageEmbed()
        .setTitle(server.name)
        .setThumbnail(server.image)
        .addField("Server Population: " , server.population)
    
        message.channel.send(embed);
    }
}