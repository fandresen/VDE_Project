import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    value: boolean;
}

const initialState: AuthState = {
    value: false
}

export const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
        }
    }
})

export const {setAuth} = authSlice.actions;
export default authSlice.reducer;