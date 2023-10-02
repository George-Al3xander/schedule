
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




export type typeSubjSettingsProps = {
    subj: typeSubject, 
    subjIndex: number, 
    dayIndex: number, 
    handleChange: any,
    deleteSubject: any,
    setMenuShown?: any,
    setEditStatus?: any,
    editStatus: boolean,
    setCurrentSubject: any,
    addSubject?: any,
    time?: {
        breakLength: typeTime,
        classLength: typeTime
    },
    daySubjects?: typeSubject[] | undefined

}


export type typeWeekdaySettingsProps = {     
    dayIndex: number,     
    day: {subjects?: typeSubject[]}
    handleChange: any,
    addSubject: any,
    deleteSubject: any,
    time?: {
        breakLength: typeTime,
        classLength: typeTime
    },
    daySubjects?: typeSubject[] | undefined
}


