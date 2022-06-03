export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    delay,
    getDate,
    formatDate,
    changeDateFormat,
    datesDiff
}

function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function delay(ms = 1500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

function getDate() {
    let date = new Date()
    // const newDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
    const newDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    return newDate
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

    if (month.length < 2)
        month = '0' + month
    if (day.length < 2)
        day = '0' + day

    return [year, month, day].join('-')
}

function changeDateFormat(input) {
    var datePart = input.match(/\d+/g),
        year = datePart[0].substring(2),
        month = datePart[1], day = datePart[2]
    return day + '/' + month + '/' + year
}

function datesDiff(date1, date2) {
    date1 = new Date(date1)
    date2 = new Date(date2)
    var timeDiff = Math.abs(date2.getTime() - date1.getTime())
    var numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24))
    // console.log(numberOfNights + " nights")
    return numberOfNights
}