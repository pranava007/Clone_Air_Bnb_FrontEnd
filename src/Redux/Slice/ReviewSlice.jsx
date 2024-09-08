import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    reviwe:[],
    loading:false,
    error:null,
}

const ReviewSlice = createSlice({

    name:'reviwe',
    initialState,
    reducers:{
        reviweSuccess:(state,action)=>{
            state.reviwe = action.payload
            state.loading = false
            state.error = null
        }
    }

})

export const { reviweSuccess  } = ReviewSlice.actions;
export default ReviewSlice.reducer;