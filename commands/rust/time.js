const axios = require('axios');
//Function to convert time
const convert = require("../../functions/time");

module.exports = {
  name: "time",
  aliases: [],
  description: "Grabs Current Server Time",
  guildOnly: false,
  async execute(message, args, Discord) {
    const timeInfo = await axios.get(`${process.env.LOCAL_IP}/server/time`).then(function (response) {
      return response.data;
    });
    // Conversion to hours and mins
    const time = convert.time(timeInfo.response.time.time);
    const sunrise = convert.time(timeInfo.response.time.sunrise);
    const sunset = convert.time(timeInfo.response.time.sunset);

    const thumbnailName = "rust_logo.png";
    const attachment = new Discord.MessageAttachment("./images/" + thumbnailName, thumbnailName);

    const embed = new Discord.MessageEmbed()
      .setTitle('Server Time')
      .attachFiles(attachment)
      .setThumbnail("attachment://" + thumbnailName)
      .setColor('#FF0000')
      .addFields({
        name: "Current Time:",
        value: time,
        inline: true,
      }, {
        name: "Sunrise:",
        value: sunrise,
        inline: true,
      }, {
        name: "Sunset:",
        value: sunset,
        inline: true,
      });
    message.channel.send(embed);
  },
};