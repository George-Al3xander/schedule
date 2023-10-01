import {NavLink} from "react-router-dom"
import { useToday } from "../hooks/useToday"
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


const Nav = () => {
    const today = useToday();
    const {schedule} = useSelector((state: RootState) => state.mainStates)
    const isDayOff = schedule!.days[today.getDay()].subjects ? false :  true
    const navLinkStyles = "border-2 py-2 px-4 basis-[100%] text-center bg-primary text-accent transition-all duration-500";
    const isWeekOff = schedule!.days.filter((day) => day.subjects).length == 0
    
    
 
    return(<nav className="mb-4">
        <ul className="flex gap-2 justify-between font-bold text-lg">
            <NavLink className={navLinkStyles} to={"/"}>Now</NavLink>
            {isDayOff ? <div className={navLinkStyles + " opacity-60 cursor-not-allowed"}>Today</div> : <NavLink className={navLinkStyles} to={"/today"}>Today</NavLink>}   
            {isWeekOff ? <div className={navLinkStyles + " opacity-60 cursor-not-allowed"}>Week</div> :  <NavLink className={navLinkStyles} to={"/week"}>Week</NavLink>}         
           
        </ul>
    </nav>)
}

export default Nav