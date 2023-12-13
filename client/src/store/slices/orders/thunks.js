import {
  checkOutOrder,
  getCurrentOrder,
  passTotalPrice,
  saveOrder,
} from "./orderSlice";

export const processOrder = (items) => {
  return async (dispatch) => {
    dispatch(checkOutOrder(items));
  };
};

export const finishOrder = (id, date, order, totalAmount) => {
  return async (dispatch) => {
    dispatch(
      saveOrder({
        id,
        date,
        order,
        totalAmount,
      })
    );
  };
};

export const saveTotalPrice = (val) => {
  return async (dispatch) => {
    dispatch(passTotalPrice(val));
  };
};

export const getOrderById = (order) => {
  return async (dispatch) => {
    dispatch(getCurrentOrder(order));
  };
};
