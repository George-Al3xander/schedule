import {useState} from "react"
import { typeSchedule, typeSubject } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { setSchedule } from "../../redux/mainStates";
import { useNumerator } from "../../hooks/useNumerator";
import WeekdaySettings from "./WeekdaySettings";



const Settings = () => {
    const blankSchedule : typeSchedule = {time: {breakLength: {hours: 0, minutes: 0}, classLength: {hours: 0, minutes: 0}},days: [{},{},{},{},{},{},{}]};
    const localStorageItem = JSON.parse(localStorage.getItem('schedule')!);     
    const [formSchedule, setFormSchedule] = useState<typeSchedule>(localStorageItem ? localStorageItem : blankSchedule)
    const {schedule} = useSelector((state: RootState) => state.mainStates);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isNumerator = useNumerator();
    

    const getTimeValid = ({hours, minutes} : {hours:number, minutes:number}) => {
        return (hours > 0 || minutes > 0)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name.split('-')        
        const value = e.target.value;       
        if(name[0] == "time") {
            if(name[1] == "breakLength") {
                setFormSchedule({...formSchedule, time: {...formSchedule.time, breakLength: {...formSchedule.time.breakLength, [name[2]]: +value}}})
            } else {
                setFormSchedule({...formSchedule, time: {...formSchedule.time, classLength: {...formSchedule.time.classLength, [name[2]]: +value}}})
            }
        } else if(name[0] == "numerator") {
            let status = true;
            if(value == 'false') {
                status = false
                console.log("Here")
            }
            localStorage.setItem("numerator", JSON.stringify({status, start: new Date()}))
        }        
    }

    const addSubject = (index: number, newSubj: typeSubject) => {
        let tempArray = {...formSchedule};
        if(formSchedule.days[index].subjects != undefined) {
            tempArray.days[index].subjects?.push(newSubj)
        } else {
            tempArray.days[index].subjects = [newSubj]
        }  
         let sorted = tempArray;
         let days = tempArray.days.map((day) => {
             if(day.subjects != undefined) {
                 let subjs = day.subjects?.sort((a, b) => a.time.hours - b.time.hours)
                 return {...day, subjects: subjs}

             } else {
                 return day
             }
         });
         sorted.days = days;           
            setFormSchedule(tempArray)
    }

    const deleteSubject = (dayIndex:number, subjIndex:number) => {     
        let tempArray = {...formSchedule};
        let tempSubjects = tempArray.days[dayIndex].subjects;
        tempSubjects = tempSubjects?.filter((_subj, index) => index != subjIndex)
        if(tempSubjects?.length == 0) {
           delete tempArray.days[dayIndex].subjects         
        } else {
            tempArray.days[dayIndex].subjects = tempSubjects

        }        
        setFormSchedule(tempArray)
    }

    const editSubject = (dayIndex:number, subjIndex:number, newSubj: typeSubject) => {
        let tempArray = {...formSchedule};        
        tempArray.days[dayIndex].subjects![subjIndex] = newSubj;
        let sorted = tempArray;
        let days = tempArray.days.map((day) => {
             if(day.subjects != undefined) {
                 let subjs = day.subjects?.sort((a, b) => a.time.hours - b.time.hours)
                 return {...day, subjects: subjs}

             } else {
                 return day
             }
        });
        sorted.days = days;           
        setFormSchedule(tempArray)
    }

    const exportJson = (file: typeSchedule) => {        
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

    

    const saveSchedule = () => {    
        navigate("/")            
       localStorage.setItem("schedule", JSON.stringify(formSchedule));
       //console.log(formSchedule)
       dispatch(setSchedule({schedule: formSchedule}));
    }
    
    return(<div>
        <fieldset className="border-dotted border-4 p-2 mb-4">
            <legend>Time & Numerator</legend>
            <div className="flex flex-col">
                <div className="mb-4">
                    <span className="block opacity-60 text-sm">*Changes immediately</span>
                    <label htmlFor="">Is this week a numerator: </label>
                    <select defaultValue={isNumerator == true ? "true" : "false"} onChange={handleChange} name="numerator" id="">                       
                        <option  value="true">yes</option>
                        <option  value="false">no</option>
                    </select>
                </div>
                <div className="flex flex-wrap">
                    <div>
                        <label>Break length: </label>
                        <div key={"breakLength-div"} className="flex gap-4">
                            <label htmlFor="time-breakLength-hours"  className="bg-accent p-1 rounded"><input id="time-breakLength-hours"  name="time-breakLength-hours" onChange={handleChange} defaultValue={formSchedule.time.breakLength.hours} type="number" min={0} max={23}/>h</label>
                            <label htmlFor="time-breakLength-minutes" className="bg-accent p-1 rounded"><input id="time-breakLength-minutes" name="time-breakLength-minutes" onChange={handleChange} defaultValue={formSchedule.time.breakLength.minutes} type="number" min={0} max={60}/>m</label>
                        </div>
                    </div>
                    <div>
                        <label>Class length: </label>
                        <div key={"classLength-div"} className="flex gap-4">
                            <label htmlFor="time-classLength-hours" className="bg-accent p-1 rounded"><input id="time-classLength-hours" name="time-classLength-hours" onChange={handleChange} defaultValue={formSchedule.time.classLength.hours} type="number" min={0} max={23}/>h</label>
                            <label htmlFor="time-classLength-minutes" className="bg-accent p-1 rounded"><input id="time-classLength-minutes" name="time-classLength-minutes" onChange={handleChange} defaultValue={formSchedule.time.classLength.minutes} type="number" min={0} max={60}/>m</label>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
        {formSchedule.days.map((day, dayIndex) => {
            return <WeekdaySettings editSubject={editSubject} time={formSchedule.time} daySubjects={formSchedule.days[dayIndex].subjects} day={day} dayIndex={dayIndex}  addSubject={addSubject} deleteSubject={deleteSubject}/>
            })}
            <div className="flex flex-col gap-2">    
                <button onClick={() => exportJson(blankSchedule)}  className="text-orange-500 hover:bg-orange-500 hover:text-accent  p-2 rounded mx-auto  disabled:opacity-60 transition-all duration-500">Download a JSON sample file</button>
                <button onClick={() => exportJson(schedule!)} disabled={localStorageItem ? false : true} className="text-orange-500 hover:bg-orange-500 hover:text-accent  p-2 rounded mx-auto  disabled:opacity-60 transition-all duration-500">Save current schedule as JSON file</button>
                <button onClick={() => {
                    localStorage.removeItem("schedule")
                    dispatch(setSchedule({schedule: null}))
                    navigate("/")
                }} disabled={localStorageItem ? false : true} className="text-red-500 hover:bg-red-500 hover:text-accent  p-2 rounded mx-auto  disabled:opacity-60 transition-all duration-500">Reset my schedule</button>
                <div className="flex justify-center gap-4">
                    <button disabled={getTimeValid(formSchedule.time.breakLength) == true && getTimeValid(formSchedule.time.classLength) == true ? false : true} onClick={saveSchedule} className="text-green-500 hover:bg-green-500 hover:text-accent disabled:opacity-60 p-2 rounded transition-all duration-500">Save changes</button>
                    <button onClick={() => navigate("/")} className="hover:bg-black hover:text-accent  p-2 rounded transition-all duration-500">Cancel</button>        
                </div>
            </div>
    </div>)
}

export default Settings