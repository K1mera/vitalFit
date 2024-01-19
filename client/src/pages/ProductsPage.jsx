import { useDispatch, useSelector } from "react-redux";
import { getProducts, handlePages } from "../store";
import Card from "../components/Card/Card";
import style from "../components/productsPage/ProductsPage.module.css";
import Filter from "../components/Filter/Filter";
import { useEffect } from "react";
import { Loading } from "../components";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { products, currentPage, totalPages, filters, sorts, loading } =
    useSelector((state) => state.product);

  const filtered = products.filter((e) => e.active === true);
  useEffect(() => {
    dispatch(getProducts());
    window.scrollTo(0, 0);
  }, [dispatch, filters, sorts]);

  const startIndex = (currentPage - 1) * 8;

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(handlePages(currentPage - 1));
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(handlePages(currentPage + 1));
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="flex h-full p-2 w-[ '98vw' ]">
      <Filter />

      <main className="flex flex-1 flex-col justify-center h-full ">
        {loading ? (
          <Loading />
        ) : (
          <section className={style.cardsContainer}>
            {filtered.length ? (
              filtered
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
                })
            ) : (
              <p className="text-2xl mt-[10%]">
                Ups! No hay productos que coincidan con tu búsqueda.
              </p>
            )}
          </section>
        )}

        {filtered.length > 0 && (
          <section className="flex items-center justify-center gap-2 mr-5 mb-5">
            <button
              onClick={handlePreviousPage}
              className="font-bebas p-2 hover:text-primary">
              prev
            </button>
            <span className="font-bebas text-primary text-xl mb-1">
              {currentPage}{" "}
              <span className=" text-gray-800">/ {totalPages}</span>
            </span>
            <button
              onClick={handleNextPage}
              className="font-bebas p-2 hover:text-primary">
              next
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

// disabled={id === "" } onClick={() => search()}
