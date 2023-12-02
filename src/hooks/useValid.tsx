import { useState , useEffect} from 'react'
import {typeSubject } from '../types/types'
import moment from 'moment'




const useValid = (subjects: typeSubject[], subj: typeSubject, time: any, editStatus: boolean) => {    
    const [timeValid, setTimeValid] = useState(false)
    const [nameValid, setNameValid] = useState(false)
    const blankValid = new RegExp(/\S/)
   

    function getTimeRemaining(starttime: Date ,endtime: Date){ 
        const total = Date.parse(endtime.toString()) - Date.parse(starttime.toString());           
        const minutes = Math.floor( (total/1000/60) % 60 );
        const hours = Math.floor( (total/(1000*60*60)) % 24 );            
      
        return {hours,minutes};
    }
    const timeBetween = {hours: time.breakLength.hours + time.classLength.hours, minutes: time.breakLength.minutes + time.classLength.minutes}

    const validateNumerator = (item: typeSubject) => {
        if((item.isNumerator != undefined && subj.isNumerator != undefined && item.isNumerator == true && subj.isNumerator == false)
        || (item.isNumerator != undefined && subj.isNumerator != undefined && item.isNumerator == false && subj.isNumerator == true)) {
                    return true
        } 
        return false
    }

    useEffect(() => {
        if(blankValid.test(subj.name) == true) {
            setNameValid(true)
        } else {
            setNameValid(false)
            
        }
        if(subjects != undefined) {
            let after = subjects.filter((a) => {
                let status = false;                
                if(a.name.toLowerCase().replace(" ", "") != subj.name.toLowerCase().replace(" ", "")) {
                    if(a.time.hours == subj.time.hours) {
                        if(a.time.minutes > subj.time.minutes) {
                            status = true;
                        }
    
                    } else if(a.time.hours > subj.time.hours) {
                        status = true;
                    }
                } else{
                    status = false
                }
                
                return status
            })

            let before = subjects.filter((a) => {
                let status = false;
                if(a.name.toLowerCase().replace(" ", "") != subj.name.toLowerCase().replace(" ", "")) {
                    if(a.time.hours == subj.time.hours) {
                        if(a.time.minutes < subj.time.minutes) {
                            status = true;
                        }
    
                    } else if(a.time.hours < subj.time.hours) {
                        status = true;
                    }
                } else{
                    status = false
                }
                
                return status
            })
           
            let beforeCheck = false;
            let afterCheck = false;            
            if(before.length > 0) {               
                const beforeItem = before[before.length-1].time;
                const beforeMinumum = moment(`${beforeItem.hours}:${beforeItem.minutes}`, "h:m").add(timeBetween.hours, "hours").add(timeBetween.minutes, "minutes");                
                const timeBetweenBefore = getTimeRemaining(beforeMinumum.toDate(), moment(`${subj.time.hours}:${subj.time.minutes}`, "h:m").toDate());
                //Checking if timeBefore  is a longer duration than the allowed timeBetween duration
                const simpleCoond = (timeBetweenBefore.hours == timeBetween.hours && timeBetweenBefore.minutes >= timeBetween.minutes) || (timeBetweenBefore.hours > timeBetween.hours)  
                const defaultCoond = (timeBetweenBefore.hours == 0 && timeBetweenBefore.minutes > 0) || (timeBetweenBefore.hours > 0 && timeBetweenBefore.minutes == 0) || (timeBetweenBefore.hours == 0 && timeBetweenBefore.minutes == 0)
                if(simpleCoond || defaultCoond) {
                    beforeCheck = true;
                }                
              
            }
            
            if(after.length > 0) {
                const afterItem = after[0].time;                
                const afterMinimum = moment(`${afterItem.hours}:${afterItem.minutes}`, "h:m").subtract(timeBetween.hours, "hours").subtract(timeBetween.minutes, "minutes")
                const timeBetweenAfter = getTimeRemaining(moment(`${subj.time.hours}:${subj.time.minutes}`, "h:m").toDate(), afterMinimum.toDate())               
                //Checking if timeAfter  is a longer duration than the allowed timeBetween duration
                
                const simpleCoond = (timeBetweenAfter.hours == timeBetween.hours && timeBetweenAfter.minutes > timeBetween.minutes) || (timeBetweenAfter.hours > timeBetween.hours)  
                const defaultCoond = ((timeBetweenAfter.hours == 0 && timeBetweenAfter.minutes > 0) || (timeBetweenAfter.hours > 0 && timeBetweenAfter.minutes == 0) || (timeBetweenAfter.hours == 0 && timeBetweenAfter.minutes == 0) || (timeBetweenAfter.hours > 0 && timeBetweenAfter.minutes > 0))
                if(simpleCoond || defaultCoond) {
                    afterCheck = true;
                }      
                      
            }
            
            const el = subjects.find(el => el.time.hours == subj.time.hours && el.time.minutes == subj.time.minutes)
            if(el && editStatus == false) {
                if(validateNumerator(el)) {
                    setTimeValid(true)
                } else {   
                    setTimeValid(false)
                }                
            } else if(before.length > 0 && after.length > 0) {
                if(beforeCheck == true && afterCheck == true) {                    
                    setTimeValid(true)
                } else {
                    setTimeValid(false)
                }
            } else if (before.length > 0 && after.length == 0) {
                if(beforeCheck == true) {                    
                    setTimeValid(true)
                } else {
                    setTimeValid(false)
                }
            } else if (before.length == 0 && after.length > 0) {
                if(afterCheck == true) {                    
                    setTimeValid(true)
                } else {
                    setTimeValid(false)
                }
            }
        }  else {
            setTimeValid(true)
        }
    }, [subj])
           
    return {nameValid, timeValid}
}

export default useValid