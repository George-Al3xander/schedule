import { typeSchedule } from "../../types/types"
import { dayNames } from "../../utils"
import WeekdaySubj from "./WeekdaySubjs";




const WeekSubjs = () => {
    const schedule : typeSchedule = JSON.parse(localStorage.getItem("schedule")!);
    const modifiedSchedule = schedule.days.map((day, index) => ({index, ...day}));
    
    return(<tbody>
        {modifiedSchedule.map((day) => (<WeekdaySubj day={day}/>))}
    </tbody>)
}


export default WeekSubjs