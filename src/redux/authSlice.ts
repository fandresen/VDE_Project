import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    accessToken: string;
    userRole: string;
}

const initialState: AuthState = {
    isAuthenticated: false,
    accessToken:"",
    userRole: ''
}

export const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            // console.log("set the state: " , action.payload);
            
            state.isAuthenticated = action.payload;
        },
        setUserRole: (state, action:PayloadAction<string>) => {
            state.userRole = action.payload;
        },
        setAccessToken: (state, action:PayloadAction<string>) => {                        
            state.accessToken = action.payload;
        }
    }
})

export const {setAuth, setUserRole, setAccessToken} = authSlice.actions;
export default authSlice.reducer;