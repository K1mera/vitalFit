import { productsIns } from "../../../api";
import {
  cleanEverything,
  findbyProductById,
  handleShopList,
  itemsAdded,
  removeItem,
  setCategories,
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

export const getProductById = (id) => {
  return async (dispatch) => {
   
      dispatch(startLoading());
      const { data } = await productsIns.get(`/product/${id}`);

      dispatch(findbyProductById(data));
    
  };
};

export const getCategories = () => {
  return async (dispatch) => {
    dispatch(startLoading());

    const { data } = await productsIns.get("/category");
    // console.log(data);

    dispatch(setCategories(data));
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

export const onSearchProduct = (product) => {
  return async (dispatch) => {
    const { data } = await productsIns.get("/");
    // console.log(product);

    const productsMatching = data.filter((item) =>
      item.name.toLowerCase().includes(product.toLowerCase())
    );

    dispatch(setProducts(productsMatching));
    dispatch(setCurrentPage(1));
  };
};

export const filteringProducts = (selectedFilters, products) => {
  return async (dispatch) => {
    // console.log(products);

    const productsMatching = products.filter((product) =>
      selectedFilters.every(
        (selectedFilter) => product.Category === selectedFilter
      )
    );

    dispatch(setProducts(productsMatching));
    dispatch(setCurrentPage(1));
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
