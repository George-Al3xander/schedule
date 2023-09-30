


export type typeSubject = {
    name: string,
    time: {
        hours: number,
        minutes: number
    },
    isNumerator?: boolean
}

export type typeSchedule = {
    time: {
        breakLength: number,
        classLength: number
    },
    days: {subjects: typeSubject[]}[]  
}