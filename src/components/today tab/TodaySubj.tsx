import { useNow } from "../../hooks/useNow"
import { typeSubject } from "../../types/types"
import DisplayTime from "../DisplayTime"




const TodaySubj = ({subj}: {subj: typeSubject}) => {

    const {now, busyStatus} = useNow()

    return(<tr className={`flex font-bold text-left border-[3px] p-2 border-primary ${(now && busyStatus)? JSON.stringify(now) == JSON.stringify(subj) ? "bg-red-600" : "" : ""}`}>
        <td className="basis-[100%]">{<DisplayTime hours={subj.time.hours} minutes={subj.time.minutes}/>}</td>
        <td className="basis-[100%]">{subj.name}</td>
    </tr>)
}

export default TodaySubj