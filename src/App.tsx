import {useLocation} from "react-router-dom"


import {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { setSchedule } from "./redux/mainStates";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
function App() {
  const location = useLocation();  

  return (<div className={`w-[min(95%,40rem)] mx-auto py-6 ${location.pathname == "/week" || location.pathname == "/settings"? "min-" : ""}h-[100vh]  bg-gray-100`}>    
    {localStorage.getItem('schedule') ? <Dashboard /> : <LandingPage />}
  </div>    
  )
}

export default App
