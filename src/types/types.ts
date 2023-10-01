
type typeTime = {
    hours: number,
    minutes: number
}

export type typeSubject = {
    name: string,
    time: typeTime
    isNumerator?: boolean
}

export type typeSchedule = {
    time: {
        breakLength: typeTime,
        classLength: typeTime
    },
    days: {subjects?: typeSubject[]}[]  
}