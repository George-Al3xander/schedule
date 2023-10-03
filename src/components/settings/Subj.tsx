import { typeSubjSettingsProps } from "../../types/types"

import { v4 as uuidv4 } from 'uuid';
import DisplayTime from "../DisplayTime";


const Subj = ({subj, subjIndex, dayIndex, handleChange,deleteSubject, setEditStatus, setMenuShown, editStatus, setCurrentSubject}: typeSubjSettingsProps) => {



    return(<div key={uuidv4()} className="flex flex-col gap-4 pr-[60px] border-t-2 border-t-primary mb-2 py-4 flex-wrap relative">
    <h1 className="italic font-medium">{subj.name}</h1>
    <div  className="flex gap-2">
        <h2>Time: </h2>
        <DisplayTime hours={subj.time.hours} minutes={subj.time.minutes} />
    </div>
    
    <div  className="flex gap-2">
        <h2>Numerator: </h2>
        <h3>{subj.isNumerator !=undefined ? subj.isNumerator == true ? "Yes" : "No": "None"}</h3>
    </div>

    <div className="absolute right-0 flex gap-2">
        <button disabled={editStatus == true ? true : false} onClick={() => {
            setCurrentSubject(subj)
            setEditStatus(true)
            setMenuShown(true)
        }}  className="max-w-[1.5rem]  disabled:opacity-60"><svg className="w-[1.5rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg></button>
        <button disabled={editStatus == true ? true : false}  onClick={() => deleteSubject(dayIndex, subjIndex)} className="max-w-[1.5rem]  disabled:opacity-60"><svg className="w-[1.5rem]"    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg></button>

    </div>

</div> )
}

export default Subj