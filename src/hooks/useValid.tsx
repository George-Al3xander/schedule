import { useState , useEffect} from 'react'
import {typeSubject } from '../types/types'
import moment from 'moment'




const useValid = (subjects: typeSubject[], subj: typeSubject, time: any) => {
    const [valid, setValid] = useState(false)

    const checkTimeValid = ({hours, minutes} : {hours: number, minutes: number}) => {
        return (hours > 0 || minutes > 0)
    }

    function getTimeRemaining(starttime: Date ,endtime: Date){ 
        const total = Date.parse(endtime.toString()) - Date.parse(starttime.toString());           
        const minutes = Math.floor( (total/1000/60) % 60 );
        const hours = Math.floor( (total/(1000*60*60)) % 24 );            
      
        return {hours,minutes};
    }
    const timeBetween = {hours: time.breakLength.hours + time.classLength.hours, minutes: time.breakLength.minutes + time.classLength.minutes}

    useEffect(() => {

    }, [subj])
       
           
           

    return valid
}

export default useValid