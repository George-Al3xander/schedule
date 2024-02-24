import useTodaySchedule from "../../hooks/useTodaySchedule"
import TodaySubj from "./TodaySubj"





const TodaySubjs = () => {

    const todaySchedule = useTodaySchedule()
    if(todaySchedule.length == 0) return <div  className={`p-4 border-[var(--clr-primary)] border-4 rounded text-center text-accent flex flex-col gap-2 bg-green-600`}>
        <h2 className="font-medium text-lg">"🎉Congrats🎉</h2>
        <h1 className={`text-3xl font-bold`}>Today's a day off!</h1>
    </div>
    
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