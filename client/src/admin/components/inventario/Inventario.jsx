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
    <main>
      <NavbarInvent />
      <section>
        {products
          .slice(startIndex, startIndex + 5)
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
          className="font-bebas p-2 hover:text-primary"
        >
          prev
        </button>
        <span className="font-bebas text-primary text-xl mb-1">
          {currentPage}
        </span>
        <button
          onClick={handleNextPage}
          className="font-bebas p-2 hover:text-primary"
        >
          next
        </button>
      </section>
    </main>
  );
};
