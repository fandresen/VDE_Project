import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import modeReducer from "./modeSlice"

export const store = configureStore ({
    reducer: {
        auth: authReducer,
        mode: modeReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch