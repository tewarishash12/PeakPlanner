import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_LINK = import.meta.env.VITE_AUTH_API_URL;
const MAIN_LINK = import.meta.env.VITE_MAIN_API_URL;

export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) throw new Error("No access token found");

            const { data } = await axios.get(`${MAIN_LINK}/users/me`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${AUTH_LINK}/auth/login`, formData);
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
            const { data } = await axios.post(`${AUTH_LINK}/auth/register`, formData);
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
            // Fetch current user on refresh
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.currentUser = payload.user;
            })
            .addCase(fetchCurrentUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            //login Cases
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                localStorage.setItem("accessToken", payload.access_token);
                localStorage.setItem("refreshToken", payload.refresh_token);
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
