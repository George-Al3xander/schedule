import { useSelector } from "react-redux";
import { useNow } from "../../hooks/useNow";
import { useToday } from "../../hooks/useToday"
import { RootState } from "../../redux/store";
import DisplayTime from "../DisplayTime";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react"
import { useNumerator } from "../../hooks/useNumerator";
import TodaySubjs from "./TodaySubjs";
import useTodaySchedule from "../../hooks/useTodaySchedule";


const Today = () => {
    const todaySchedule = useTodaySchedule()     
    const navigate = useNavigate();

    useEffect(() =>{
        if(todaySchedule.length == 0) {
            navigate("/")
        }
    }, [])   
    
    return(<table className="w-[100%] ">
        <TodaySubjs />
    </table>)
}


export default Today