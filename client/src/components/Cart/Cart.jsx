import React from "react";
import CartItem from "./CartItem";
import getCartProducts from "../../firebase/getCartProducts";
import { useContext, useEffect } from "react";
import { userAuth } from "../../context/auth-context";
import { doc, onSnapshot } from "firebase/firestore";
import { firebaseDb } from "../../firebase/config";
import { CloseIcon } from "../../icons";

const Cart = ({}) => {
  const {
    currentUser,
    setProducts,
    products,
    productsLocalStorage,
    setShowCart,
    setShowOrder,
  } = useContext(userAuth);

  const gettingProducts = async () =>
    !currentUser ? [] : await getCartProducts(currentUser.uid);

  useEffect(() => {
    //trae los productos agregados al carrito del usuario loggeado, sino, es un array vacío
    gettingProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  useEffect(() => {
    //si no hay usuario loggeado, no hace nada
    if (!currentUser) {
      return;
    }

    //agrega un event listener(suscripción) al documento carrito para cuando haya cambios
    const cartDocRef = doc(firebaseDb, "carritos", currentUser.uid);
    const unsubscribe = onSnapshot(cartDocRef, (docSnapshot) => {
      const updatedData = docSnapshot.data();
      const updatedProducts = updatedData.productos || [];

      const updatedVisible =
        updatedProducts.length && updatedProducts.filter((p) => p.cantidad > 0);

      setProducts(updatedVisible);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  let cartItems = null;
  let totalAmount = null;

  if (currentUser) {
    //si hay un usuario loggeado, la info la toma de "products"
    cartItems = (
      <ul>
        {products.length &&
          products.map(({ price, name, image, cantidad, stock, id }) => {
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

    totalAmount = products.length
      ? products
          .reduce(
            (currentNumber, item) => currentNumber + item.price * item.cantidad,
            0
          )
          .toFixed(2)
      : 0;
  } else {
    //si no hay usuario loggeado, la info la toma de "productsLocalStorage"
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

    totalAmount = productsLocalStorage
      ? productsLocalStorage
          .reduce(
            (accumulation, item) => accumulation + item.price * item.cantidad,
            0
          )
          .toFixed(2)
      : 0;
  }

  const checkoutClick = () => {
    setShowCart(false);
    setShowOrder(true);
  };

  return (
    <div>
      <aside className="sideMenuLayout">
        <button onClick={() => setShowCart(false)} className="fixed right-6">
          <CloseIcon
            className={
              "mb-1 text-red-700/90 w-8 transition hover:scale-125 hover:text-red-600"
            }
          />
        </button>
        {products?.length ? (
          <article className="mb-10">{cartItems}</article>
        ) : productsLocalStorage?.length ? (
          <article className="mb-10">{cartItems}</article>
        ) : (
          <section className="m-auto font-bebas text-3xl">
            <span>Carrito vacío</span>
          </section>
        )}
        <section className="flex justify-between items-center bg-white fixed bottom-0 h-12 w-72">
          <div className="fixed right-7 bottom-2 font-bebas text-2xl">
            {totalAmount > 0 && (
              <button
                onClick={checkoutClick}
                className=" bg-primary p-1 px-3 rounded-2xl text-white">
                Comprar
              </button>
            )}
          </div>
          <div className="relative left-3 font-bebas text-2xl">
            <span>Total: </span>
            <span>$ {totalAmount}</span>
          </div>
        </section>
      </aside>
    </div>
  );
};

export default Cart;
