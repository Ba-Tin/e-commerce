import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import productSlice from './product/productSlice';


export const store = configureStore({
  reducer: {
    cate: appSlice,
    products: productSlice
  },
});
