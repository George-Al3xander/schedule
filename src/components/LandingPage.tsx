import { useDispatch} from "react-redux";
import { setSchedule } from "../redux/mainStates";
import scheduleDb from "../scheduleDb.json"
import { typeSchedule } from "../types/types";
import {Routes, Route, NavLink} from "react-router-dom"
import Settings from "./Settings";
import { useToday } from "../hooks/useToday";




const LandingPage = () => {
    const dispatch = useDispatch();    
    const exportJson = (file: object) => {        
        const fileName = "my-file";
        const json = JSON.stringify(file, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const href = URL.createObjectURL(blob);
      
        // create "a" HTLM element with href to file
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
      
        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
        }
       // result.time != && result.time.breakLength && result.time.classLength && result.days.length > 0 && result.days[0].subjects.length > 0
        async function importJson(e: any) {     
            const file = e.target.files[0]     
            const fileReader = new FileReader()
            fileReader.onload = event => {
                if(event.target?.result != null && typeof event.target.result == "string") {
                    const result : typeSchedule =  JSON.parse(event.target.result);   
                    console.log(result)
                    if(result.time && result.time.breakLength.hours && result.time.classLength.hours  && result.days.length > 0) {                
                        dispatch(setSchedule({schedule: result}))
                    } else {                        
                        alert("Wrong json file format!")
                    }              
                }
            }
            fileReader.onerror = error => alert("Wrong json file format!")
            fileReader.readAsText(file)          
        }
        const today = useToday();

        
        
    return(<div >        
        <div className="bg-primary text-accent p-2">
            <h1 className="font-bold text-xl italic uppercase">Schedule Uni</h1>
        </div>
        <Routes>
            <Route path='/' element={<div className="flex flex-col justify-between h-[100%]">
            <div>
                <div className="text-center p-4 mb-4">
                    <h1 className="font-bold text-xl pb-4">Welcome to  Schedule Uni!</h1>
                    <p>A simply silly web app to show your current class, today's classes and weekly schedule</p>
                </div>
                <p>Please, choose a way of setting up a schedule: </p>
                <li>Manually building it through <NavLink className={"underline"} to={"/settings"}>settings</NavLink></li>
                <li>
                    Import ready json file
                    <input onChange={importJson} accept=".json" type="file" />
                </li>
            </div>
            <div className="flex justify-center">
                <button onClick={() => {
                    dispatch(setSchedule({schedule: scheduleDb}))                
                }} className="opacity-60">Click to use pre-made schedule for testing</button>
            </div>
            </div>}/>
            <Route path='/settings' element={<Settings />}/>           
        </Routes>
        
    </div>)
}

export default LandingPage