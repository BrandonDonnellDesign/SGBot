const axios = require("axios");
require("dotenv").config();
module.exports = {
    name: 'market',
    aliases: [],
    description: 'Search for items for sale in vending machines all over the server.',
    guildOnly: false,
    async execute(message, args, Discord) {
        const items = await axios.get(`${process.env.LOCAL_IP}/items.json`).then(function (response) {
            return response.data;
          })
        const thumbnailName = "vending_machine.png";
        const attachment = new Discord.MessageAttachment("./images/" + thumbnailName, thumbnailName);

        const apiDatas = await axios.get(`${process.env.LOCAL_IP}/server/map/markers`).then(function (response) {
            return response.data.response.mapMarkers.markers;
        });
        
        let originalSearchItemName = "";
        let searchItem = "";

        if (args[0]) {
            args.forEach(arg => {
                originalSearchItemName = originalSearchItemName + ' ' + arg
            });
            searchItem = originalSearchItemName.toLowerCase();
        }

        let title = "Market Search";
        let description = "";
        if (searchItem !== "") {
            description = "The result of a market search for the item **" + originalSearchItemName + "**.";
        } else {
            description = "The result of a market search.";
        }

        let maxLength = 4000;
        let currentLength = title.length + description.length;

        let embed = new Discord.MessageEmbed()
            .setColor("#ce412b")
            .attachFiles(attachment)
            .setThumbnail("attachment://" + thumbnailName)
            .setTitle(title)
            .setDescription(description);

        let resultsFound = false;
        for (let marker of apiDatas) {
            if (marker.type === "VendingMachine") {
                if (marker.hasOwnProperty("sellOrders")) {
                    let field = marker.name;
                    if (marker.name === "") {
                        field = "A Shop"
                    }
                    let str = ""

                    for (let order of marker.sellOrders) {
                        if (order.amountInStock === 0) {
                            continue;
                        }

                        let selling = (order.itemId in items) ? items[order.itemId].name : "Unknown";
                        let quantity = order.quantity;
                        let currency = (order.currencyId in items) ? items[order.currencyId].name : "Unknown";
                        let costPerItem = order.costPerItem;

                         /* If no specific item was provided. */
                         if (searchItem === "") {
                            resultsFound = true;

                            str += quantity + "x **" + selling + "** for " + costPerItem + "x **" + currency
                                + "**.\n";
                        }
                        else {
                            /* Does the order contain the specified item in question? */
                            if ((selling.toLowerCase()).includes(searchItem) ||
                                (currency.toLowerCase()).includes(searchItem)) {
                                resultsFound = true;
                                str += quantity + "x **" + selling + "** for " + costPerItem + "x **" + currency
                                    + "**.\n";
                            }
                        }
                    }
                    /* If no specified item was found in the shop. */
                    if (str === "") {
                        continue;
                    }
                    else {
                        if ((currentLength + field.length + str.length) < maxLength) {
                            currentLength += field.length + str.length;
                            embed.addField(field, str);
                        }
                        else {
                            message.channel.send(embed);

                            /* Clear the embed variable and replace with a fresh. */
                            embed = new Discord.MessageEmbed()
                                .setColor("#ce412b")
                                .attachFiles(attachment)
                                .setThumbnail("attachment://" + thumbnailName)
                                .setTitle(title)
                                .setDescription(description);

                            currentLength = title.length + description.length + field.length + str.length;
                            embed.addField(field, str);
                        }
                    }
                }
            }
        }
        if (!resultsFound) {
            description = "No market items found named **" + originalSearchItemName + "**.\nTry to run the " +
                "command *" + process.env.PREFIX + "market* without any arguments to get all market items.";
            embed.setDescription(description);
        }
        message.channel.send(embed);
    }
}