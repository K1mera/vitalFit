import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    categories: [],
    product: {},
    loading: false,
    currentPage: 1,
    itemsPerPage: 8,
    totalPages: 0,
    shopListOpen: false,
    shoppingCart: [],
    countTotal: 0,
    search: "",
    filters: {
      category: "",
      minPrice: "",
      maxPrice: "",
      /*  offer: false,
      active: true, */
    },
    sorts: {
      sortByName: "",
      sortByPrice: "",
    },
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
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    findbyProductById: (state, action) => {
      state.product = action.payload;
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
    removeItem: (state, action) => {
      const itemToRemove = action.payload;
      const existingItem = state.shoppingCart.find(
        (item) => item.id === itemToRemove
      );

      if (existingItem) {
        existingItem.count--;

        if (existingItem.count === 0) {
          state.shoppingCart = state.shoppingCart.filter(
            (item) => item.id !== itemToRemove
          );
        }
        state.countTotal -= 1;
      }
    },
    handleShopList: (state, action) => {
      state.shopListOpen = action.payload;
    },
    cleanEverything: (state, action) => {
      state.shoppingCart = [];
      state.countTotal = 0;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setSorts: (state, action) => {
      state.sorts = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    resetFilters: (state, action) => {
      state.filters = {
        category: "",
        minPrice: "",
        maxPrice: "",
      };
    },
    resetSearch: (state, action) => {
      state.search = "";
    },
    resetSorts: (state, action) => {
      state.sorts = {
        sortByName: "",
        sortByPrice: "",
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setProducts,
  setCategories,
  startLoading,
  findbyProductById,
  handleShopList,
  itemsAdded,
  removeItem,
  setCurrentPage,
  cleanEverything,
  setFilters,
  resetFilters,
  setSorts,
  setSearch,
  resetSorts,
  resetSearch,
} = productSlice.actions;

//export const { filters } = productSlice.getInitialState();
