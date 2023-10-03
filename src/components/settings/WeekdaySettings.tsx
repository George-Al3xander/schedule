import {  typeWeekdaySettingsProps } from "../../types/types";
import SubjSettings from "./SubjSettings"
import Subj from "./Subj";
import { useState } from "react";


const WeekdaySettings = ({dayIndex,  day, handleChange, addSubject, deleteSubject, daySubjects, time}: typeWeekdaySettingsProps) => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [menuShown, setMenuShown] = useState(false);
    const [editStatus, setEditStatus] = useState(false)
    const [currentSubject, setCurrentSubject] = useState({name: "", time: {hours: 0, minutes: 0}})
    return(<>
        <fieldset className="border-dotted border-4 p-2 mb-4">
            <legend>{dayNames[dayIndex]}</legend>

            {day.subjects != undefined ? 
                day.subjects.map((subj, subjIndex) => <Subj setCurrentSubject={setCurrentSubject} editStatus={menuShown} setEditStatus={setEditStatus} setMenuShown={setMenuShown} subj={subj} subjIndex={subjIndex} dayIndex={dayIndex} handleChange={handleChange} deleteSubject={deleteSubject}/>) 
                : 
                menuShown == true ?
                null
                :
                <h2 className="opacity-60">No subjects for that day</h2>
            }   
            <div className="flex py-2">
               {menuShown ? null :  <button onClick={() => setMenuShown(true)} className="mx-auto text-green-600 px-4">Add</button>}   
            </div>
        {menuShown ?  
        <SubjSettings time={time} daySubjects={daySubjects} addSubject={addSubject} setCurrentSubject={setCurrentSubject} setEditStatus={setEditStatus} editStatus={editStatus} subj={editStatus ? currentSubject : {name: "", time: {hours: 0, minutes: 0}}} setMenuShown={setMenuShown} subjIndex={12} dayIndex={dayIndex} handleChange={handleChange} deleteSubject={deleteSubject} />
        :
        null
        }
        </fieldset>
    </>)
}

export default WeekdaySettings