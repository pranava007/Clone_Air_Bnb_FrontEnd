import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: [],  // Array to store multiple properties
    loading: false,
    error: null
};


const FilterSlice = createSlice({
    name:'filters',
    initialState,
    reducers:{

        filterSuccess: (state, action) => {
            state.filters = action.payload;
            state.loading = false;
            state.error = null;
        },

    }

})

export const { filterSuccess }=FilterSlice.actions;
export default FilterSlice.reducer;