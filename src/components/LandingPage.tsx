import { useDispatch} from "react-redux";
import { setSchedule } from "../redux/mainStates";
import scheduleDb from "../scheduleDb.json"
import { typeSchedule } from "../types/types";
import {Routes, Route, NavLink, useLocation} from "react-router-dom"
import Settings from "./Settings";





const LandingPage = () => {
    const dispatch = useDispatch();    
    const location = useLocation();
       // result.time != && result.time.breakLength && result.time.classLength && result.days.length > 0 && result.days[0].subjects.length > 0
        async function importJson(e: any) {     
            const file = e.target.files[0]     
            const fileReader = new FileReader()
            fileReader.onload = event => {
                if(event.target?.result != null && typeof event.target.result == "string") {
                    const result : typeSchedule =  JSON.parse(event.target.result);   
                    
                    if(result.time != undefined && result.time.breakLength.hours != undefined && result.time.classLength.hours != undefined  && result.days.length > 0) {                
                        dispatch(setSchedule({schedule: result}));
                        localStorage.setItem("schedule", JSON.stringify(result))
                    } else {                        
                        alert("Wrong json file format!")
                    }              
                }
            }
            fileReader.onerror =() => alert("Wrong json file format!BROOO")
            fileReader.readAsText(file)          
        }
        

        
        
    return(<>        
        <div className="bg-primary text-accent flex justify-between items-center p-2 mb-4">
            <h1 className="font-bold text-xl italic uppercase">Schedule Uni</h1>
            {location.pathname == "/settings" ?
            <NavLink to={"/"}>
                <svg className="w-[2rem] fill-accent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" /></svg>
                
            </NavLink>
            :
            <NavLink to={"/settings"}>
                <svg className="w-[2rem] fill-accent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" /></svg>
            </NavLink>            
            }
        </div>
        <Routes>
            <Route path='/' element={<div className="flex flex-col justify-between">
            <div>
                <div className="text-center p-4 mb-4">
                    <h1 className="font-bold text-xl pb-4">Welcome to  Schedule Uni!</h1>
                    <p>A simply silly web app to show your current class, today's classes and weekly schedule</p>
                </div>
                <p className="mb-4">Please, choose a way of setting up a schedule: </p>              
                    <li className="mb-2">Manually building it through <NavLink className={"underline"} to={"/settings"}>settings</NavLink></li>
                    <li>
                        Import ready json file
                        <input onChange={importJson} accept=".json" type="file" />
                    </li>

                
            </div>
            <div className="flex justify-center mt-10">
                <button onClick={() => {
                    dispatch(setSchedule({schedule: scheduleDb}))                
                }} className="opacity-60">Click to use pre-made schedule for testing</button>
            </div>
            </div>}/>
            <Route path='/settings' element={<Settings />}/>           
        </Routes>
        
    </>)
}

export default LandingPage