import { createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-toastify'

const toastSlice= createSlice({
    name:'toast',
    initialState:{
        
        message:"",
        duration:5000,
    },
    reducers:{
        showToast(state,action){
            
          console.log(action.payload)
            toast.success(action.payload, {
                
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }
});

export default toastSlice.reducer;
export const {showToast} = toastSlice.actions;