module.exports = {
    name: 'rustlab',
    aliases: [],
    description: 'Link to RustLabs',
    guildOnly: true,
    async execute(message, args, Discord) {
        if (args[0] === 'building') {
            message.channel.send(`https://rustlabs.com/building/${args[0]}#tab=destroyed-by;filter=0,0,1,0,0,0;sort=4,0,2`)
        }
        else{
            message.channel.send(`https://rustlabs.com/item/${args[0]}#tab=destroyed-by;filter=0,0,1,0,0,0;sort=4,0,2`)
        }
    }
}