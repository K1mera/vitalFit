import CartIcon from "./CartIcon";
import React, { useContext, useEffect, useState } from "react";
import { userAuth } from "../../../context/auth-context";
import { doc, onSnapshot } from "firebase/firestore";
import { firebaseDb } from "../../../firebase/config";

const CartButton = ({ setShowCart }) => {
  const { currentUser, productsLocalStorage, setProductsLocalStorage } =
    useContext(userAuth);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    if (currentUser) {
      const cartDocRef = doc(firebaseDb, "carrito", currentUser.uid);
      const unsuscribe = onSnapshot(cartDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const cartData = docSnapshot.data();
          const cartProducts = cartData.products || [];

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
    }
  }, [currentUser]);

  const totalItems = productsLocalStorage.length
    ? productsLocalStorage.reduce((total, product) => total + product.cantidad)
    : 0;
  return (
    <div>
      <button
        onClick={() => {
          setShowCart(true);
        }}>
        <span>
          <CartIcon />
        </span>
        <span>{cartItemCount || totalItems || 0}</span>
      </button>
    </div>
  );
};

export default CartButton;
