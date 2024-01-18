import React from "react";
import style from "./CardInvent.module.css"; // Asegúrate de importar el archivo de estilos
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../../store";
// import borrar from "./delete.svg";
import { Link } from "react-router-dom";
import { DeleteIcon } from "../../../../icons";

export default function CardInvent({ id, name, price, image, stock }) {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handlerDelete = (id) => {
    console.log(id);
    dispatch(deleteProduct(id));
  };

  return (
    <section
      className={`flex gap-4 p-4 my-3 shadow-md rounded-xl transition hover:scale-[101%] bg-white ${style.Card}`}
    >
      <div className={style.ImageContainer}>
        <img src={image} alt="IMG" className="w-[50px]" />
      </div>
      <div className="flex gap-2 w-full justify-center items-center ">
        <h3 className="w-[50%]">{name}</h3>
        <p className="w-[10%]"> {stock}</p>
        <p className="w-[20%]">${price}</p>
        <button className="w-[10%]" onClick={() => handlerDelete(id)}>
          <DeleteIcon className={"w-[22px] hover:fill-red-600"} />
        </button>
        <Link to={`editproduct/${id}`}>
          <button className="font-bold hover:text-cyan-500">Editar</button>
        </Link>
      </div>
    </section>
  );
}
