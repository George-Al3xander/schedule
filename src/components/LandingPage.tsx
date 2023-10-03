import { useDispatch} from "react-redux";
import { setSchedule } from "../redux/mainStates";
import scheduleDb from "../scheduleDb.json"
import { typeSchedule } from "../types/types";
import {Routes, Route, NavLink} from "react-router-dom"
import Settings from "./settings/Settings";
import Menu from "./Menu";





const LandingPage = () => {
    const blankSchedule : typeSchedule = {time: {breakLength: {hours: 0, minutes: 0}, classLength: {hours: 0, minutes: 0}},days: [{},{},{},{},{},{},{}]};

    const dispatch = useDispatch();    
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

    const exportJson = (file: typeSchedule) => {        
        const fileName = "sampleSchedule";
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
        

        
        
    return(<>        
        <Menu />
        <Routes>
            <Route path='/' element={<div className="flex flex-col justify-between">
            <div>
                <div className="text-center p-4 mb-4">
                    <h1 className="font-bold text-xl pb-4">Welcome to  Schedule Uni!</h1>
                    <p>A simply silly web app to show your current class, today's classes and weekly schedule</p>
                </div>
                <p className="mb-4">Please, choose a way of setting up a schedule: </p>              
                    <li className="mb-2">Manually building it through <NavLink className={"underline"} to={"/settings"}>settings</NavLink></li>
                    <li className="mb-2">
                        Import ready JSON file
                        <input onChange={importJson} accept=".json" type="file" />
                    </li>
                    <button onClick={() => exportJson(blankSchedule)} className="opacity-60 text-orange-600">Click to download  JSON sample file</button>
                
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