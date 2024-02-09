import { useEffect, useRef, useState } from "react"
import { typeSubject } from "../types/types";
import moment from "moment";
import useTodaySchedule from "./useTodaySchedule";
import { getTimeRemaining } from "../utils";
import { useToday } from "./useToday";


export const useNow = () => {
   
    
   
    const todaySchedule = useTodaySchedule();
    const schedule = JSON.parse(localStorage.getItem("schedule")!)
    const currentSubject =useRef<typeSubject | null>(null)
    const busyStatus = useRef(false)
    


    const isStillContinue = (today: Date,startHours: number, startMinutes: number) => {
        const starttime = new Date();
        starttime.setHours(startHours);
        starttime.setMinutes(startMinutes);        
        const starttimeCheck = moment(starttime).isBefore(moment(today))               
        if(starttimeCheck) {
            const endtime = moment(starttime).add(schedule?.time.classLength.hours, "hours").add(schedule?.time.classLength.minutes, "minutes").toDate();
            const timeLeft = getTimeRemaining(today,endtime);      
            
            if((timeLeft.hours == 0 && timeLeft.minutes > 0) || (timeLeft.hours > 0 && timeLeft.minutes == 0) || (timeLeft.hours == 0 && timeLeft.minutes == 0) || (timeLeft.hours > 0 && timeLeft.minutes > 0)) {                
                return true                
            } else {
                return false
            }

        } else {           
            return false
        }
    } 

    const getClosest = (today: Date) => {        
        const currentCheck = todaySchedule!.filter((subj) => isStillContinue(today,subj.time.hours, subj.time.minutes));                   
        if(currentCheck.length > 0) {     
            currentSubject.current = currentCheck[0]  
            busyStatus.current = true
        } else {                    
            const onlyFuture = todaySchedule!.filter((subj) => {
                let status = false;
                if(subj.time.hours >= today.getHours()) {
                    status = true
                } 
                return status
            })            
            if(onlyFuture.length > 0) {
                currentSubject.current = onlyFuture[0]
            } else {
                currentSubject.current = null
            }           
            busyStatus.current = false
        }

    }
    
    useEffect(() => {
        if(schedule && schedule.days[new Date().getDay()].subjects) {
            //const today = moment(microtime.now()).toDate()
            //getClosest(today)   
        }
    },[])

    return {now:currentSubject.current, busyStatus:busyStatus.current}
}