import NavbarInvent from "./navBar/NavbarInvent";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, handlePages } from "../../../store";
import CardInvent from "./card/CardInvent";
import { borradoLogico, deleteProduct } from "../../../store";
import Swal from "sweetalert2";

export const Inventario = () => {
  const dispatch = useDispatch();
  const { products, currentPage, totalPages, filters, sorts } = useSelector(
    (state) => state.product
  );
  const [aux, setAux] = useState(true);
  const [newProducts, setNewProducts] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      dispatch(getProducts()).then((data) => setNewProducts(data));
    };
    fetchData();
    return () => fetchData();
  }, [dispatch, aux]);

  useEffect(() => {}, [products]);

  const handlerDelete = async (id) => {
    const response = await Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: true,
      showCancelButton: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    }).fire({
      icon: "question",
      title: `¿Seguro que quieres eliminar este producto?`,
    });
    console.log(response);

    if (response.isConfirmed === true) {
      setAux(!aux);
      dispatch(deleteProduct(id));
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: `Producto eliminado con éxito`,
      });
    }
  };

  const handlerBorradoLogico = async (id) => {
    const response = await Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: true,
      showCancelButton: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    }).fire({
      icon: "question",
      title: `¿Seguro que quieres modificar este producto?`,
    });
    console.log(response);

    if (response.isConfirmed === true) {
      setAux(!aux);
      dispatch(borradoLogico(id));
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: `Producto modificado con éxito`,
      });
    }
  };
  return (
    <main>
      <NavbarInvent />
      <section>
        {newProducts?.map(({ id, name, price, image, stock, active }) => {
          return (
            <CardInvent
              key={id}
              id={id}
              name={name}
              price={price}
              image={image}
              stock={stock}
              active={active}
              handlerDelete={handlerDelete}
              handlerBorradoLogico={handlerBorradoLogico}
            />
          );
        })}
      </section>
      {/*  <section className="flex items-center justify-center gap-2 mr-5 mb-5">
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
      </section> */}
    </main>
  );
};
