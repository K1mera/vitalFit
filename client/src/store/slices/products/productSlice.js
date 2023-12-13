import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    currentPage: 1,
    itemsPerPage: 8,
    totalPages: 0,
    shopListOpen: false,
    shoppingCart: [],
    countTotal: 0,
    
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
    itemsAdded: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.shoppingCart.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.count++;
      } else {
        state.shoppingCart.push({ ...newItem, count: 1 });
      }
      state.countTotal += 1;
    },
    handleShopList: (state, action) => {
      state.shopListOpen = action.payload;
    },
  },
});


// Action creators are generated for each case reducer function
export const { setProducts, startLoading, handleShopList, itemsAdded, setCurrentPage } =  productSlice.actions;