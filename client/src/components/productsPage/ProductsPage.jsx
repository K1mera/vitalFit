import { useDispatch, useSelector } from "react-redux";

import Card from "../Card/Card";
import style from "./ProductsPage.module.css";
import { useState, useEffect } from "react";

export default function ProductsPage({ items, allItems, filter }) {
  const { products, currentPage, totalPages } = useSelector(
    (state) => state.product
  );

  const [filters, setFilters] = useState([]);
  const [Types, setTypes] = useState([]);

  const startIndex = (currentPage - 1) * 4;

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
  useEffect(() => {
    if (allItems.length > 0) {
      const uniqueTypes = [...new Set(allItems.map((item) => item.type))];
      setTypes(uniqueTypes);
      setFilters(uniqueTypes);
      uniqueTypes.push("OFERTA");
      console.log(uniqueTypes);
      if (allItems.some((item) => item.offer)) {
        setTypes(uniqueTypes);
        setFilters(uniqueTypes);
      }
    }
  }, [allItems]);

  const handleFilterChange = (event) => {
    const updatedFilter = event.target.checked
      ? [...filters, event.target.value]
      : filters.filter((f) => f !== event.target.value);
    setFilters(updatedFilter);
    filter(updatedFilter);
    console.log(updatedFilter);
  };

  return (
    <div className={style.Container}>
      <div className={style.controls}>
        <div className={style.search}>
          <input type="search" className={style.searchInput} />
          <button className={style.searchButton}>BUSCAR</button>
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
                      checked={filters.includes(type)}
                      onChange={handleFilterChange}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={style.cardsContainer}>
        {Array.isArray(items) &&
          items
            .slice(startIndex, startIndex + 4)
            .map(({ name, price, image }) => {
              return (
                <Card key={name} name={name} price={price} image={image} />
              );
            })}
      </div>
      
    </div>
  );
}

// disabled={id === "" } onClick={() => search()}
