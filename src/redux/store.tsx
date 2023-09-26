import { configureStore } from "@reduxjs/toolkit";
import mainStates from "./mainStates";
export const store = configureStore({
    reducer: {
        mainStates: mainStates
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch