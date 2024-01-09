// import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { addItems } from "../../store/slices";
import { userAuth } from "../../context/auth-context";
import style from "./Card.module.css";
import { useContext } from "react";
import addProductToCart from "../../firebase/addProductToCart";
import increaseProduct from "../../firebase/increaseProduct";

export default function Card({ id, name, price, image, stock }) {
  const { currentUser, productsLocalStorage, setProductsLocalStorage } =
    useContext(userAuth);

//   const dispatch = useDispatch();

//   const onAddItem = (item) => {
//     dispatch(addItems(item));
//   };

  //addProducto NUEVO

  const addProduct = () => {
    if (stock > 0) {
      if (currentUser) {
        const existing = productsLocalStorage.find((p) => p.id == id);
        if (existing) {
          existing.cantidad += 1;
          setProductsLocalStorage([...productsLocalStorage]);
        } else {
          addProductToCart(currentUser.uid, {
            name: name,
            price: price,
            image: image[0],
            stock: stock,
            cantidad: 1,
            id: id,
          });
        }
        increaseProduct(currentUser.uid, id);
      } else {
        const existing = JSON.parse(localStorage.getItem("products")) || [];
        console.log(existing);
        const exists = existing.find((p) => p.id == id);
        if (exists) {
          if (exists.cantidad >= stock) {
            return;
          }
          exists.cantidad += 1;
          localStorage.setItem("products", JSON.stringify(existing));
          setProductsLocalStorage(existing);
        } else {
          existing.push({
            name: name,
            price: price,
            image: image,
            cantidad: 1,
            id: id,
            stock: stock,
          });

          localStorage.setItem("products", JSON.stringify(existing));
          setProductsLocalStorage(existing);
        }
      }
    }
  };

  return (
    <section className="flex flex-col justify-center items-center w-56 py-5 my-3 shadow-md rounded-xl transition hover:scale-110 bg-white">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-center font-bebas text-center gap-1">
          <Link to={`/detail/${id}`}>
            <img src={image} alt="IMG" className={style.Image} />
          </Link>
          <h3>{name}</h3>
          <p className="text-black text-lg">${price}</p>
          <div className="h-10">
            <button className="addButton" onClick={addProduct}>
              AGREGAR
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

