import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    userRole: string;
}

const initialState: AuthState = {
    isAuthenticated: false,
    userRole: ''
}

export const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        setUserRole: (state, action:PayloadAction<string>) => {
            state.userRole = action.payload;
        }
    }
})

export const {setAuth, setUserRole} = authSlice.actions;
export default authSlice.reducer;