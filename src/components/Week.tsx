import {useEffect} from "react"
import { useSelector } from "react-redux";
import DisplayTime from "./DisplayTime";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useNumerator } from "../hooks/useNumerator";

const Week = () => {
   const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   const {schedule} = useSelector((state: RootState) => state.mainStates)
   const isNumerator = useNumerator();
   const weekScheduleIndex = schedule!.days.map((day, index) => {
    let tempObj = {...day,index}
    let tempSubjs = day.subjects;
    if(tempSubjs != undefined) {
        tempSubjs = tempSubjs?.filter((subj) => {
            let status = true;
            if(subj.isNumerator != undefined) {
                if(subj.isNumerator == isNumerator) {
                    status = true
                } else {
                    status = false
                }
            }
            return status
        })
        tempObj.subjects = tempSubjs
    }
    return tempObj
   })
   const weekSchedule = weekScheduleIndex.filter((day) => Object.keys(day).length > 1);
   const navigate = useNavigate();
   useEffect(() =>{
       if(weekSchedule.length == 0) {
        console.log("bruh")
           navigate("/")
       } else {
        console.log("Fuck")
       }
   }, [])
   
    return (<table className="w-[100%] ">
        <thead>
            <tr className="flex text-left bg-primary text-accent p-2 italic opacity-80 border-primary px-2">
                <th className="basis-[100%]">Weekday</th>
                <th className="basis-[100%]">Time</th>
                <th className="basis-[100%]">Subject</th>
            </tr>
        </thead>
        <tbody>
        {weekSchedule.map((day) => {
            return <tr>
                <tr className="flex bg-secondary">
                    <td className="basis-[100%] font-bold p-1">{dayNames[day.index]}</td>
                    <td className="basis-[100%]"></td>
                    <td className="basis-[100%]"></td>
                </tr>
                <tr className="flex flex-col gap-2 py-2">
                    {day.subjects?.map((subj) => {
                        return <tr className={`flex ${day.subjects!.indexOf(subj) != 0 ? "border-t-2" : ""} border-secondary`}>
                            <td className="basis-[100%]"></td>
                            <td className="basis-[100%]">{<DisplayTime hours={subj.time.hours} minutes={subj.time.minutes}/>}</td>
                            <td className="basis-[100%]">{subj.name}</td>
                        </tr>
                    })}
                </tr>
            </tr>
        })}

        </tbody>
    </table>)
}

export default Week