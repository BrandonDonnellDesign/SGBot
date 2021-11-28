const Discord = require("discord.js");
const thumbnailName = "cargoShip.png";
const attachment = new Discord.MessageAttachment("./images/" + thumbnailName, thumbnailName);
const axios = require('axios');

var cargoActive = false;

module.exports = {
    name: "cargoShip",
    description: "Notification function for cargoShip active/inactive.",
    execute(msg,channel, client) {


        //if (config.notifications.cargoShip !== "true") return;

        if (cargoActive === false) {
            for (let marker of msg) {
                if (marker.type === 'CargoShip') {
                    cargoActive = true;
                    break;
                }
            }

            if (cargoActive) {
                let title = "NOTIFICATION";
                let description = "Cargo Ship is active."
                const embed = new Discord.MessageEmbed()
                .setColor("#ce412b")
                .attachFiles(attachment)
                .setThumbnail("attachment://" + thumbnailName)
                .setTitle(title)
                .setDescription(description);
    
                channel.send(embed);

                axios.post(`${process.env.LOCAL_IP2}/team/4/chat`, {
                    msg: `${title}: ${description}`,
                  })
            }
        }
        else {
            let cargoLeft = true;
            for (let marker of msg) {
                if (marker.type === 'CargoShip') {
                    cargoLeft = false;
                    break;
                }
            }

            if (cargoLeft) {
                cargoActive = false;
                let title = "NOTIFICATION";
                let description = "Cargo Ship just despawned."
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
        }

        return true;
    },
};