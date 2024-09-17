// src/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    refreshToken: null,
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },
        clearTokens: (state) => {
            state.token = null;
            state.refreshToken = null;
            state.user = null;
            state.isAuthenticated = false;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setToken, setRefreshToken, clearTokens, setUser } = authSlice.actions;

export default authSlice.reducer;
