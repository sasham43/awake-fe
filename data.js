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


export function getUserData({ limit, day }){
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
        return day ? 
        (data.displayTime.day() == day) && (index < limit)
        : (index < limit)
    })
}

export function getDates(){
    first.displayTime = dayjs(first.time)
    last.displayTime = dayjs(last.time)

    console.log('first', first.displayTime.format())
    console.log('last', last.displayTime.format())

    let diff = last.displayTime.diff(first.displayTime, 'day')
    console.log('diff', diff)

    let format = 'ddd M-D'

    let dates = [
        {
            title: first.displayTime.format(format),
            value: first.displayTime
        },
    ]
    for(var i = 0; i < diff; i++) {
        let newDate = first.displayTime.add(i+1, 'day')
        let choice = {
            title: newDate.format(format),
            value: newDate
        }
        dates.push(choice)
        // dates.push(first.displayTime.add(1, 'day').format())
    }

    return dates

    // return [

    // ]
}
getDates()