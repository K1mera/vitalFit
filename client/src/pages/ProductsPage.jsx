import { useDispatch, useSelector } from "react-redux";
import { getProducts, handlePages } from "../store";
import Card from "../components/Card/Card";
import style from "../components/productsPage/ProductsPage.module.css";
import Filter from "../components/Filter/Filter";
import { useEffect } from "react";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { products, currentPage, totalPages, filters, sorts } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, filters, sorts]);

  const startIndex = (currentPage - 1) * 8;

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

  return (
    <div className={style.Container}>
      <Filter />

      <div className={style.cardsContainer}>
        {products
          .slice(startIndex, startIndex + 8)
          .map(({ id, name, price, image }) => {
            return (
              <Card key={id} id={id} name={name} price={price} image={image} />
            );
          })}
        <div>
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
    </div>
  );
}

// disabled={id === "" } onClick={() => search()}
