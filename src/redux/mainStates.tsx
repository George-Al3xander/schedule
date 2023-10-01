import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { typeSchedule } from '../types/types'

interface MainStates {
    busyStatus: boolean,
    isNumerator: boolean,
    schedule: typeSchedule | null

}


const initialState: MainStates = {
    busyStatus: false,
    isNumerator: false,
    schedule: null
}

export const mainSlice = createSlice({
    name: "mainStates",
    initialState,
    reducers: {        
        setBusyStatus: (state, action: PayloadAction<{status: boolean}>) => {
            state.busyStatus = action.payload.status
        },
        setIsNumerator: (state, action: PayloadAction<{status: boolean}>) => {
            state.isNumerator = action.payload.status
        },
        setSchedule: (state, action: PayloadAction<{schedule: typeSchedule | null}>) => {
            state.schedule = action.payload.schedule
        },
    }
})

export const {setBusyStatus, setIsNumerator, setSchedule} = mainSlice.actions

export const selectInfo = (state: RootState) => state.mainStates
export default mainSlice.reducer