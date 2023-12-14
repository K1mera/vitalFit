import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { addItems } from "../../store/slices";

import style from "./Card.module.css";

export default function Card({ id, name, price, image }) {
  const handleAdd = () => {
    console.log(`Producto ${name} agregado al carrito.`);
  };

  const dispatch = useDispatch()

  const onAddItem = (item) => {
    dispatch(addItems(item));
  };

  return (
    <div className={style.container}>
      <div className={style.front}>
        <div className={style.texto}>
          <NavLink to={"/detail"}>
            <img src={image} alt="IMG" className={style.Image} />
          </NavLink>
          <h3>{name.toUpperCase()}</h3>
          <p>{price}</p>
          <button className={style.addButton} onClick={() => onAddItem(id)}>
            AGREGAR
          </button>
        </div>
      </div>
    </div>
  );
}
