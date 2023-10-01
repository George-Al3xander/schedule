import {useState, useEffect} from "react"
import { typeSchedule } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { setSchedule } from "../redux/mainStates";
import { useNumerator } from "../hooks/useNumerator";



const Settings = () => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const blankSchedule : typeSchedule = {time: {breakLength: {hours: 0, minutes: 0}, classLength: {hours: 0, minutes: 0}},days: [{},{},{},{},{},{},{}]};
    const localStorageItem = JSON.parse(localStorage.getItem('schedule')!);     
    const [formSchedule, setFormSchedule] = useState<typeSchedule>(localStorageItem ? localStorageItem : blankSchedule)
    const {schedule} = useSelector((state: RootState) => state.mainStates);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isNumerator = useNumerator()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name.split('-')        
        const value = e.target.value;
       
        if(name[0] == "time") {
            if(name[1] == "breakLength") {
                setFormSchedule({...formSchedule, time: {...formSchedule.time, breakLength: {...formSchedule.time.breakLength, [name[2]]: +value}}})
            } else {
                setFormSchedule({...formSchedule, time: {...formSchedule.time, classLength: {...formSchedule.time.classLength, [name[2]]: +value}}})
            }
        } else if(name[0] == "subj") {
            const dayIndex = +name[1];
            const subjIndex = +name[2];

            let tempArray = {...formSchedule};            
            let subj = tempArray.days[dayIndex].subjects![subjIndex];

           if(name[3] == "time") {
                if(name[4] == "hours") {
                    subj.time.hours = +value;
                } else {
                    subj.time.minutes = +value;
                }
           } else if(name[3] == "name") {
                subj.name = value.trim();
           } else if(name[3] == "numerator") {
            console.log(value)
                if(value != "none") {
                    if(value == "true") {
                        subj.isNumerator = true
                    } else if(value == "false") {
                        subj.isNumerator = false
                    }
                } else {
                    delete subj.isNumerator
                }
           } 
           tempArray.days[dayIndex].subjects![subjIndex] = subj
           setFormSchedule(tempArray)           
        } else if(name[0] == "numerator") {
            let status = true;
            if(value == 'false') {
                status = false
                console.log("Here")
            }
            localStorage.setItem("numerator", JSON.stringify({status, start: new Date()}))
        }
        
    }
    const addEmptySubject = (index: number) => {
        let tempArray = {...formSchedule};
        if(formSchedule.days[index].subjects) {
            tempArray.days[index].subjects?.push({name: "", time: {hours: 0, minutes: 0}})
        } else {
            tempArray.days[index].subjects = [{name: "", time: {hours: 0, minutes: 0}}]
        }       
        setFormSchedule(tempArray)
    }

    const deleteSubject = (dayIndex:number, subjIndex:number) => {
        let tempArray = {...formSchedule};
        let tempSubjects = tempArray.days[dayIndex].subjects;
        tempSubjects = tempSubjects?.filter((subj,index) => index != subjIndex)
        if(tempSubjects?.length == 0) {
           delete tempArray.days[dayIndex].subjects
        } else {
            tempArray.days[dayIndex].subjects = tempSubjects

        }
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
    return(<form onSubmit={(e) => e.preventDefault()}>
        <fieldset className="border-dotted border-4 p-2 mb-4">
            <legend>Time & Numerator</legend>
            <div className="flex flex-col">
                <div className="mb-4">
                    <span className="block opacity-60 text-sm">*Changes immediately, without save</span>
                    <label htmlFor="">Is this week a numerator: </label>
                    <select onChange={handleChange} name="numerator" id="">                       
                        <option selected={isNumerator ? true : false} value="true">true</option>
                        <option selected={!isNumerator ? true : false} value="false">false</option>
                    </select>
                </div>
                <div className="flex justify-between">
                    <div>
                        <label>Break length: </label>
                        <div className="flex gap-4">
                            <span className="bg-accent p-1 rounded"><input name="time-breakLength-hours" onChange={handleChange} defaultValue={formSchedule.time.breakLength.hours} type="number" min={0} max={23}/>h</span>
                            <span className="bg-accent p-1 rounded"><input name="time-breakLength-minutes" onChange={handleChange} defaultValue={formSchedule.time.breakLength.minutes} type="number" min={0} max={60}/>m</span>
                        </div>
                    </div>
                    <div>
                        <label>Class length: </label>
                        <div className="flex gap-4">
                            <span className="bg-accent p-1 rounded"><input name="time-classLength-hours" onChange={handleChange} defaultValue={formSchedule.time.classLength.hours} type="number" min={0} max={23}/>h</span>
                            <span className="bg-accent p-1 rounded"><input name="time-classLength-minutes" onChange={handleChange} defaultValue={formSchedule.time.classLength.minutes} type="number" min={0} max={60}/>m</span>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
        {formSchedule.days.map((day, index) => {
            return <fieldset className="border-dotted border-4 p-2 mb-4">
                    <legend>{dayNames[formSchedule.days.indexOf(day)]}</legend>
                    {day.subjects != undefined ? day.subjects.map((subj, index) => {
                        return <div className="flex gap-4 pr-4 border-y-2 border-t-primary mb-2 py-2 flex-wrap relative">
                            <input  onChange={handleChange} name={`subj-${formSchedule.days.indexOf(day)}-${index}-name`}  placeholder="Class name" defaultValue={subj.name} type="text" />
                            <div  className="">
                                <label>Time: </label>
                                <span className="bg-accent p-1 rounded"><input  name={`subj-${formSchedule.days.indexOf(day)}-${index}-time-hours`} onChange={handleChange} defaultValue={subj.time.hours} type="number" min={0} max={23}/>h</span>
                                <span className="bg-accent p-1 rounded"><input  name={`subj-${formSchedule.days.indexOf(day)}-${index}-time-minutes`} onChange={handleChange} defaultValue={subj.time.minutes} type="number" min={0} max={60}/>m</span>
                            </div>

                            <div  className="">
                                <label htmlFor="">Numerator: </label>
                                <select name={`subj-${formSchedule.days.indexOf(day)}-${index}-numerator`} onChange={handleChange}  id="">
                                    <option value="none">None</option>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>
                            <button  onClick={() => deleteSubject(formSchedule.days.indexOf(day), index)} className="max-w-[1.5rem] absolute right-0"><svg className="w-[1.5rem]"    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></button>
                        </div>  
                    }) : <h2 className="opacity-60">No subjects for that day</h2>}   
                    <div className="flex py-2">
                        <button onClick={() => addEmptySubject(index)} className="mx-auto text-green-600 px-4">Add</button>   
                    </div>
                </fieldset>
            })}
            <div className="flex flex-col gap-2">    
                <button onClick={() => exportJson(schedule!)} disabled={localStorageItem ? false : true} className="text-orange-500 hover:bg-orange-500 hover:text-accent  p-2 rounded mx-auto  disabled:opacity-60 transition-all duration-500">Save current schedule as JSON file</button>
                <button onClick={() => {
                    localStorage.removeItem("schedule")
                    dispatch(setSchedule({schedule: null}))
                    navigate("/")
                }} disabled={localStorageItem ? false : true} className="text-red-500 hover:bg-red-500 hover:text-accent  p-2 rounded mx-auto  disabled:opacity-60 transition-all duration-500">Reset my schedule</button>
                <div className="flex justify-center gap-4">
                    <button onClick={() => {
                        localStorage.setItem("schedule", JSON.stringify(formSchedule))
                        dispatch(setSchedule({schedule: formSchedule}))
                    }} className="text-green-500 hover:bg-green-500 hover:text-accent p-2 rounded transition-all duration-500">Save changes</button>
                    <button onClick={() => navigate("/")} className="hover:bg-black hover:text-accent  p-2 rounded transition-all duration-500">Cancel</button>        
                </div>
            </div>
    </form>)
}

export default Settings