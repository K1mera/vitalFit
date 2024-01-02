import React from "react";
import CartItem from "./CartItem";
import getCartProducts from "../../firebase/getCartProducts";
import { useContext, useEffect } from "react";
import { userAuth } from "../../context/auth-context";
import { doc, onSnapshot } from "firebase/firestore";
import { firebaseDb } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { current } from "@reduxjs/toolkit";

const Cart = ({ setShowCart }) => {
  const { currentUser, setProducts, products, productsLocalStorage } =
    useContext(userAuth);
  const navigate = useNavigate();

  const gettingProducts = async () =>
    !currentUser ? [] : await getCartProducts(currentUser.uid);

  useEffect(() => {
    gettingProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const cartDocRef = doc(firebaseDb, "carrito", currentUser.uid);
    const unsubscribe = onSnapshot(cartDocRef, (docSnapshot) => {
      const updatedData = docSnapshot.data();
      const updatedProducts = updatedData.products || [];

      const updatedVisible = updatedProducts.filter((p) => p.cantidad > 0);

      setProducts(updatedVisible);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  let cartItems = null;
  let totalAmount = null;

  if (currentUser) {
    cartItems = (
      <ul>
        {products?.map(({ price, name, image, cantidad, stock, id }) => {
          return (
            <CartItem
              key={id}
              id={id}
              name={name}
              price={price}
              image={image}
              amount={cantidad}
              stock={stock}
            />
          );
        })}
      </ul>
    );

    totalAmount = products?.reduce((currentNumber, item) => {
      return currentNumber + Number(item.price) * item.cantidad;
    }, 0);
  } else {
    cartItems = (
      <ul>
        {productsLocalStorage?.map(
          ({ id, name, price, image, cantidad, stock }) => {
            return (
              <CartItem
                key={id}
                id={id}
                name={name}
                price={price}
                image={image}
                amount={cantidad}
                stock={stock}
              />
            );
          }
        )}
      </ul>
    );
    totalAmount = productsLocalStorage.length
      ? productsLocalStorage.reduce((currentNumber, item) => {
          return currentNumber + Number(item.price) * item.cantidad;
        })
      : 0;
  }

  const checkoutClick = () => {
    if (!currentUser) return;

    const totalProducts = [...new Set(products.map((p) => p.name))].map(
      (name) => name
    );

    const productsId = [...new Set(products.map((p) => p.id))].map((id) => id);

    const productStock = [...new Set(products.map((p) => p.stock))].map(
      (stock) => stock
    );
    navigate(
      `/rutapago/${totalAmount}/${totalProducts}/${productsId}/${productStock}`
    );
    setShowCart(false);
  };

  return (
    <div>
      {products?.length ? (
        <summary>
          {cartItems}
          <article>
            <div>
              <span>Total:</span>
              <span>${totalAmount}</span>
            </div>
            <section>
              <button onClick={() => setShowCart(false)}>X</button>
              {products?.length > 0 && (
                <button onClick={checkoutClick}>Order</button>
              )}
            </section>
          </article>
        </summary>
      ) : productsLocalStorage?.length ? (
        <summary>
          {cartItems}
          <article>
            <div>
              <span>Total:</span>
              <span>${totalAmount}</span>
            </div>
            <section>
              <button onClick={() => setShowCart(false)}>X</button>
              {productsLocalStorage?.length > 0 && (
                <button onClick={checkoutClick}>Order</button>
              )}
            </section>
          </article>
        </summary>
      ) : (
        <summary>
          <section>
            <span>Carrito vacío</span>
          </section>
          <section>
            <button onClick={() => setShowCart(false)}></button>
          </section>
        </summary>
      )}
    </div>
  );
};

export default Cart;
