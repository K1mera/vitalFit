import { handleShopList, itemsAdded, setCurrentPage, setProducts, startLoading } from "./productSlice";




export const getProducts = (products, page = 1) => {
  return async (dispatch) => {
    dispatch(startLoading());

    

    dispatch(setProducts(products));
    dispatch(setCurrentPage(page));
  };
};
export const openShopList = (value) => {
  return async (dispatch) => {
    dispatch(handleShopList(value));
  };
};

export const addItems = (id) => {
  return async (dispatch) => {
    const { data } = await shopIns.get(`/products/${id}`);

    dispatch(itemsAdded(data));
  };
};

export const handlePages = (page = 1) => {
  return async (dispatch) => {
    dispatch(setCurrentPage(page));
  };
};

export const removeCartItem = (id) => {
  return async (dispatch) => {
    dispatch(removeItem(id));
  };
};

export const cleanShoppingCart = () => {
  return async (dispatch) => {
    dispatch(cleanEverything());
  };
};
