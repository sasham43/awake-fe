const data = require('./data.json')

export default function getUserData({ limit }){
    return data.sort((a, b) => {
        if(a.time > b.time){
            return 1
        }
        if(a.time < b.time){
            return -1
        }
        return 0
    }).filter((data, index) => {
        return index < limit
    })
}