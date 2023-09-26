import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface MainStates {
    busyStatus: boolean,
    isNumerator: boolean

}


const initialState: MainStates = {
    busyStatus: false,
    isNumerator: false
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
    }
})

export const {setBusyStatus, setIsNumerator} = mainSlice.actions

export const selectInfo = (state: RootState) => state.mainStates
export default mainSlice.reducer