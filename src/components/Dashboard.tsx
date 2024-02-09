import {Routes, Route} from "react-router-dom"
import Nav from './Nav';
import Now from './now tab/Now';
import Today from './today tab/Today';
import Week from './week tab/Week';
import Settings from "./settings/Settings";
import Menu from "./Menu";



const Dashboard = () => {   
    return(<>
        <Menu />
        <Nav />
        <Routes>
            <Route path='/' element={<Now />}/>
            <Route path='/today' element={<Today />}/>
            <Route path='/week' element={<Week/>}/>
            <Route path="/settings" element={<Settings />} />
        </Routes> 
    </>)
}


export default Dashboard