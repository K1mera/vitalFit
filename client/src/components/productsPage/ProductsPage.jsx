import { useDispatch, useSelector } from "react-redux";

import Card from "../Card/Card";
import style from "./ProductsPage.module.css";
import { useState, useEffect } from "react";
import { handlePages } from "../../store/slices";

export default function ProductsPage({ items, allItems }) {
  const { products, currentPage, totalPages } = useSelector(
    (state) => state.product
  );
  
  const [filters, setFilters] = useState([]);
  const [Types, setTypes] = useState([]);
  const [nameToSearch, setNameToSearch] = useState("");
  const [productsToShow, setProductsToShow] = useState(allItems);
  const[box1Check, setBox1Check] = useState(true)
  const[box2Check, setBox2Check] = useState(false)

  const dispatch = useDispatch()

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
  useEffect(() => {
    if (allItems.length > 0) {
      const uniqueTypes = [...new Set(allItems.map((item) => item.category))];
      setTypes(uniqueTypes);
      //   setFilters(uniqueTypes);
      uniqueTypes.push("OFERTA");
      if (allItems.some((item) => item.offer)) {
        setTypes(uniqueTypes);
        //     setFilters(uniqueTypes);
      }
    }
  }, [allItems]);

  const handleFilterChange = (event) => {
    const updatedFilter = event.target.checked
      ? [...filters, event.target.value]
      : filters.filter((f) => f !== event.target.value);
    setFilters(updatedFilter);
    filter(updatedFilter);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setNameToSearch(e.target.value);
    
  };

  const filterName = () => {
    items = allItems.filter((i) => i.name.includes(nameToSearch.toUpperCase()));
    setProductsToShow(items);
    setNameToSearch("");
  };

  const filter = (filtered) => {
      const productsFilter = filtered.length === 0
        ? allItems
        : allItems.filter(
            (item) =>
              filtered.includes(item.category) ||
              (item.offer === true && filtered.includes("OFERTA"))
          )
    ; if (box2Check) {
       return setProductsToShow(productsFilter.sort((a,b) => b.price - a.price))
    } else {
        return setProductsToShow(productsFilter.sort((a,b) => a.price - b.price))
    }
  };

  const handleOrderChange = (e) => {
    if(e.target.checked && e.target.value === "mayorPrimero") {
        setProductsToShow(productsToShow.sort((a,b) => b.price - a.price))
        setBox1Check(!box1Check)
        setBox2Check(!box2Check)
    } else if (e.target.checked && e.target.value === "menorPrimero") {
        setProductsToShow(productsToShow.sort((a,b) => a.price - b.price))
        setBox1Check(!box1Check)
        setBox2Check(!box2Check)
    }
  }

 


  return (
    <div className={style.Container}>
      <div className={style.controls}>
        <div className={style.search}>
          <input
            type="text"
            value={nameToSearch}
            placeholder="ingrese el nombre de un producto"
            className={style.searchInput}
            onChange={handleChange}
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
      </div>

      <div className={style.cardsContainer}>
        {Array.isArray(productsToShow) &&
          productsToShow
            .slice(startIndex, startIndex + 4)
            .map(({ name, price, image }) => {
              return (
                <Card key={name} name={name} price={price} image={image} />
              );
            })}
        <section className="flex justify-between gap-2 absolute bottom-2">
          <button onClick={ handlePreviousPage } className="font-bebas p-2">prev</button>
          <button onClick={ handleNextPage } className="font-bebas p-2">next</button>
        </section>
      </div>
    </div>
  );
}

// disabled={id === "" } onClick={() => search()}
