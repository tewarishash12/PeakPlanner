import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAuthInstance, axiosMainInstance } from "../hook";

export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) throw new Error("No access token found");

            const { data } = await axiosMainInstance.get(`/users/me`, {
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

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            console.log(refreshToken)
            if (!refreshToken) throw new Error("No refresh token found");

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            await axiosAuthInstance.post(`/auth/logout`, { token: refreshToken });

            return true;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Logout failed");
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await axiosAuthInstance.post(`/auth/login`, formData);
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
            const { data } = await axiosAuthInstance.post(`/auth/register`, formData);
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
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Logout user on clicking logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.currentUser = null;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, { payload }) => {
                state.error = payload;
            })
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
                localStorage.setItem("refreshToken", payload.refreshToken);
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

export const { } = authSlice.actions;
export default authSlice.reducer;
