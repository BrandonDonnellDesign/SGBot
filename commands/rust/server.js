const axios = require('axios');
module.exports = {
    name: 'server',
    aliases: [],
    description: 'Grabs Server Info',
    guildOnly: false,
    async execute(message,args, Discord) {
        
        server = await axios.get(`${process.env.LOCAL_IP}/server/`).then(function (response) {
            return response.data;
        });

        const embed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle(server.name)
            .setThumbnail(server.headerImage)
            .addField("Map Size: ", server.mapSize)
            .addField("Server Population: ", server.players + "/" + server.maxPlayers)
            .addField("Map Seed: ", server.seed);
        message.channel.send(embed);
    }
}