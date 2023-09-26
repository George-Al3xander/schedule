import { useSelector } from "react-redux";
import { useNow } from "../hooks/useNow";
import { useToday } from "../hooks/useToday"
import schedule from "../scheduleDb.json"
import { RootState } from "../redux/store";
import DisplayTime from "./DisplayTime";



const Today = () => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = useToday();
    const now =  useNow(today);
    const {busyStatus, isNumerator} = useSelector((state: RootState) => state.mainStates)
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
    new Date().toLocaleString('en-us', {  weekday: 'long' })

    return(<table className="w-[100%]">
        <thead>
            <tr className="flex- justify-between">
                <th>Time</th>
                <th>Subject</th>
            </tr>
        </thead>
        <tbody>
            {todaySchedule.map((subj) => {
                return <tr className="flex- justify-between">
                    <td>{<DisplayTime hours={subj.time.hours} minutes={subj.time.minutes}/>}</td>
                    <td>{subj.name}</td>
                </tr>
            })}
        </tbody>
    </table>)
}


export default Today