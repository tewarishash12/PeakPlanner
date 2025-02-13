import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("http://localhost:4001/auth/login", formData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("http://localhost:4001/auth/register", formData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Registration failed");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: null,
        loading: false,
        error: null
    },
    reducers: {
        logoutUser: (state) => {
            state.currentUser = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            //login Cases
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.currentUser = payload.user;
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            // Register cases
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.currentUser = payload.user;
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    }
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
