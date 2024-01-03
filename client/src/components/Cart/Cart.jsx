import React from "react";
import CartItem from "./CartItem";
import getCartProducts from "../../firebase/getCartProducts";
import { useContext, useEffect } from "react";
import { userAuth } from "../../context/auth-context";
import { doc, onSnapshot } from "firebase/firestore";
import { firebaseDb } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { CloseIcon } from "../../icons";

const Cart = ({ setShowCart }) => {
  const {
    currentUser,
    setProducts,
    products,
    productsLocalStorage,
    setProductsLocalStorage,
  } = useContext(userAuth);
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

    totalAmount = products.length
      ? products.reduce(
          (currentNumber, item) => currentNumber + item.price * item.cantidad,
          0
        )
      : 0;
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
      ? productsLocalStorage.reduce(
          (accumulation, item) => accumulation + item.price * item.cantidad,
          0
        )
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
      <aside className="sideMenuLayout">
        <button onClick={() => setShowCart(false)} className="fixed right-6">
          <CloseIcon
            className={
              "mb-1 text-red-700/90 w-8 transition hover:scale-125 hover:text-red-600"
            }
          />
        </button>
        {products?.length ? (
          <article className="flex justify-between items-center">
            {cartItems}
          </article>
        ) : productsLocalStorage?.length ? (
          <article>{cartItems}</article>
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
                className=" bg-primary p-1 px-3 rounded-2xl">
                Pagar
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
