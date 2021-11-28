const Discord = require("discord.js");
const thumbnailName = "explosion_marker.png";
const attachment = new Discord.MessageAttachment("./images/" + thumbnailName, thumbnailName);
const axios = require('axios');

var numberOfExplosions = 0;

module.exports = {
    name: "explosion",
    description: "Notification function for explosion detected.",
    execute(msg, channel, client) {
        //if (config.notifications.explosion !== "true") return;

        let explosionCounter = 0;

        for (let marker of msg) {
            if (marker.type === "Explosion") {
                explosionCounter++;
            }
        }

        if (explosionCounter > numberOfExplosions) {
            let title = "NOTIFICATION";
            let description = "Explosion detected. Patrol Helicopter or Bradley APC have been taken down.";
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

        numberOfExplosions = explosionCounter;

        return true;
    },
};
