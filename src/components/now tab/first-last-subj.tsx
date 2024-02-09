import { useEffect, useState } from "react"
import useTodaySchedule from "../../hooks/useTodaySchedule"
import DisplayTime from "../DisplayTime"
import moment from "moment"




const FirstLastSubject = () => {
    const todaySchedule = useTodaySchedule()
    const [lastSubject, setLastSubject] = useState(new Date())
    const schedule = JSON.parse(localStorage.getItem("schedule")!)
    useEffect(() => {
        if(todaySchedule.length > 0 && schedule) {
            const lastSubjectDate = new Date();
            lastSubjectDate.setHours(todaySchedule[todaySchedule.length - 1].time.hours)
            lastSubjectDate.setMinutes(todaySchedule[todaySchedule.length - 1].time.minutes)            
            setLastSubject(moment(lastSubjectDate).add(schedule?.time.classLength.hours, "hours").add(schedule?.time.classLength.minutes, "minutes").toDate())
        }
    }, [])

    if (todaySchedule.length == 0) return null

    return(<aside className="font-medium p-2">
        <div className="flex justify-between flex-wrap gap-2 mb-4">
            <h4 className="opacity-70 italic">First subject: </h4>
            <h3 className="ml-auto">{todaySchedule[0].name} </h3>
            <span className="font-bold ml-auto"> starts at <DisplayTime hours={todaySchedule[0].time.hours} minutes={todaySchedule[0].time.minutes}/></span>
        </div>
        <div className="flex justify-between flex-wrap gap-2">
            <h4 className="opacity-70 italic">Last subject: </h4>
            <h3 className="ml-auto">{todaySchedule[todaySchedule.length - 1].name} </h3>
            <span className="font-bold ml-auto"> ends at <DisplayTime hours={lastSubject.getHours()} minutes={lastSubject.getMinutes()}/></span>
        </div>
    </aside> )
    }

export default FirstLastSubject