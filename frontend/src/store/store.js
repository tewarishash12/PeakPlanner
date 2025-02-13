import { configureStore } from "@reduxjs/toolkit"
import modeReducer from "../slices/modeSlice"
import authReducer from "../slices/authSlice"

export default configureStore({
    reducer: {
        mode: modeReducer,
        auth:authReducer
    }
})