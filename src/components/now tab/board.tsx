import { memo } from "react";
import { useNow } from "../../hooks/useNow";
import DisplayRemaining from "../DisplayRemaining";
import { typeSubject } from "../../types/types";






const BoardDisplay  = memo(({busyStatus, now}: {now: typeSubject | null | undefined,busyStatus: boolean}) => {
    return(<div  className={`p-4 border-[var(--clr-primary)] border-4 rounded text-center text-accent flex flex-col gap-2 ${(busyStatus &&  now) ? "bg-red-600" : "bg-green-600"}`}>
        <h2 className="font-medium text-lg">{(busyStatus == false &&  now != null) ?"Your next subject:" : busyStatus == true ? "Your current subject:" : "🎉Congrats🎉"}</h2>
        <h1 className={`text-3xl font-bold`}>{now? now.name : "You're free"}</h1>
        {(busyStatus == false &&  now != null) ?<h2>That class will be  <span className="font-bold ">in {<DisplayRemaining />}</span>.</h2> : null}        
    </div>)
})



const Board = () => {

    const {now, busyStatus} =  useNow();

    
    return(<><BoardDisplay busyStatus={busyStatus} now={now}/></>)
}

export default Board