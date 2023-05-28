import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncActions'


export const appSlice = createSlice({
    name: 'app',
    initialState: {
        categories: null,
        isLoading: false
    },
    reducers: {
        logout: (state) => {
            state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        //categroies
        builder.addCase(actions.getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload;
        });

        builder.addCase(actions.getCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
        //product
    },
})
export const { } = appSlice.actions

export default appSlice.reducer