import { useEffect, useRef, useState } from "react";
import { typeSubjSettingsProps, typeSubject } from "../../types/types"

import { v4 as uuidv4 } from 'uuid';
import useValid from "../../hooks/useValid";
import moment from "moment";


const SubjSettings = ({subj,daySubjects, subjIndex, dayIndex, deleteSubject, setMenuShown, editStatus, setEditStatus, addSubject, time}: typeSubjSettingsProps) => {

    const formRef = useRef<HTMLFormElement>(null)
    const [formData, setFormData] = useState<typeSubject>(subj)
    const valid = useValid(daySubjects!, formData, time);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name        
        const value = e.target.value;

        if(name == "name") {
            setFormData({...formData, name: value})
        } 
        else if(name == "hours") {
            setFormData({...formData, time: {...formData.time, hours: +value}})
        }
        else if(name == "minutes") {
            setFormData({...formData, time: {...formData.time, minutes: +value}})
        } else if(name == "numerator") {
            if(value == "none") {
                const tempSubj = {...formData};
                delete tempSubj.isNumerator
                setFormData(tempSubj);
            } else if(value == "true") {
                setFormData({...formData, isNumerator: true})
            } else if(value == "false") {
                setFormData({...formData, isNumerator: false})
            }
        }
    }

    const close = () => {
        setMenuShown(false)
        setEditStatus(false)
    }

    const addCurrentSubject = () => {
        addSubject(dayIndex, formData)
    }

    useEffect(() => {
        //console.log(formData)
    }, [formData])

    return(<form  onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current!)
        const name = formData.get("name")
        const numerator = formData.get("numerator")
        const time = {hours: formData.get("hours"), minutes: formData.get("minutes")}
        
        //console.log(name, numerator, time)
    }} ref={formRef} className="flex flex-col border-2 border-primary p-2">
        <div key={"setting-form-div"} className="flex flex-col gap-4 pr-4  mb-2 py-4 flex-wrap relative">
        <input onChange={handleChange} className="p-2 max-w-[40%] rounded"   key={"setting-form-name"} name={`name`}  placeholder="Class name" defaultValue={formData.name} type="text" />
        <div  className="flex items-center gap-2">
            <label>Time: </label>
            <span key={`span-time-hours` } className="bg-accent p-2 rounded"><input onChange={handleChange} key={`hours` }  name={`hours`}  defaultValue={formData.time.hours} type="number" min={0} max={23}/>h</span>
            <span key={`span-minutes` } className="bg-accent p-2 rounded"><input onChange={handleChange} key={`minutes` }  name={`minutes`}  defaultValue={formData.time.minutes} type="number" min={0} max={60}/>m</span>
        </div>
        <div  className="">
            <label htmlFor="">Numerator: </label>
            <select defaultValue={formData.isNumerator != undefined? formData.isNumerator == true ? "true" : "false" : "none"} onChange={handleChange} key={uuidv4()} name={`numerator` }   id="">
                <option value="none">None</option>
                <option value="true">True</option>
                <option value="false">False</option>
            </select>
        </div>
        <button  onClick={() => deleteSubject(dayIndex, subjIndex)} className="max-w-[1.5rem] absolute right-0"><svg className="w-[1.5rem]"    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></button>
        </div>
        <div className="flex justify-center gap-4">
            <button disabled={valid == true ? false : true} onClick={addCurrentSubject}  className="text-green-500 hover:bg-green-500 hover:text-accent disabled:opacity-60 p-2 rounded transition-all duration-500">{editStatus == true ? "Save" : "Add"}</button>
            <button onClick={close} className="hover:bg-black hover:text-accent  p-2 rounded transition-all duration-500">Cancel</button>        
        </div>
    </form>)
}

export default SubjSettings