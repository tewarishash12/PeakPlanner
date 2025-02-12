import { createSlice } from "@reduxjs/toolkit";

const initialMode = JSON.parse(localStorage.getItem("darkMode")) ?? false;

const modeSlice = createSlice({
    name: "mode",
    initialState: {
        darkMode: initialMode,
    },
    reducers: {
        toggleMode: (state) => {
            const newMode = !state.darkMode;
            state.darkMode = newMode; 
            localStorage.setItem("darkMode", JSON.stringify(newMode));
        },
    },
});

export const { toggleMode } = modeSlice.actions;
export default modeSlice.reducer;
