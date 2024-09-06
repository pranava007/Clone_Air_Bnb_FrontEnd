import { createSlice } from "@reduxjs/toolkit";
import { bool } from "yup";

const initialState = {
    bookingInfo:[],
    loading:false,
    error:null,
}

const BookingDataInfo = createSlice({
    name:'bookingInfo',
    initialState,
    reducers:{
        bookingInfoSuccess:(state,action)=>{
              state.bookingInfo = action.payload
              state.loading = false
              state.error = null
        }
    }
})

export const { bookingInfoSuccess  } = BookingDataInfo.actions;
export default BookingDataInfo.reducer;
