function time(number) {
    var newTime = new Date(0,0);
    newTime.setMinutes(+number * 60);
    var time = newTime.toTimeString().slice(0,5);
    return time;
}

module.exports = { time }