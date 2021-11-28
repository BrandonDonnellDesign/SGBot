const Discord = require("discord.js");
const thumbnailName = "crate.png";
const attachment = new Discord.MessageAttachment("./images/" + thumbnailName, thumbnailName);
const axios = require('axios');

var numberOfCurrentCrates = 0;

module.exports = {
    name: "crate",
    description: "Notification function for crate spawn.",
    execute(msg, channel, client) {
        //if (config.notifications.crate !== "true") return;

        let crateCounter = 0;

        for (let marker of msg) {
            if (marker.type === "Crate") {
                crateCounter++;
            }
        }

        if (crateCounter > numberOfCurrentCrates) {
            let title = "NOTIFICATION";
            let description = "A Crate just spawned somewhere on the map.";
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

        numberOfCurrentCrates = crateCounter;

        return true;
    },
};