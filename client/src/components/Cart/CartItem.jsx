import React from "react";
import { useContext, useState, useEffect } from "react";
import increaseProduct from "../../firebase/increaseProduct";
import decreaseProduct from "../../firebase/decreaseProduct";
import { userAuth } from "../../context/auth-context";
import { doc, onSnapshot } from "firebase/firestore";
import { firebaseDb } from "../../firebase/config";
import { getProductById } from "../../store";
import { useDispatch } from "react-redux";

const CartItem = ({ name, price, image, id, amount }) => {
  const { currentUser, setProductsLocalStorage } = useContext(userAuth);
  const [amounts, setAmount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) {
      const productsFromCart = JSON.parse(
        window.localStorage.getItem("products") || []
      );
      const productInCart = productsFromCart.find((p) => p.id === id);
      productInCart ? setAmount(productInCart.cantidad || 0) : setAmount(0);
      return;
    }

    const cartDocRef = doc(firebaseDb, "carritos", currentUser?.uid);

    const unsubscribe = onSnapshot(cartDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const products = data.products || [];

        const productInCart = products.find((p) => p.id === id);
        productInCart ? setAmount(productInCart.cantidad || 0) : setAmount(0);
      } else {
        setAmount(0);
      }
    });

    return () => unsubscribe();
  }, [currentUser?.uid, id, amount]);

  //Si no hay usuario loggueado guarda los productos del carrito en el local storage
  //función para incrementar cantidad de productos en local storage
  const increaseAmountInLocalStorage = async (productID) => {
    const response = dispatch(getProductById(id));
    const stock = response.stock;
    if (amount >= stock) return;
    const productsFromCart =
      JSON.parse(window.localStorage.getItem("products")) || [];

    const productToUpdate = productsFromCart.find((p) => p.id === productID);

    if (productToUpdate) {
      productToUpdate.cantidad = (productToUpdate.cantidad || 0) + 1;
      setAmount(productToUpdate.cantidad);
    }

    window.localStorage.setItem("products", JSON.stringify(productsFromCart));
    setProductsLocalStorage(productsFromCart);
  };

  //función para disminuir cantidad de productos en carrito local storage
  const decreaseAmountInLocalStorage = (productID) => {
    const productsFromCart =
      JSON.parse(window.localStorage.getItem("products")) || [];

    const index = productsFromCart.findIndex((p) => p.id === productID);

    if (index !== -1) {
      productsFromCart[index].cantidad =
        (productsFromCart[index].cantidad || 0) - 1;

      if (productsFromCart[index].cantidad <= 0) {
        productsFromCart.splice(index, 1);
      }

      window.localStorage.setItem("products", JSON.stringify(productsFromCart));

      setAmount(productsFromCart[index]?.cantidad || 0);
      setProductsLocalStorage(productsFromCart);
    }
  };

  const increaseAmount = () => {
    const response = dispatch(getProductById(id));
    const stock = response.stock;
    if (amount >= stock) return;
    increaseProduct(currentUser?.uid, id);
  };
  return (
    <div>
      <li className="flex border-b-slate-600 mb-2">
        <div className="flex">
          <figure>
            <img src={image} alt="foto de producto" width={130} />
          </figure>
          <div>
            <div className="font-bebas">
              <h2 className="text-2xl mt-3">{name}</h2>
              <span className="text-lg">Precio: ${price}</span>
            </div>
            <div>
              <span className="font-bebas mr-6"> Cant: {amount}</span>
              {currentUser ? (
                <button
                  onClick={() => decreaseProduct(currentUser?.uid, id)}
                  className="mr-3 text-3xl text-primary font-bold">
                  -
                </button>
              ) : (
                <button
                  className="mr-3 text-3xl text-primary font-bold"
                  onClick={() => decreaseAmountInLocalStorage(id)}>
                  -
                </button>
              )}
              {currentUser ? (
                <button onClick={increaseAmount} className="mr-3">
                  +
                </button>
              ) : (
                <button
                  className="mr-3 text-2xl text-teal-600 font-bold"
                  onClick={() => increaseAmountInLocalStorage(id)}>
                  +
                </button>
              )}
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

export default CartItem;
