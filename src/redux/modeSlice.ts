import { createSlice } from "@reduxjs/toolkit";

interface DarkMode {
    state: boolean;
}

const initialState: DarkMode = {
    state: false,
}

export const modeSlice = createSlice ({
    name: "mode",
    initialState,
    reducers: {
        switchMode: (state) => {
            state.state = !state.state;
        },
    }
})

export const {switchMode} = modeSlice.actions;
export default modeSlice.reducer;