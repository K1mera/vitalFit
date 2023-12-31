import { useDispatch, useSelector } from "react-redux";
import { getProducts, handlePages } from "../store";
import Card from "../components/Card/Card";
import style from "../components/productsPage/ProductsPage.module.css";
import Filter from "../components/Filter/Filter";
import { useEffect } from "react";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { products, currentPage, totalPages, filters, sorts, shoppingCart } =
    useSelector((state) => state.product);

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
    <div className="flex h-full p-2 w-[ '97vw' ]">
      <Filter />

      <main className="flex flex-1 flex-col justify-center gap-5 h-full ">
        <section className={style.cardsContainer}>
          {products
            .slice(startIndex, startIndex + 8)
            .map(({ id, name, price, image, stock }) => {
              return (
                <Card
                  key={id}
                  id={id}
                  name={name}
                  price={price}
                  image={image}
                  stock={stock}
                />
              );
            })}
        </section>

        <section className="flex items-center justify-center gap-2 mr-5 mb-5">
          <button
            onClick={handlePreviousPage}
            className="font-bebas p-2 hover:text-primary">
            prev
          </button>
          <span className="font-bebas text-primary text-xl mb-1">
            {currentPage}
          </span>
          <button
            onClick={handleNextPage}
            className="font-bebas p-2 hover:text-primary">
            next
          </button>
        </section>
      </main>
    </div>
  );
}

// disabled={id === "" } onClick={() => search()}
