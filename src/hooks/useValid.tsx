import { useState , useEffect} from 'react'
import { typeSchedule } from '../types/types'
import moment from 'moment'




const useValid = (schedule: typeSchedule) => {
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

    useEffect(() => {
        let timeValid = false;
        let daysValid = false
        let sorted = schedule;
        let days = schedule.days.map((day) => {
            let subjs = day.subjects?.sort((a, b) => a.time.hours - b.time.hours)
            if(day.subjects) {
                return {...day, subjects: subjs}

            } else {
                return day
            }
        });
        sorted.days = days;   
        
        if(checkTimeValid(sorted.time.breakLength) && checkTimeValid(sorted.time.breakLength)) {
            timeValid = true
            console.log("Time valid")
        }
        if(timeValid) {
            const timeBetween = {hours: schedule.time.breakLength.hours + schedule.time.classLength.hours, minutes: schedule.time.breakLength.minutes + schedule.time.classLength.minutes}
            let daysCheck = sorted.days.filter((day) => {
                let status = false

                let subjCheck = day.subjects?.filter((a, number) => {
                    let subjStatus = false;
                    if(number != day.subjects?.length! - 1) {
                        const b = day.subjects![number + 1]
                        const aDate = new Date();
                        aDate.setHours(a.time.hours);
                        aDate.setMinutes(a.time.minutes);
                        const bDate = new Date();
                        bDate.setHours(b.time.hours);
                        bDate.setMinutes(b.time.minutes);

                        if(moment(bDate).add(timeBetween.hours, "hours").add(timeBetween.minutes, "minutes").isSameOrAfter(aDate, "hours") == false) {
                            subjStatus = true
                        }
                    }

                    return subjStatus
                })
                if(subjCheck?.length! > 0) {
                    status = true
                }
                return status
            })
            
            if(daysCheck.length == 0) {
                daysValid = true
            }
        }

        if(daysValid)  {
            console.log("Days valid")
            setValid(true)
        }
        
    }, [schedule])


    return valid
}

export default useValid