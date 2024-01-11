import React from "react";
import style from "./CardInvent.module.css"; // Asegúrate de importar el archivo de estilos
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../../store";

export default function CardInvent({ id, name, price, image, stock }) {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handlerDelete = (id) => {
    console.log(id);
    dispatch(deleteProduct(id));
  };

  return (
    <section
      className={`flex gap-4 p-4 my-3 shadow-md rounded-xl transition hover:scale-110 bg-white ${style.Card}`}
    >
      <div className={style.ImageContainer}>
        <img src={image} alt="IMG" className={style.Image} />
      </div>
      <div className="flex flex-col justify-center items-start">
        <h3 className="font-bebas text-lg">{name}</h3>
        <p className="text-black">${price}</p>
        <p className="text-black">Stock: {stock}</p>
        <button onClick={() => handlerDelete(id)}>delete</button>
        <button></button>
      </div>
    </section>
  );
}
