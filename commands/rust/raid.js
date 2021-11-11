module.exports = {
    name: 'raid',
    aliases: [],
    description: 'Send Image with all basic raid cost',
    guildOnly: false,
    execute(message, args, Discord) {
        if (!args[0]) return message.channel.send('Command need either basic or cheap.')

        const embed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        if (args[0] === 'basic') {
            embed.setTitle('Basic Raid Cost')
            embed.setImage('https://preview.redd.it/6pypabaa6hd61.png?width=1761&format=png&auto=webp&s=aea0450431a35a039124b4d667590030ac147b50')
        } else if (args[0] === 'cheap') {
            embed.setTitle('Cheapest Raid Cost')
            embed.setImage('https://preview.redd.it/22vx65aa6hd61.png?width=1761&format=png&auto=webp&s=e9fe05e6c45872aee208093538c2963cbe21095b')
        }
        message.channel.send(embed)
    }
}