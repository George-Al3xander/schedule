import { useToday } from "../hooks/useToday";
import { useNow } from "../hooks/useNow";




const DisplayRemaining = () => {


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