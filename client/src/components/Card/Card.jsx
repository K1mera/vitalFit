import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
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
    <section className={style.container}>
      <div className={style.front}>
        <div className={style.texto}>
          <Link to={`/detail/${id}`}>
            <img src={image} alt="IMG" className={style.Image} />
          </Link>
          <h3>{name.toUpperCase()}</h3>
          <p className="text-black text-lg">${price}</p>
          <button className={style.addButton} onClick={() => onAddItem(id)}>
            AGREGAR
          </button>
        </div>
      </div>
    </section>
  );
}
