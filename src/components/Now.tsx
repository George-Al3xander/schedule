import { useSelector } from "react-redux";
import { useNow } from "../hooks/useNow";
import { useToday } from "../hooks/useToday"
import schedule from "../scheduleDb.json"
import { RootState } from "../redux/store";
import { useRemaining } from "../hooks/useRemaning";
import DisplayTime from "./DisplayTime";


const Now = () => {
    const remaining = useRemaining();      
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
        return status
    }) : []
    
   
    return (<section className="borger-primary h-[90%]   my-2 rounded flex flex-col justify-between">
        <div  className={`p-4 border-[var(--clr-primary)] border-4 rounded text-center text-accent flex flex-col gap-2 ${(busyStatus &&  now) ? "bg-red-600" : "bg-green-600"}`}>
            <h2 className="font-medium text-lg">{(busyStatus == false &&  now != null) ?"Your next subject:" : busyStatus == true ? "Your current subject:" : "🎉Congrats🎉"}</h2>
            <h1 className={`text-3xl font-bold`}>{now? now.name : "You free"}</h1>
            {(busyStatus == false &&  now != null) ?<h2>That class will be  <span className="font-bold ">in {remaining}</span>.</h2> : null}        
        </div>
        {todaySchedule.length > 0 ?
            <aside className="font-medium p-2">
                <div className="flex justify-between flex-wrap gap-2 mb-4">
                    <h4 className="opacity-70 italic">First subject: </h4>
                    <h3 className="ml-auto">{todaySchedule[0].name} </h3>
                    <span className="font-bold ml-auto"> starts at <DisplayTime hours={todaySchedule[0].time.hours} minutes={todaySchedule[0].time.minutes}/></span>
                </div>
                <div className="flex justify-between flex-wrap gap-2">
                    <h4 className="opacity-70 italic">Last subject: </h4>
                    <h3 className="ml-auto">{todaySchedule[todaySchedule.length - 1].name} </h3>
                    <span className="font-bold ml-auto"> ends at <DisplayTime hours={todaySchedule[todaySchedule.length - 1].time.hours + 1} minutes={todaySchedule[todaySchedule.length - 1].time.minutes + 20}/></span>
                </div>
            </aside>    
            
            :
            null        
        }        
    </section>)
}


export default Now