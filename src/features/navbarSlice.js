import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice= createSlice({
    name:"navbar",
    initialState:{
        value:0,
    },
    reducers: {
        changeRoute: (state,action) => {
            state.value= action.payload;
        }
    }
})

export const {changeRoute} = navbarSlice.actions

export default navbarSlice.reducer;