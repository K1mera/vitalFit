import React, { useEffect } from "react";
import style from "./CardInvent.module.css"; // Asegúrate de importar el archivo de estilos
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import borrar from "./delete.svg";
import { Link } from "react-router-dom";
import { DeleteIcon } from "../../../../icons";
import EditIcon from "../../../../icons/EditIcon";
import EyeSlashIcon from "../../../../icons/EyeSlashIcon";
import EyeIcon from "../../../../icons/EyeIcon";
import { getProducts } from "../../../../store";

export default function CardInvent({
  id,
  name,
  price,
  image,
  stock,
  active,
  handlerDelete,
  handlerBorradoLogico,
}) {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  /* useEffect(() => {
    const fetch = async () => {
      dispatch(getProducts());
    };
    fetch();
  }, [dispatch]); */
  return (
    <section
      className={
        active
          ? `flex gap-4 p-4 my-3 shadow-md rounded-xl transition hover:scale-[101%] font-montserrat text-sm  bg-white ${style.Card}`
          : `flex gap-4 p-4 my-3 shadow-md rounded-xl  font-montserrat text-sm bg-slate-400/50 ${style.Card}`
      }>
      <div className={style.ImageContainer}>
        <img src={image} alt="IMG" className="w-[50px]" />
      </div>
      <div className="flex gap-2 w-full justify-center items-center ">
        <h3 className="w-[50%]">{name}</h3>
        <p className="w-[10%]"> {stock}</p>
        <p className="w-[20%]">${price}</p>
        <button className="mr-2" onClick={() => handlerDelete(id)}>
          <DeleteIcon className={"w-[22px] hover:text-primary"} />
        </button>
        <button className="mr-2" onClick={() => handlerBorradoLogico(id)}>
          {active ? (
            <EyeSlashIcon className="w-6 hover:text-secondary" />
          ) : (
            <EyeIcon className="w-6 hover:text-teal-600" />
          )}
        </button>
        <Link to={`editproduct/${id}`}>
          {/* <button className="font-bold hover:text-cyan-500">Editar</button> */}
          <EditIcon className="w-6 hover:text-teal-600" />
        </Link>
      </div>
    </section>
  );
}
