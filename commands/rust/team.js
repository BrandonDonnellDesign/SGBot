const axios = require('axios');

module.exports = {
  name: "team",
  aliases: [],
  description: "Gives Current Team information",
  guildOnly:true,
  
  async execute(message,args, Discord) {
    
    teamData = await axios.get(`${process.env.LOCAL_IP}/team/`).then(function (response) {
        return response.data;
    });


    const thumbnailName = "rust_logo.png";
    const attachment = new Discord.MessageAttachment("./images/" + thumbnailName, thumbnailName);

    const members = teamData.response.teamInfo.members;
    const embed = new Discord.MessageEmbed()
      .setTitle('Team')
      .attachFiles(attachment)
      .setThumbnail("attachment://" + thumbnailName)
    members.forEach((member) => {
      embed.addFields(
        {
          name: "Member",
          value: member.name,
          inline: true,
        },
        {
          name: "Online",
          value: member.isOnline,
          inline: true,
        },
        {
          name: "Alive",
          value: member.isAlive,
          inline: true,
        },
        {
          name: "Coords",
          value: "X " + member.x + ", Y " + member.y,
          inline: true,
        }
      );
      embed.addField('\u200b', '\u200b');
    });
    message.channel.send(embed);
  },
};