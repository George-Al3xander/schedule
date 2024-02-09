import {useEffect} from "react"
import { useSelector } from "react-redux";
import DisplayTime from "../DisplayTime";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useNumerator } from "../../hooks/useNumerator";
import WeekSubjs from "./WeekSubjs";
import { typeSchedule } from "../../types/types";

const Week = () => {
  
    
   
//    const navigate = useNavigate();
//    useEffect(() =>{
//        if(weekSchedule.length == 0) {        
//            navigate("/")
//        } 
//    }, [])
   
    return (<table className="w-[100%] ">
        <thead>
            <tr className="flex text-left bg-primary text-accent p-2 italic opacity-80 border-primary px-2">
                <th className="basis-[100%]">Weekday</th>
                <th className="basis-[100%]">Time</th>
                <th className="basis-[100%]">Subject</th>
            </tr>
        </thead>
        <WeekSubjs />
    </table>)
}

export default Week