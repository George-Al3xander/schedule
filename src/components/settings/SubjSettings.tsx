import {useRef, useState } from "react";
import { typeSubjSettingsProps, typeSubject } from "../../types/types"

import { v4 as uuidv4 } from 'uuid';
import useValid from "../../hooks/useValid";



const SubjSettings = ({subj,daySubjects, editSubject, index,dayIndex,  editStatus, close, addSubject, time}: typeSubjSettingsProps) => {

    const formRef = useRef<HTMLFormElement>(null)
    const [formData, setFormData] = useState<typeSubject>(subj)
    const {nameValid, timeValid} = useValid(daySubjects!, formData, time);
    
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

    

    const addCurrentSubject = () => {
        addSubject(dayIndex, formData)
        close()
    }

    const editCurrentSubject = () => {
        editSubject(dayIndex, index, formData)
        close();
    }



    return(<form onSubmit={(e) => e.preventDefault()}  ref={formRef} className="flex flex-col border-2 border-primary p-2">
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
        </div>
        {(nameValid == true && timeValid == true)  ? null : <ul className="text-red-600"><h1 className="italic font-bold">Check your inputs please:</h1> 
            {nameValid == false ? <li className="mb-2">Name of the subject can't be an empty string</li> : null}
            {timeValid == false ?  <li className="mb-2">Check your time to be in a correct time frame, so it can fit inside the existing schedule(including break and class lengths)</li> : null}
            
        </ul>}
        <div className="flex justify-center gap-4">
            {editStatus == true ?  
            <button disabled={(nameValid == true && timeValid == true) ? false : true} onClick={editCurrentSubject}  className="text-green-500 hover:bg-green-500 hover:text-accent disabled:opacity-60 p-2 rounded transition-all duration-500">Save</button>
            : 
            <button disabled={(nameValid == true && timeValid == true) ? false : true} onClick={addCurrentSubject}  className="text-green-500 hover:bg-green-500 hover:text-accent disabled:opacity-60 p-2 rounded transition-all duration-500">Add</button>
            }
            
            <button onClick={close} className="hover:bg-black hover:text-accent  p-2 rounded transition-all duration-500">Cancel</button>        
        </div>
    </form>)
}

export default SubjSettings