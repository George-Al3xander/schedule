import { useEffect, useState } from "react"
import { useNow } from "./useNow";
import { useToday } from "./useToday";



export const useRemaining = () => {
    const [remaining, setRemaining] = useState("")
    const today = useToday();
    const now =  useNow(today);

    function minutesToHours(totalMinutes: number) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
      
        return `${hours} hour${hours != 1 ? "s" : ""} ${minutes} minute${minutes != 1 ? "s" : ""}`;
      }

    const getRemaining = () => {
        if(now) {
            let total: number;
            const hours =  (now.time.hours - today.getHours()) * 60
            //console.log(hours)
            const minutes = now.time.minutes - today.getMinutes()
            total =  hours  + minutes
            if(total == 60) {
                setRemaining("1 hour")
            } else if (total < 60) {
                setRemaining(`${total} minute${total != 1 ? "s" : ""}`)
            } else if (total > 60) {
                setRemaining(minutesToHours(total))
            }
        }         
    }

    useEffect(() => {
        getRemaining();
    }, [today])

    return remaining
}