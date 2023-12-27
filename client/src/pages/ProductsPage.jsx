import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from "react";
import { handlePages } from "../store";

import style from "../components/productsPage/ProductsPage.module.css";
import Card from "../components/Card/Card";
import {useForm} from "../hooks/useForm";
export default function ProductsPage() {


  const dispatch = useDispatch();
  const { products, currentPage, totalPages } = useSelector(
    (state) => state.product
  );
  const { name, onInputChange, onResetForm} = useForm({
    name: ''
  })

  const startIndex = (currentPage - 1) * 4;

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

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(onSearchBreed({ breed }));
  };
    
 

  return (
    <div className={style.Container}>
      <form className={style.controls}>
        <div className={style.search}>
          <input
            type="text"
            value={ name }
            name="name"
            placeholder="ingrese el nombre de un producto"
            className={style.searchInput}
            onChange={onInputChange}
          />
          <button className={style.searchButton} onClick={() => filterName()}>
            BUSCAR
          </button>
        </div>
        <div className={style.filter}>
          <h3 className={style.title}>FILTERS</h3>
          <hr className={style.line}></hr>

          <div className={style.Columna}>
            <div className={style.Input}>
              <div className={style.Checks}>
                {Types.map((type) => (
                  <label key={type} className={style.CheckboxLabel}>
                    <input
                      className={style.Check}
                      type="checkbox"
                      name="types"
                      value={type}
                      //   checked={filters.includes(type)}
                      onChange={handleFilterChange}
                    />
                    {type}
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
                <label className={style.CheckboxLabel}>
                  <input
                    className={style.Check}
                    type="checkbox"
                    value="menorPrimero"
                    checked={box1Check}
                    onChange={handleOrderChange}
                  />
                  Menor precio primero
                </label>
                <label className={style.CheckboxLabel}>
                  <input
                    className={style.Check}
                    type="checkbox"
                    value="mayorPrimero"
                    checked={box2Check}
                    onChange={handleOrderChange}
                  />
                  Mayor precio primero
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className={style.cardsContainer}>
        {   products
            .slice(startIndex, startIndex + 4)
            .map(({ name, price, image }) => {
              return (
                <Card key={name} name={name} price={price} image={image} />
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
