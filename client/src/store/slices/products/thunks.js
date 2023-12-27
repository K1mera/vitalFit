import { productsIns } from "../../../api";
import {
  cleanEverything,
  handleShopList,
  itemsAdded,
  removeItem,
  setCurrentPage,
  setProducts,
  startLoading,
} from "./productSlice";

export const getProducts = (page = 1) => {
  return async (dispatch) => {
    dispatch(startLoading());

    const { data } = await productsIns.get("/");
    // console.log(data);

    dispatch(setProducts(data));
    dispatch(setCurrentPage(page));
  };
};

export const onSearchProduct = ({ breed }) => {
  return async (dispatch) => {
    const { data } = await dogIns.get("/dogs");

    const dogsMatching = data.filter((item) =>
      item.name.toLowerCase().startsWith(breed.toLowerCase())
    );

    dispatch(setProducts(dogsMatching));
    dispatch(setCurrentPage(1));
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
