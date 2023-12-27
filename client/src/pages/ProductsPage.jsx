import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from "react";
import { filteringProducts, handlePages, onSearchProduct } from "../store";
import { useForm } from "../hooks/useForm";
import Card from "../components/Card/Card";

import style from "../components/productsPage/ProductsPage.module.css";
export default function ProductsPage() {
  const dispatch = useDispatch();
  const { products, categories, currentPage, totalPages } = useSelector(
    (state) => state.product
  );
  const { name, filters, onInputChange, onResetForm } = useForm({
    name: "",
    filters: [],
  });

  // console.log({name});

  const startIndex = (currentPage - 1) * 8;

  // console.log(products);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(handlePages(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(handlePages(currentPage + 1));
    }
  };

  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    if (selectedFilters.length === 0) {
      dispatch(onSearchProduct(name));
    } else {
      dispatch(filteringProducts(selectedFilters, products));
    }
  }, [selectedFilters, dispatch]);

  const handleFilterCheckboxChange = (filterName) => {
    // console.log(filterName);
    if (selectedFilters.includes(filterName)) {
      setSelectedFilters(
        selectedFilters.filter((filter) => filter !== filterName)
      );
    } else {
      setSelectedFilters([filterName, ...selectedFilters]);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(onSearchProduct(name));
  };

  // console.log(categories);

  return (
    <div className={style.Container}>
      <form onSubmit={onSubmit} className={style.controls}>
        <div className="h-40 flex flex-col gap-5 items-center w-full bg-primaryLight rounded-xl p-5">
          <input
            type="text"
            value={name}
            name="name"
            placeholder="ingrese el nombre de un producto"
            className="inputBar"
            onChange={onInputChange}
          />
          <button type="submit" className="addButton">
            BUSCAR
          </button>
        </div>
        <div className={style.filter}>
          <h3 className={style.title}>FILTERS</h3>
          <hr className={style.line}></hr>

          <div className={style.Columna}>
            <div className={style.Input}>
              <div className={style.Checks}>
                {categories.map((category) => (
                  <label key={category.id} className="inline-flex items-center">
                    <input
                      className="inputFilters"
                      name={category.name}
                      type="checkbox"
                      // checked={filters.includes(category.name)}
                      onChange={() => handleFilterCheckboxChange(category.name)}
                    />
                    <span className="ml-2 pt-[2px] font-bebas text-black">
                      {category.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={style.filter}>
          <h3 className={style.title}>ORDER</h3>
          <hr className={style.line}></hr>

          <div className={style.Columna}>
            <div className={style.Input}>
              <div className={style.Checks}>
                {/* <label className={style.CheckboxLabel}>
                  <input
                    className={style.Check}
                    type="checkbox"
                    value="menorPrimero"
                    // checked={box1Check}
                    onChange={}
                  />
                  Menor precio primero
                </label>
                <label className={style.CheckboxLabel}>
                  <input
                    className={style.Check}
                    type="checkbox"
                    value="mayorPrimero"
                    // checked={box2Check}
                    onChange={handleOrderChange}
                  />
                  Mayor precio primero
                </label> */}
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className={style.cardsContainer}>
        {products
          .slice(startIndex, startIndex + 8)
          .map(({ id, name, price, image }) => {
            return (
              <Card key={id} id={id} name={name} price={price} image={image} />
            );
          })}
        <section className="flex justify-between gap-2 absolute bottom-2">
          <button onClick={handlePreviousPage} className="font-bebas p-2">
            prev
          </button>
          <button onClick={handleNextPage} className="font-bebas p-2">
            next
          </button>
        </section>
      </div>
    </div>
  );
}

// disabled={id === "" } onClick={() => search()}
