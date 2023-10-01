import {useState, useEffect} from "react"
import { typeSchedule } from "../types/types";



const Settings = () => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const blankSchedule : typeSchedule = {time: {breakLength: {hours: 0, minutes: 0}, classLength: {hours: 0, minutes: 0}},days: [{},{},{},{},{},{},{}]};
    const localStorageItem = JSON.parse(localStorage.getItem('schedule')!);     
    const [formSchedule, setFormSchedule] = useState<typeSchedule>(localStorageItem ? localStorageItem : blankSchedule)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name.split('-')        
        const value = e.target.value;
        if(name.length > 0) {
            if(name[0] == "time") {
                if(name[1] == "breakLength") {
                    setFormSchedule({...formSchedule, time: {...formSchedule.time, breakLength: {...formSchedule.time.breakLength, [name[2]]: +value}}})
                } else {
                    setFormSchedule({...formSchedule, time: {...formSchedule.time, classLength: {...formSchedule.time.classLength, [name[2]]: +value}}})
                }
            } else {

            }
        }
    }
    const addEmptySubject = (index: number) => {
        let tempArray = {...formSchedule};
        if(formSchedule.days[index].subjects) {
            tempArray.days[index].subjects?.push({name: "", time: {hours: 0, minutes: 0}})
        } else {
            tempArray.days[index].subjects = [{name: "", time: {hours: 0, minutes: 0}}]
        }
        console.log(tempArray)
        setFormSchedule(tempArray)
    }
    useEffect(() => {
        //console.log(formSchedule)
    }, [formSchedule])
    return(<form onSubmit={(e) => e.preventDefault()}>
        <fieldset className="border-dotted border-4 p-2 mb-4">
            <legend>Time</legend>
            <div className="flex justify-between">
                <div>
                    <label>Break length: </label>
                    <div className="flex gap-4">
                        <span className="bg-accent p-1 rounded"><input name="time-breakLength-hours" onChange={(handleChange)} defaultValue={formSchedule.time.breakLength.hours} type="number" min={0} max={23}/>h</span>
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
        </fieldset>
        {formSchedule.days.map((day, index) => {
            return <fieldset className="border-dotted border-4 p-2 mb-4">
                    <legend>{dayNames[formSchedule.days.indexOf(day)]}</legend>
                    {day.subjects != undefined ? day.subjects.map((subj) => {
                        return <div className="flex gap-2 border-y-2 border-t-primary mb-2 py-2">
                            <input className="basis-[100%]" placeholder="Class name" defaultValue={subj.name} type="text" />
                            <div  className="basis-[100%]">
                                <label>Time: </label>
                                <span className="bg-accent p-1 rounded"><input name="time-breakLength-hours" onChange={(handleChange)} defaultValue={subj.time.hours} type="number" min={0} max={23}/>h</span>
                                <span className="bg-accent p-1 rounded"><input name="time-breakLength-minutes" onChange={handleChange} defaultValue={subj.time.minutes} type="number" min={0} max={60}/>m</span>
                            </div>

                            <div  className="basis-[100%]">
                                <label htmlFor="">Numerator: </label>
                                <select name="numerator" id="">
                                    <option >None</option>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>
                            <svg  className="basis-[100%] max-w-[1.5rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
                        </div>  
                    }) : <h2 className="opacity-60">No subjects for that day</h2>}   
                    <div className="flex py-2">
                        <button onClick={() => addEmptySubject(index)} className="mx-auto text-green-600 px-4">Add</button>   
                    </div>
                </fieldset>
        })}
    </form>)
}

export default Settings