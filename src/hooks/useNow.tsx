import { useEffect, useState } from "react"
import scheldue from "../scheldueDb.json"
import { typeSubject } from "../types/types";




export const useNow = (today: Date) => {
    const [currentSubject, setCurrentSubject] = useState<typeSubject | null>();
    const todayScheldue = scheldue.days[today.getDay()]

    const getClosest = () => {        
        const currentCheck = todayScheldue.subjects!.filter((subj) => {
            return (subj.time.hours == today.getHours())
        });

        if(currentCheck.length > 0) {
            setCurrentSubject(currentCheck[0])
        } else {
            const onlyFuture = todayScheldue.subjects!.filter((subj) => {
                return subj.time.hours > today.getHours()
            })
            if(onlyFuture.length > 0) {
                const isContinue = todayScheldue.subjects!.filter((subj) => {
                    return subj.time.minutes == 30 ? (today.getHours() - subj.time.hours == 1 && today.getMinutes() <= 50) : (today.getHours() - subj.time.hours == 1 && today.getMinutes() <= 20)
                    
                })
                if(isContinue.length > 0) {
                    setCurrentSubject(isContinue[0])
                } else {
                    setCurrentSubject(onlyFuture[0])
                }
            } else {
                setCurrentSubject(null)
            }           
        }

    }

    
    useEffect(() => {
        getClosest()
    },[today])
    return currentSubject
}