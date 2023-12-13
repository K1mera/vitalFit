import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    currentOrder: [],
    onOrder: {},
    totalPriceOrder: 0,
    orderWindow: false,
  },
  reducers: {
    checkOutOrder: (state, action) => {
      state.currentOrder = action.payload;
      state.orderWindow = true;
    },
    getCurrentOrder: (state, action) => {
      state.onOrder = action.payload;
    },
    getOrders: (state, action) => {
      state.orders = action.payload;
    },
    saveOrder: (state, action) => {
      state.orders = [action.payload, ...state.orders];
      state.orderWindow = false;
    },
    passTotalPrice: (state, action) => {
      state.totalPriceOrder = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  checkOutOrder,
  getOrders,
  saveOrder,
  passTotalPrice,
  getCurrentOrder,
} = orderSlice.actions;
