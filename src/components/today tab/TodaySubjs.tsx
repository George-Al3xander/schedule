import useTodaySchedule from "../../hooks/useTodaySchedule"
import TodaySubj from "./TodaySubj"





const TodaySubjs = () => {

    const todaySchedule = useTodaySchedule()
    if(todaySchedule.length == 0) return <h1>Today's a day off! </h1>
    
    return( <>
        <thead>
                <tr className="flex text-left  italic opacity-80 border-primary px-2 mb-4">
                    <th className="basis-[100%]">Time</th>
                    <th className="basis-[100%]">Subject</th>
                </tr>
            </thead>
            <tbody className="flex flex-col [&>*:nth-child(even)]:bg-primary">
                {todaySchedule.map((subj) =>  <TodaySubj subj={subj}/>)}
            </tbody>        
        </>)
}

export default TodaySubjs