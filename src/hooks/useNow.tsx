import { useEffect, useState } from "react"
import { typeSubject } from "../types/types";
import { useDispatch } from "react-redux";
import { setBusyStatus } from "../redux/mainStates";
import {useSelector} from "react-redux"
import { RootState } from "../redux/store";
import moment from "moment";
import { useNumerator } from "./useNumerator";


export const useNow = (today: Date) => {
    const dispatch = useDispatch();
    const {schedule} = useSelector((state: RootState) => state.mainStates)
    const isNumerator = useNumerator()
    const [currentSubject, setCurrentSubject] = useState<typeSubject | null>();
    const todaySchedule = (schedule && schedule.days[today.getDay()].subjects) ? schedule.days[today.getDay()].subjects!.filter((subj) => {
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

    function getTimeRemaining(endtime: Date){ 
        const total = Date.parse(endtime.toString()) - Date.parse(today.toString());           
        const minutes = Math.floor( (total/1000/60) % 60 );
        const hours = Math.floor( (total/(1000*60*60)) % 24 );            
      
        return {hours,minutes};
    }


    const isStillContinue = (startHours: number, startMinutes: number) => {
        const starttime = new Date();
        starttime.setHours(startHours);
        starttime.setMinutes(startMinutes);        
        const starttimeCheck = moment(starttime).isBefore(moment(today))        
        if(starttimeCheck) {
            const endtime = moment(starttime).add(schedule?.time.classLength.hours, "hours").add(schedule?.time.classLength.minutes, "minutes").toDate();
            const timeLeft = getTimeRemaining(endtime);      
             
            if((timeLeft.hours == 0 && timeLeft.minutes > 0) || (timeLeft.hours > 0 && timeLeft.minutes == 0)) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    } 

    const getClosest = () => {        
        const currentCheck = todaySchedule!.filter((subj) => isStillContinue(subj.time.hours, subj.time.minutes));       
        if(currentCheck.length > 0) {     
            setCurrentSubject(currentCheck[0])                      
            dispatch(setBusyStatus({status: true}))
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
            dispatch(setBusyStatus({status: false}))
        }

    }
    
    useEffect(() => {
        if(schedule && schedule.days[today.getDay()].subjects) {
            getClosest()   
        }
    },[today])

    return currentSubject
}