import { useEffect, useState } from "react"
import schedule from "../scheldueDb.json"
import { typeSubject } from "../types/types";




export const useNow = (today: Date) => {
    const isNumerator = false;
    
    const [currentSubject, setCurrentSubject] = useState<typeSubject | null>();
    const todaySchedule = schedule.days[today.getDay()].subjects!.filter((subj) => {
        let status = false;
        if(subj.isNumerator != undefined) {
            if(subj.isNumerator == isNumerator) {
                status = true
            }
        } else {
            status = true
        }
        return true
    })

    const getClosest = () => {        
        const currentCheck = todaySchedule!.filter((subj) => { 
            let status = false;
            //Checks if classes continiues in same hour
            if(subj.time.hours == today.getHours()) {
                if(subj.time.minutes == 30 && today.getMinutes() >= 30) {
                    status = true;
                } else if (subj.time.minutes == 0 && today.getMinutes() >= 0) {
                    status = true;
                }
                //Checks if classes continiues in different hour
            } else if(today.getHours() - subj.time.hours == 1){
                if(subj.time.minutes == 30 && today.getMinutes() <= 50) {                    
                    status = true;
                } else if (subj.time.minutes != 30 && today.getMinutes() <= 20) {
                    status = true;
                }
            }
            return status
        });       
        if(currentCheck.length > 0) {          
            setCurrentSubject(currentCheck[0])                      
        } else {
            const onlyFuture = todaySchedule!.filter((subj) => {
                let status = false;
                if(subj.time.hours >= today.getHours()) {
                    status = true
                } 
                return status
            })            
            if(onlyFuture.length > 0) {
                setCurrentSubject(onlyFuture[0])
            } else {
                setCurrentSubject(null)
            }           
        }

    }
    
    useEffect(() => {
        getClosest()        
    },[today])

    return currentSubject
}