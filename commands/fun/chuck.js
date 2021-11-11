const axios = require('axios');
module.exports = {
    name: 'chuck',
    aliases: ['norris'],
    description: "Random Chuck Norris Joke",
    guildOnly: false,
    async execute(message,args, Discord) {
        
        //Grabs Random joke
        data = await axios.get(`https://api.chucknorris.io/jokes/random`).then(function (response) {
            return response.data;
          })

        const embed = new Discord.MessageEmbed()
            .setTitle('Chuck Norris')
            .setThumbnail(
                data.icon_url
            )
            .addField("Joke: ", data.value)
          message.channel.send(embed);
    },
};