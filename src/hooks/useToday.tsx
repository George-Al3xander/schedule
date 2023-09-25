import { useState , useEffect} from 'react'




export const useToday = () => {
    const [today, setToday] = useState(new Date());
   
    useEffect(() => {
        setInterval(() => setToday(new Date()),1000)
    },[])

    return today
}