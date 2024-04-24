import { createSlice } from "@reduxjs/toolkit";

export const FilterDialogueSlice= createSlice({
    name:"filterDialogue",
    initialState:{
        value:false,
    },
    reducers: {
        toggleDialogue: (state,action) => {
            state.value= !state.value;
        }
    }
})

export const {toggleDialogue} = FilterDialogueSlice.actions

export default FilterDialogueSlice.reducer;