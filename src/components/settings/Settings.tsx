import {useState, useEffect} from "react"
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
        console.log(tempArray)   
        setFormSchedule(tempArray)
    }

    const deleteSubject = (dayIndex:number, subjIndex:number) => {     
        let tempArray = {...formSchedule};
        let tempSubjects = tempArray.days[dayIndex].subjects;
        tempSubjects = tempSubjects?.filter((subj, index) => index != subjIndex)
        if(tempSubjects?.length == 0) {
           delete tempArray.days[dayIndex].subjects         
        } else {
            tempArray.days[dayIndex].subjects = tempSubjects

        }
        //console.log(tempArray)
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

    useEffect(() => {
        //console.log(formSchedule)
    }, [formSchedule])

    const saveSchedule = () => {
        let sorted = formSchedule;
        let days = formSchedule.days.map((day) => {
            let subjs = day.subjects?.sort((a, b) => a.time.hours - b.time.hours)
            if(day.subjects) {
                return {...day, subjects: subjs}

            } else {
                return day
            }
        });
        sorted.days = days;        
       // localStorage.setItem("schedule", JSON.stringify(sorted))
       console.log(sorted)
       // dispatch(setSchedule({schedule: sorted}))
    }
    
    return(<div>
        <fieldset className="border-dotted border-4 p-2 mb-4">
            <legend>Time & Numerator</legend>
            <div className="flex flex-col">
                <div className="mb-4">
                    <span className="block opacity-60 text-sm">*Changes immediately</span>
                    <label htmlFor="">Is this week a numerator: </label>
                    <select onChange={handleChange} name="numerator" id="">                       
                        <option selected={isNumerator ? true : false} value="true">yes</option>
                        <option selected={!isNumerator ? true : false} value="false">no</option>
                    </select>
                </div>
                <div className="flex justify-between">
                    <div>
                        <label>Break length: </label>
                        <div key={"breakLength-div"} className="flex gap-4">
                            <span className="bg-accent p-1 rounded"><input name="time-breakLength-hours" onChange={handleChange} defaultValue={formSchedule.time.breakLength.hours} type="number" min={0} max={23}/>h</span>
                            <span className="bg-accent p-1 rounded"><input name="time-breakLength-minutes" onChange={handleChange} defaultValue={formSchedule.time.breakLength.minutes} type="number" min={0} max={60}/>m</span>
                        </div>
                    </div>
                    <div>
                        <label>Class length: </label>
                        <div key={"classLength-div"} className="flex gap-4">
                            <span className="bg-accent p-1 rounded"><input name="time-classLength-hours" onChange={handleChange} defaultValue={formSchedule.time.classLength.hours} type="number" min={0} max={23}/>h</span>
                            <span className="bg-accent p-1 rounded"><input name="time-classLength-minutes" onChange={handleChange} defaultValue={formSchedule.time.classLength.minutes} type="number" min={0} max={60}/>m</span>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
        {formSchedule.days.map((day, dayIndex) => {
            return <WeekdaySettings time={formSchedule.time} daySubjects={formSchedule.days[dayIndex].subjects} day={day} dayIndex={dayIndex}  addSubject={addSubject} deleteSubject={deleteSubject}/>
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
                    <button onClick={saveSchedule} className="text-green-500 hover:bg-green-500 hover:text-accent disabled:opacity-60 p-2 rounded transition-all duration-500">Save changes</button>
                    <button onClick={() => navigate("/")} className="hover:bg-black hover:text-accent  p-2 rounded transition-all duration-500">Cancel</button>        
                </div>
            </div>
    </div>)
}

export default Settings