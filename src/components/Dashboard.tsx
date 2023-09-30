import {Routes, Route, useLocation} from "react-router-dom"
import Nav from './Nav';
import Now from './Now';
import Today from './Today';
import Week from './Week';



const Dashboard = () => {

    return(<>
        <Nav />
        <Routes>
        <Route path='/' element={<Now />}/>
        <Route path='/today' element={<Today />}/>
        <Route path='/week' element={<Week/>}/>
        </Routes> 
    </>)
}


export default Dashboard