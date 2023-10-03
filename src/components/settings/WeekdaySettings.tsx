import {  typeSubject, typeWeekdaySettingsProps } from "../../types/types";
import SubjSettings from "./SubjSettings"
import Subj from "./Subj";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const WeekdaySettings = ({dayIndex,  day,  addSubject, deleteSubject,editSubject, daySubjects, time}: typeWeekdaySettingsProps) => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [menuShown, setMenuShown] = useState(false);
    const [editStatus, setEditStatus] = useState(false)
    const blankSubj = {name: "", time: {hours: 0, minutes: 0}}
    const [currentSubject, setCurrentSubject] = useState(blankSubj)
    const [currentIndex, setCurrentIndex] = useState(0)
    
    const close = () => {
        setMenuShown(false)
        setEditStatus(false)
    }

    const open = () => {
        setMenuShown(true)
        setEditStatus(true)
    }

    const getCurrentSubject = (currSubj: typeSubject, index: number) => {
        setCurrentSubject(currSubj)
        setCurrentIndex(index)
    }
    
    return(<>
        <fieldset key={uuidv4()} className="border-dotted border-4 p-2 mb-4">
            <legend className="text-lg font-bold">{dayNames[dayIndex]}</legend>

            {day.subjects != undefined ? 
                day.subjects.map((subj, subjIndex) => <Subj open={open} getCurrentSubject={getCurrentSubject} editStatus={menuShown}  subj={subj} subjIndex={subjIndex} dayIndex={dayIndex}  deleteSubject={deleteSubject}/>) 
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
        <SubjSettings index={currentIndex} editSubject={editSubject} time={time!} daySubjects={daySubjects} addSubject={addSubject}  close={close} editStatus={editStatus} subj={editStatus ? currentSubject : blankSubj}   dayIndex={dayIndex}  />
        :
        null
        }
        </fieldset>
    </>)
}

export default WeekdaySettings