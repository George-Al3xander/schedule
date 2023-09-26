import {NavLink} from "react-router-dom"



const Nav = () => {


    return(<nav>
        <ul className="flex gap-2 justify-between font-bold text-lg">
            <NavLink className={"border-2 py-2 px-4 basis-[100%] text-center bg-primary text-accent transition-all duration-500"} to={"/"}>Now</NavLink>
            <NavLink className={"border-2 py-2 px-4 basis-[100%] text-center bg-primary text-accent transition-all duration-500"} to={"/today"}>Today</NavLink>
            <NavLink className={"border-2 py-2 px-4 basis-[100%] text-center bg-primary text-accent transition-all duration-500"} to={"/week"}>Week</NavLink>
        </ul>
    </nav>)
}

export default Nav