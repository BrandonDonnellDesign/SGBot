//Returns remaining durability from total durability as decay then calculates timeLeft
function decay(dur, health, time) {
    decay = dur / health
    timeLeft = Math.round(decay * time)
}

module.exports = { decay }