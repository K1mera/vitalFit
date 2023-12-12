import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    currentPage: 1,
    itemsPerPage: 8,
    totalPages: 0,
  },
  reducers: {
    startLoading: (state /* action */) => {
      state.loading = true;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.totalPages = Math.ceil(action.payload.length / 8);
      state.loading = false;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    findbyProductByName: (state, action) => {
      state.dogs = action.payload;
      state.loading = false;
    },
    findbyProductById: (state, action) => {
      state.dogs = action.payload;
      state.loading = false;
    },
  },
});


// Action creators are generated for each case reducer function
export const { startLoading } =  productSlice.actions;