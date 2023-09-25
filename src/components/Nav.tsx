import {NavLink} from "react-router-dom"



const Nav = () => {


    return(<nav>
        <ul>
            <NavLink to={"/"}>Now</NavLink>
            <NavLink to={"/today"}>Today</NavLink>
            <NavLink to={"/week"}>Week</NavLink>
        </ul>
    </nav>)
}

export default Nav