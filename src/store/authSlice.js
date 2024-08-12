import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null,
    theme:  localStorage.getItem('theme')||"light",
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        lightTheme:(state) => {
            state.theme = 'light';
            localStorage.setItem("theme", "light");
        },
        darkTheme:(state) => {
            state.theme = 'dark';
            localStorage.setItem("theme", "dark");
        },
        error: (state, action) => {
            state.error = action.payload;
        },
     }
})

export const {login, logout,lightTheme,darkTheme,error} = authSlice.actions;

export default authSlice.reducer;