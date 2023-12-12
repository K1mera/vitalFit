import { configureStore } from '@reduxjs/toolkit'
import { productSlice } from './slices/products/productSlice'


export const store = configureStore({
    reducer: {
        product: productSlice.reducer,
    }
})
