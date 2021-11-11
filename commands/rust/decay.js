//Function to calculate decay
const decayFunction = require("../../functions/decay");
const axios = require("axios")
module.exports = {
    name: 'decay',
    aliases: [],
    description: 'Gives time left to decay',
    guildOnly: false,
    async execute(message, args, Discord) {
        const decay = await axios.get(`${process.env.LOCAL_IP}/decay.json`).then(function (response) {
            return response.data;
          })
        searchItem = args[0];
        for(const decays of decay) {
            names = decays.name
            if((names.toLowerCase()).includes(searchItem) && parseInt(args[1]) <= decays.health) {
                decayFunction.decay(args[1], decays.health, decays.time)
                message.channel.send(`A ${decays.name}, with ${args[1]} hp, has ${timeLeft} mins left till total decay!`)
            }
        }
    }
}