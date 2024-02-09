import { useEffect, useState } from "react"
import { typeSchedule, typeSubject } from "../types/types"
import { useNumerator } from "./useNumerator";




const useTodaySchedule = () => {
    const [today,setToday] = useState<typeSubject[]>([])
    const isNumerator = useNumerator();



    useEffect(() => {   
        const localStorageItem = localStorage.getItem('schedule');        
        if(localStorageItem)  {
            const schedule : typeSchedule = JSON.parse(localStorageItem);
            const today = new Date()
            const todaySchedule =  schedule.days[today.getDay()].subjects ? schedule.days[today.getDay()].subjects!.filter((subj) => {
                let status = false;
                if(subj.isNumerator != undefined) {
                    if(subj.isNumerator == isNumerator) {
                        status = true
                    }
                } else {
                    status = true
                }
                return status
            }) : []

            setToday(todaySchedule)
        }  else {
            setToday([])
        }  
    }, [])

    return today
}

export default useTodaySchedule