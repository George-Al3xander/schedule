import { useNumerator } from "../../hooks/useNumerator";
import { typeSubject } from "../../types/types";
import { dayNames } from "../../utils";
import DisplayTime from "../DisplayTime";




const WeekdaySubj = ({day}: {day: {subjects?: typeSubject[],index: number}}) => {
    const isNumerator = useNumerator()
    if(day.subjects == undefined) return null
    
    const subjects = day.subjects.filter((subj) => {
        let status = true;
        if(subj.isNumerator != undefined) {
            if(subj.isNumerator == isNumerator) {
                status = true
            } else {
                status = false
            }
        }
        return status
    });
    
    return(<tr>
            <tr className="flex bg-secondary">
                <td className="basis-[100%] font-bold p-1">{dayNames[day.index]}</td>
                <td className="basis-[100%]"></td>
                <td className="basis-[100%]"></td>
            </tr>
            <tr className="flex flex-col gap-2 py-2">
                {subjects.map((subj) => {
                    return <tr className={`flex ${day.subjects!.indexOf(subj) != 0 ? "border-t-2" : ""} border-secondary`}>
                        <td className="basis-[100%]"></td>
                        <td className="basis-[100%]">{<DisplayTime hours={subj.time.hours} minutes={subj.time.minutes}/>}</td>
                        <td className="basis-[100%]">{subj.name}</td>
                    </tr>
                })}
            </tr>
    </tr>)


}

export default WeekdaySubj