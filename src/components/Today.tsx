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
    const todaySchedule = schedule.days[today.getDay()].subjects ? schedule.days[today.getDay()].subjects!.filter((subj) => {
        let status = false;
        if(subj.isNumerator != undefined) {
            if(subj.isNumerator == isNumerator) {
                status = true
            }
        } else {
            status = true
        }
        return true
    }) : []
    new Date().toLocaleString('en-us', {  weekday: 'long' })

    return(<table className="w-[100%] ">
        {todaySchedule.length > 0 ? 
            <>
            <thead>
                    <tr className="flex text-left  italic opacity-80 border-primary px-2 mb-4">
                        <th className="basis-[100%]">Time</th>
                        <th className="basis-[100%]">Subject</th>
                    </tr>
                </thead>
                <tbody className="flex flex-col">
                    {todaySchedule.map((subj) => {
                            return <tr className={`flex font-bold text-left border-[3px] p-2 border-primary ${todaySchedule.indexOf(subj) % 2 == 0 ? "bg-primary" : ""} ${(now && busyStatus)? JSON.stringify(now) == JSON.stringify(subj) ? "bg-red-600" : "" : ""}`}>
                            <td className="basis-[100%]">{<DisplayTime hours={subj.time.hours} minutes={subj.time.minutes}/>}</td>
                            <td className="basis-[100%]">{subj.name}</td>
                        </tr>
                    })}
                </tbody>        
            </>
        :
        <h1>Today's a day off! </h1>
        }
    </table>)
}


export default Today