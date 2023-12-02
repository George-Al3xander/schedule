
type typeTime = {
    hours: number,
    minutes: number,    
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






export type typeSubjProps = {
    subj: typeSubject, 
    subjIndex: number, 
    dayIndex: number,     
    deleteSubject: any,
    editStatus: boolean,
    getCurrentSubject: Function,
    open: any,   
}

export interface typeSubjSettingsProps  {
    subj: typeSubject, 
    index: number
    daySubjects: typeSubject[] | undefined    
    dayIndex: number,     
    editStatus: boolean,
    close: any,
    addSubject: any,
    time: {
        breakLength: typeTime,
        classLength: typeTime
    },  
    editSubject: any,
    status: boolean
}


export type typeWeekdaySettingsProps = {     
    dayIndex: number,     
    day: {subjects?: typeSubject[]}    
    addSubject: any,
    deleteSubject: any,
    time?: {
        breakLength: typeTime,
        classLength: typeTime
    },
    editSubject: any,
    daySubjects?: typeSubject[] | undefined
}


