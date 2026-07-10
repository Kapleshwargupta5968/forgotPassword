import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user:null,
    token:localStorage.getItem("accessToken") ? JSON.parse(localStorage.getItem("accessToken")) : null,
    error:null
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        authStart:(state) => {
            state.error = null;
        },
        authSuccess:(state,action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
        },
        authFailure:(state,action) => {
            state.user = null;
            state.token = null;
            state.error = action.payload;
        },
        authLogout:(state) => {
            state.user = null;
            state.token = null;
            state.error = null;
        }
    }
})

export const {authStart,authSuccess,authFailure,authLogout} = authSlice.actions;
export default authSlice.reducer;