import {NavLink} from "react-router-dom"

import schedule from "../scheduleDb.json"
import { useToday } from "../hooks/useToday"


const Nav = () => {
    const today = useToday();
    const isDayOff = schedule.days[today.getDay()].subjects ? false :  true
    const navLinkStyles = "border-2 py-2 px-4 basis-[100%] text-center bg-primary text-accent transition-all duration-500";

    return(<nav className="mb-4">
        <ul className="flex gap-2 justify-between font-bold text-lg">
            <NavLink className={navLinkStyles} to={"/"}>Now</NavLink>
            {isDayOff ? <div className={navLinkStyles + " opacity-60 cursor-not-allowed"}>Today</div> : <NavLink className={navLinkStyles} to={"/today"}>Today</NavLink>}            
            <NavLink className={navLinkStyles} to={"/week"}>Week</NavLink>
        </ul>
    </nav>)
}

export default Nav