import React from "react";
import style from "./CardInvent.module.css"; // Asegúrate de importar el archivo de estilos
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../../store";
// import borrar from "./delete.svg";
import { Link } from "react-router-dom";
import { DeleteIcon } from "../../../../icons";

export default function CardInvent({ id, name, price, image, stock }) {
  const { products, loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handlerDelete = (id) => {
    console.log(id);
    dispatch(deleteProduct(id));
  };

  return (
    <section
      className={`flex relative overflow-hidden h-[4.5rem] gap-4 p-4 my-3 shadow-md rounded-xl transition hover:scale-[101%] bg-white ${style.Card}`}
    >
      {loading ? (
        <div className="bg-stone-500/70 absolute w-full h-full top-0 right-0 flex justify-center items-center">
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-tertiary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        ""
      )}
      <div className="h-[80%] w-[50px] ">
        <img src={image} alt="IMG" className="object-cover " />
      </div>
      <div className="flex gap-2 w-full justify-center items-center ">
        <h3 className="w-[50%]">{name}</h3>
        <p className="w-[10%]"> {stock}</p>
        <p className="w-[20%]">${price}</p>
        <button
          disabled={loading}
          className="w-[10%]"
          onClick={() => handlerDelete(id)}
        >
          <DeleteIcon
            className={"w-[22px] hover:fill-red-600 disabled:opacity-60 disabled:hover:text-black"}
          />
        </button>
        <Link to={`editproduct/${id}`}>
          <button
            disabled={loading}
            className="font-bold hover:text-cyan-500 disabled:opacity-60 disabled:hover:text-black"
          >
            Editar
          </button>
        </Link>
      </div>
    </section>
  );
}
