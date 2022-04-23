import dayjs from 'dayjs'

const data = require('./data.json')

const sorted = data.sort((a, b) => {
    if(a.time > b.time){
        return 1
    }
    if(a.time < b.time){
        return -1
    }
    return 0
})
const last = sorted[sorted.length-1]
const first = sorted[0]


export function getUserData({ limit, day, hour }){
    return data.sort((a, b) => {
        if(a.time > b.time){
            return 1
        }
        if(a.time < b.time){
            return -1
        }
        return 0
    }).map(data => {
        return {
            ...data,
            displayTime: dayjs(data.time)
            // displayTime: dayjs(data.time).format()
        }
    }).filter((data, index) => {
        if(hour){
            return (data.displayTime.hour() == hour) && (index < limit)
        } else if (day){
            return (data.displayTime.day() == day) && (index < limit)
        } else {
            return index < limit
        }
        // return day ? 
        // (data.displayTime.day() == day) && (index < limit)
        // : (index < limit)
    })
}

export function getDates(){
    first.displayTime = dayjs(first.time)
    last.displayTime = dayjs(last.time)

    // console.log('first', first.displayTime.format())
    // console.log('last', last.displayTime.format())

    let diff = last.displayTime.diff(first.displayTime, 'day')
    // console.log('diff', diff)

    let format = 'ddd M-D'

    let hours = getHours(first.displayTime)

    let dates = [
        {
            title: first.displayTime.format(format),
            value: first.displayTime,
            hours: hours
        },
    ]
    for(var i = 0; i < diff; i++) {
        let newDate = first.displayTime.add(i+1, 'day').hour(0)
        let choice = {
            title: newDate.format(format),
            value: newDate,
            hours: getHours(newDate)
        }
        dates.push(choice)
        // dates.push(first.displayTime.add(1, 'day').format())
    }

    dates[dates.length-1] = {
        title: last.displayTime.format('ddd M-D'),
        value: last.displayTime,
        hours: getHours(dayjs().hour(0), last.displayTime)
    }

    return dates
}

function getHours(start_time, end_time){
    let start = start_time.hour()
    let end = end_time ? end_time.hour() : 24
    let hours = []
    for(var i = start; i <= 24; i++){
        hours.push(i)
    }
    // console.log('hours start', start, hours)
    return hours
}