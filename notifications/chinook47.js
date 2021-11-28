const Discord = require("discord.js");
const thumbnailName = "chinook47.png";
const attachment = new Discord.MessageAttachment("./images/" + thumbnailName, thumbnailName);
const axios = require('axios');

var numberOfActiveChinook = 0;

module.exports = {
    name: "chinook47",
    description: "Notification function for chinook 47 active/inactive.",
    execute(msg, channel, client) {
        //if (config.notifications.chinook47 !== "true") return;

        let chinookCounter = 0;

        for (let marker of msg) {
            if (marker.type === "CH47") {
                chinookCounter++;
            }
        }

        if (chinookCounter > numberOfActiveChinook) {
            let title = "NOTIFICATION";
            let description = "Chinook 47 is active. Oilrig might've been triggered or CH47 is ready to drop off a crate at a monument.";
            const embed = new Discord.MessageEmbed()
            .setColor("#ce412b")
            .attachFiles(attachment)
            .setThumbnail("attachment://" + thumbnailName)
            .setTitle(title)
            .setDescription(description);

            channel.send(embed);
            axios.post(`${process.env.LOCAL_IP}/team/4/chat`, {
                msg: `${title}: ${description}`,
              })
        }

        numberOfActiveChinook = chinookCounter;

        return true;
    },
};