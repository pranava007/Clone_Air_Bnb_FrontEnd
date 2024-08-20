import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    properties: [],  // Array to store multiple properties
    loading: false,
    error: null
};


const propertySlice = createSlice({
    name:'property',
    initialState,
    reducers:{

        fetchPropertiesSuccess: (state, action) => {
            state.properties = action.payload;
            state.loading = false;
            state.error = null;
        },

    }

})

export const { fetchPropertiesSuccess }=propertySlice.actions;
export default propertySlice.reducer;