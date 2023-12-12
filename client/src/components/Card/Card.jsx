import style from "./Card.module.css";
import { NavLink } from "react-router-dom";

export default function Card({ name, price, image }) {
  const handleAdd = () => {
    console.log(`Producto ${name} agregado al carrito.`);
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
          <button className={style.addButton} onClick={handleAdd}>
            AGREGAR
          </button>
        </div>
      </div>
    </div>
  );
}
