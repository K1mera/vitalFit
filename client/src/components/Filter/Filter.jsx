import React, { useState } from "react";
import { setCurrentPage } from "../../store/slices/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanFilters,
  cleanSearch,
  cleanSorts,
  productsFilters,
  productsSorts,
  searchProduct,
} from "../../store/slices";

const Filter = () => {
  const dispatch = useDispatch();
  const { filters, categories, products } = useSelector(
    (state) => state.product
  );

  const [prices, setPrices] = useState({
    minPrice: "",
    maxPrice: "",
  });

  const [searchInput, setSearchInput] = useState("");

  //CATEGORIES
  const handleFilterCategories = (e) => {
    dispatch(productsFilters({ ...filters, category: e.target.value }));
    dispatch(setCurrentPage(1));
    if (!products.length)
      alert("No hay productos coincidentes con la búsqueda");
  };

  //PRICES
  const handleFilterPrice = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPrices({ ...prices, [name]: value });
  };

  const handleSearchPrices = (e) => {
    dispatch(cleanFilters());
    dispatch(cleanSorts());
    dispatch(
      productsFilters({
        ...filters,
        minPrice: prices.minPrice,
        maxPrice: prices.maxPrice,
      })
    );
    dispatch(setCurrentPage(1));
    if (!products.length)
      alert("No hay productos coincidentes con la búsqueda");
  };

  //SEARCH
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    const orders = document.getElementById("orders");
    const categories = document.getElementById("categories");
    orders.selectedIndex = 0;
    categories.selectedIndex = 0;
    setPrices({
      minPrice: "",
      maxPrice: "",
    });
    dispatch(cleanFilters());
    dispatch(cleanSorts());
    dispatch(searchProduct(searchInput));
    dispatch(setCurrentPage(1));
    if (!products.length)
      alert("No hay productos coincidentes con la búsqueda");
  };

  //SORTS
  const handleOrder = (e) => {
    const value = e.target.value;
    let filtro = {};
    if (value.includes("price")) {
      filtro =
        value === "priceA"
          ? { sortByPrice: "ASC", sortByName: "" }
          : { sortByPrice: "DESC", sortByName: "" };
    } else {
      filtro =
        value === "nameA"
          ? { sortByName: "ASC", sortByPrice: "" }
          : { sortByName: "DESC", sortByPrice: "" };
    }
    dispatch(productsSorts(filtro));
    dispatch(setCurrentPage(1));
  };

  //RESET
  const reset = () => {
    const orders = document.getElementById("orders");
    const categories = document.getElementById("categories");
    orders.selectedIndex = 0;
    categories.selectedIndex = 0;
    setSearchInput("");
    setPrices({
      minPrice: "",
      maxPrice: "",
    });
    dispatch(cleanFilters());
    dispatch(cleanSearch());
    dispatch(cleanSorts());
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="mt-2 font-bebas">
      <div className="h-40 flex flex-col items-center w-full bg-primaryLight rounded-xl p-5">
        <h3 className="text-2xl mb-2">Buscar por nombre</h3>
        <input
          className="mb-2 rounded border-none w-80 placeholder:text-center"
          type="search"
          placeholder="Ingrese el nombre de un producto"
          value={searchInput}
          onChange={handleSearchInput}
        />
        <button
          onClick={handleSearch}
          className=" bg-teal-400 text-xl text-white w-32 p-1 rounded-xl mx-auto mt-2">
          Buscar
        </button>
      </div>
      <div className="mt-4 flex flex-col justify-start w-full bg-primaryLight rounded-xl p-5">
        <div className="flex justify-baseline items-center">
          <h3 className="text-xl">Categorías</h3>
          <select
            id="categories"
            onChange={handleFilterCategories}
            className=" appearance-none focus:ring-0 border-none rounded-xl w-44 ml-10 focus:outline-none  hover:bg-slate-100 cursor-pointer">
            <option
              value=""
              className="appearance-none hover:bg-teal-500 focus:bg-teal-500">
              Todas las categorías
            </option>
            {categories.map((category, i) => (
              <option key={i} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <h3 className="text-xl  my-2">Rango de Precios</h3>
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Min"
            name="minPrice"
            value={prices.minPrice}
            onChange={handleFilterPrice}
            className="w-24 border-none mx-2 rounded-xl focus:ring-0"
          />
          <span> - </span>
          <input
            type="text"
            placeholder="Max"
            name="maxPrice"
            value={prices.maxPrice}
            onChange={handleFilterPrice}
            className="w-24 border-none mx-2 rounded-xl focus:ring-0"
          />
          <button onClick={handleSearchPrices}>Ir</button>
        </div>

        <div className="flex justify-baseline items-center mt-3">
          <h3 className="text-xl">Ordenar por</h3>
          <select
            id="orders"
            onChange={handleOrder}
            className=" appearance-none border-none rounded-xl w-44 ml-7 focus:ring-0 cursor-pointer hover:bg-slate-100">
            <option value="">Más relevantes</option>
            <option value={"priceD"}>Mayor precio</option>
            <option value={"priceA"}>Menor precio</option>
            <option value={"nameA"}>A - Z</option>
            <option value={"nameD"}>Z - A</option>
          </select>
        </div>
        {/*  <div className="mt-2">
          <label className="text-xl">
            <input
              type="checkbox"
              className="appearance-none focus:ring-0 mr-2 border-slate-450 checked:bg-teal-500 focus:decoration-transparent cursor-pointer"
            />
            Ofertas
          </label>
        </div> */}
        <button
          onClick={reset}
          className="bg-teal-500 text-white text-xl w-32 p-1 rounded-xl mx-auto mt-3">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filter;
