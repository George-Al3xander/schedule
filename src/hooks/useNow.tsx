import { useEffect, useState } from "react"
import schedule from "../scheduleDb.json"
import { typeSubject } from "../types/types";
import { useDispatch } from "react-redux";
import { setBusyStatus } from "../redux/mainStates";
import {useSelector} from "react-redux"
import { RootState } from "../redux/store";


export const useNow = (today: Date) => {
    const dispatch = useDispatch()
    const {isNumerator} = useSelector((state: RootState) => state.mainStates)
    const [currentSubject, setCurrentSubject] = useState<typeSubject | null>();
    const todaySchedule = schedule.days[today.getDay()].subjects ? schedule.days[today.getDay()].subjects!.filter((subj) => {
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

    const getClosest = () => {        
        const currentCheck = todaySchedule!.filter((subj) => { 
            let status = false;
            //Checks if classes continiues in same hour
            if(subj.time.hours == today.getHours()) {
                if(today.getMinutes() >= subj.time.minutes) {
                    status = true;
                } 
                //Checks if classes continiues in different hour
            } else if(today.getHours() - subj.time.hours == 1){
                if(today.getMinutes() <= subj.time.minutes + 20) {                    
                    status = true;
                } 
            }
            return status
        });       
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
        if(schedule.days[today.getDay()].subjects) {
            getClosest()   
        }
    },[today])

    return currentSubject
}