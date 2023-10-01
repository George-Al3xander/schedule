import {Routes, Route} from "react-router-dom"
import Nav from './Nav';
import Now from './Now';
import Today from './Today';
import Week from './Week';
import Settings from "./Settings";



const Dashboard = () => {

    return(<>
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