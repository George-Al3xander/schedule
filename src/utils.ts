import { useNumerator } from "./hooks/useNumerator";
import { typeSubject } from "./types/types";

export  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function getTimeRemaining(startTime: Date,endtime: Date) { 
    const total = Date.parse(endtime.toString()) - Date.parse(startTime.toString());           
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );            
  
    return {hours,minutes};
}

export function minutesToHours(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    return `${hours} hour${hours != 1 ? "s" : ""} ${minutes} minute${minutes != 1 ? "s" : ""}`;
}

export function filterByNumerator (subj: typeSubject) {
    
}

