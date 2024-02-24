import { useToday } from "../hooks/useToday";
import { useNow } from "../hooks/useNow";
import { minutesToHours } from "../utils";




const DisplayRemaining = () => {


 
    const {now} =  useNow();
    const today = useToday();
    const getRemaining = () => {       
        if(now) {
            let total: number;
            const hours =  (now.time.hours - today.getHours()) * 60           
            const minutes = now.time.minutes - today.getMinutes()
            total =  hours  + minutes
            if(total == 60) {
                return "1 hour"
            } else if (total < 60) {
                return `${total} minute${total != 1 ? "s" : ""}`
            } else if (total > 60) {
                return minutesToHours(total)
            }
        }
    } 
    return(<>{getRemaining()}</>)
}


export default DisplayRemaining