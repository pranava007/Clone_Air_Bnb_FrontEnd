import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    bookingInfo:[],
    loading:false,
    error:null,
}

const BookingSlice = createSlice({
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

export const { bookingInfoSuccess  } = BookingSlice.actions;
export default BookingSlice.reducer;
