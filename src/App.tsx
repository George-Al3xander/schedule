import {useLocation} from "react-router-dom"


import {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { setSchedule } from "./redux/mainStates";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
function App() {
  const location = useLocation(); 
  const dispatch = useDispatch();
  const {schedule} = useSelector((state: RootState) => state.mainStates) 
  
  
  const [isReady, setIsReady] = useState(false)
  
  
  useEffect(() => {    
      const localStorageItem = JSON.parse(localStorage.getItem('schedule')!);
        
    if(localStorageItem)  {
      dispatch(setSchedule({schedule: localStorageItem}))
    }
    
  }, [])

  useEffect(() => {
    console.log(isReady)

  }, [isReady])


  return (<div className={`w-[min(90%,40rem)] mx-auto py-6 ${location.pathname == "/week" ? "min-" : ""}h-[100vh]  bg-gray-100`}>    
    {schedule ? <Dashboard /> : <LandingPage />
    }
  </div>    
  )
}

export default App
