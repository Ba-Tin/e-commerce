import { createSlice } from "@reduxjs/toolkit";
import { getNewProducts } from './asyncActions'


export const productSlice = createSlice({
    name: 'product',
    initialState: {
        newProducts: null,
        isLoading: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getNewProducts.pending, (state) => {
            state.isLoading = false;
        });
        builder.addCase(getNewProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newProducts = action.payload;
        });

        builder.addCase(getNewProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
        //product
    },
})
// export const { } = appSlice.actions

export default productSlice.reducer