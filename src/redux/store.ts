import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import modeReducer from "./modeSlice"
import PopUpSlice from './validationCodePopUp';

export const store = configureStore ({
    reducer: {
        auth: authReducer,
        mode: modeReducer,
        popUp: PopUpSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch