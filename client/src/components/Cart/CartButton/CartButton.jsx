import { ShoppingCartIcon } from "../../../icons";
import React, { useContext, useEffect, useState } from "react";
import { userAuth } from "../../../context/auth-context";
import { doc, onSnapshot } from "firebase/firestore";
import { firebaseDb } from "../../../firebase/config";

const CartButton = ({ setShowCart }) => {
  const {
    currentUser,
    productsLocalStorage,
    setProductsLocalStorage,
    products,
  } = useContext(userAuth);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    if (!currentUser) {
      const products = JSON.parse(window.localStorage.getItem("products"));
      setProductsLocalStorage(products);
      return;
    }

    const cartDocRef = doc(firebaseDb, "carritos", currentUser.uid);
    const unsuscribe = onSnapshot(cartDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const cartData = docSnapshot.data();
        const cartProducts = cartData.productos || [];

        const itemCount = cartProducts.reduce(
          (total, product) => total + product.cantidad,
          0
        );
        setCartItemCount(itemCount);
      } else {
        setCartItemCount(0);
      }
    });

    return () => unsuscribe();
  }, [currentUser]);

  const totalItems = productsLocalStorage
    ? productsLocalStorage.reduce(
        (total, product) => total + product.cantidad,
        0
      )
    : products
    ? products.reduce((total, product) => total + product.cantidad, 0)
    : 0;

  return (
    <div>
      <button
        onClick={() => {
          setShowCart(true);
        }}
        className="relative">
        <ShoppingCartIcon
          className={
            "w-10 transition fill-primaryDark hover:scale-125 hover:fill-primary"
          }
        />
        <span className="absolute flex justify-center items-center w-5 h-5 text-xs top-0 right-[-4px] font-montserrat text-white bg-primary/90 rounded-full">
          {cartItemCount || totalItems || 0}
        </span>
      </button>
    </div>
  );
};

export default CartButton;
