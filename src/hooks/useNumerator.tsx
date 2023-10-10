import { useEffect, useState } from "react"
import moment from "moment"



export const useNumerator = () => {
    const localStorageItem = JSON.parse(localStorage.getItem('numerator')!);     
    const [isNumerator, setIsNumerator] = useState(localStorageItem ? localStorageItem.status : true)
   
    useEffect(() => {
        if(localStorageItem) {
             const isSame = moment(localStorageItem.start).isSame(new Date(), "week");
             if(isSame == false) {
                localStorage.setItem("numerator", JSON.stringify({status: !localStorageItem.status, start: new Date()}))
                setIsNumerator(!localStorageItem.status)
             } else {
                setIsNumerator(localStorageItem.status)
             }
        } else{
            localStorage.setItem("numerator", JSON.stringify({status: true, start: new Date()}))
        }
    },[])


    return isNumerator
}