module.exports = {
    name: 'raid',
    aliases: [],
    description: 'Send Image with all basic raid cost',
    guildOnly: false,
    execute(message,args, Discord) {
        if(!args[0]) return message.channel.send('Command need either basic or cheap.')
        
        if(args[0] === 'basic') {
            const embed = new Discord.MessageEmbed()
            .setTitle('All Basic Raid Cost')
            .setImage('https://preview.redd.it/6pypabaa6hd61.png?width=1761&format=png&auto=webp&s=aea0450431a35a039124b4d667590030ac147b50')
            message.channel.send(embed)
        }
        else if(args[0] === 'cheap') {
            const embed = new Discord.MessageEmbed()
            .setTitle('Cheapest Raid Cost')
            .setImage('https://preview.redd.it/22vx65aa6hd61.png?width=1761&format=png&auto=webp&s=e9fe05e6c45872aee208093538c2963cbe21095b')
            message.channel.send(embed)
        }
    }
}