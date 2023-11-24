import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../../apis'

export const getCategories = createAsyncThunk('app/categories', async () => {
    const response = await apis.apiGetCategories()
    return response?.getCategory
})