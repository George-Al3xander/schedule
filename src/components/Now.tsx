import { useNow } from "../hooks/useNow";
import { useToday } from "../hooks/useToday"
import scheldue from "../scheldueDb.json"



const Now = () => {
    const today = useToday();
    const now =  useNow(today);
    const todayScheldue = scheldue.days[today.getDay()]
    const onlyFuture = todayScheldue.subjects!.filter((subj) => {
        return subj.time.hours > today.getHours()
    })
    return (<div>
        <h1>{(now && onlyFuture.length > 0)? now.name : "You free"}</h1>
        <button onClick={() => {
            console.log(now)
        }}>Click</button>
    </div>)
}


export default Now