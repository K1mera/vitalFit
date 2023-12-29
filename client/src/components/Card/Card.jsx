import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItems } from "../../store/slices";

import style from "./Card.module.css";

export default function Card({ id, name, price, image }) {

  const dispatch = useDispatch()

  const onAddItem = (item) => {
    dispatch(addItems(item));
  };

  return (
    <section className='flex flex-col justify-center items-center w-56 py-5 my-3 shadow-md rounded-xl transition hover:scale-110 '>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-col items-center font-bebas text-center gap-1'>
          <Link to={`/detail/${id}`}>
            <img src={image} alt="IMG" className={style.Image} />
          </Link>
          <h3>{name.toUpperCase()}</h3>
          <p className="text-black text-lg">${price}</p>
          <div className="h-10">
            <button className='addButton' onClick={() => onAddItem(id)}>
              AGREGAR
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
