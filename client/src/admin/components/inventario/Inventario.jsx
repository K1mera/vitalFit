import NavbarInvent from "./navBar/NavbarInvent";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, handlePages } from "../../../store";
import CardInvent from "./card/CardInvent";

export const Inventario = () => {
  const dispatch = useDispatch();
  const { products, currentPage, totalPages, filters, sorts } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getProducts());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {}, [products]);

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

  return (
    <main className="h-full">
      <NavbarInvent />
      <section className="h-auto">
        {products
          .slice(startIndex, startIndex + 4)
          .map(({ id, name, price, image, stock }) => {
            return (
              <CardInvent
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
          disabled={currentPage <= 1}
          className="font-bebas p-2 hover:text-primary disabled:opacity-25 disabled:hover:text-black"
        >
          prev
        </button>
        <span className="font-bebas text-primary text-xl mb-1">
          {currentPage}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="font-bebas p-2 hover:text-primary disabled:opacity-25 disabled:hover:text-black"
        >
          next
        </button>
      </section>
    </main>
  );
};
