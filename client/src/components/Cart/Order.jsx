import React, { useContext, useState } from "react";
import { userAuth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../icons/BackIcon";
import MercadoPago from "../MercadoPago/MercadoPago";

const Order = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    user,
    products,
    productsLocalStorage,
    setTotalPay,
    totalPay,
    setShowOrder,
    setShowCart,
  } = useContext(userAuth);
  const [itemsToPay, setItemsToPay] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const envio = 4500;
  let cartItems;
  let totalAmount;
  let envioGratis = false;

  if (products.length) {
    cartItems = (
      <ul>
        {products?.map(({ name, price, cantidad }) => {
          return (
            <div className="font-bebas text-2xl mb-3">
              <p className="text-primary">
                {name}{" "}
                <span className="text-black ml-5 font-montserrat font-medium text-xl">
                  {" "}
                  x{cantidad}
                </span>
              </p>
              <p>
                total:{" "}
                <span className="text-teal-600"> ${price * cantidad}.00</span>
              </p>
            </div>
          );
        })}
      </ul>
    );
    totalAmount = products
      ?.reduce((current, p) => current + p.price * p.cantidad, 0)
      .toFixed(2);
  } else {
    cartItems = (
      <ul>
        {productsLocalStorage?.map(({ name, price, cantidad }) => {
          return (
            <div className="font-bebas text-2xl mb-3">
              <p className="text-primary">
                {name}{" "}
                <span className="text-black ml-5 font-montserrat font-medium text-xl">
                  {" "}
                  x{cantidad}
                </span>
              </p>
              <p>
                total:{" "}
                <span className="text-teal-600"> ${price * cantidad}.00</span>
              </p>
            </div>
          );
        })}
      </ul>
    );
    totalAmount = productsLocalStorage
      ?.reduce((current, p) => current + p.price * p.cantidad, 0)
      .toFixed(2);
  }
  if (totalAmount > 50000) {
    envioGratis = true;
  }

  const discount = (totalAmount - (totalAmount * 10) / 100).toFixed(2);
  const toDiscount = (totalAmount - discount).toFixed(2);
  const conEnvio = (Number(totalAmount) + envio).toFixed(2);

  if (totalAmount < 50000) {
    setTotalPay(conEnvio);
  } else if (totalAmount > 150000) {
    setTotalPay(discount);
  } else {
    setTotalPay(totalAmount);
  }

  let arrayItems =
    products &&
    products.map(({ id, name, price, cantidad, image }) => {
      return {
        id: id,
        title: name,
        unit_price: Math.round(price),
        quantity: cantidad,
        picture_url: image,
      };
    });

  const handlePay = async () => {
    if (!currentUser) navigate("/loginUser");

    if (user.dataCompleted) {
      setItemsToPay(arrayItems);
      setDisabled(true);

      return;
    }
    navigate("/preCheckout");
  };

  const handleBack = () => {
    setShowOrder(false);
    setShowCart(true);
  };
  return (
    <div>
      <aside className="sideMenuLayout">
        <section>
          <button onClick={handleBack}>
            <BackIcon
              className={
                "mb-1 text-teal-700/90 w-7 transition hover:scale-125 hover:text-teal-600"
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
        </section>
        <div className="mb-10">
          <p className="flex justify-between  font-medium mb-2">
            Envío{" "}
            {envioGratis ? (
              <span className="text-green-500">Gratis</span>
            ) : (
              <span className="text-primary">{envio}</span>
            )}
          </p>
          {totalAmount > 150000 ? (
            <p className="flex justify-between  font-medium mb-5">
              Descuento 10%{" "}
              <span className="text-green-500">-{toDiscount}</span>
            </p>
          ) : null}
        </div>
        {currentUser && user.calle && user.altura && (
          <div>
            <span>{`La dirección de envío registrada es ${user.calle} ${user.altura}`}</span>
            <a href="/preCheckout">
              <p> Cambiar la dirección</p>
            </a>
          </div>
        )}

        <section className="flex justify-between items-center bg-white fixed bottom-0 h-14 w-72">
          <div className="font-bebas text-2xl mb-2">
            {!disabled && (
              <div>
                <p className="text-base mt-2 w-96 bg-white">
                  Sub-total: {totalAmount}
                </p>

                <span>Total: </span>

                <span>$ {totalPay}</span>
              </div>
            )}
          </div>
          <div className="fixed right-7 bottom-2 font-bebas text-2xl">
            {totalAmount > 0 && !disabled && (
              <button
                onClick={handlePay}
                className=" bg-primary p-1 px-3 rounded-2xl text-white">
                Pagar
              </button>
            )}
            <div className="relative right-7">
              {itemsToPay && user.dataCompleted && (
                <MercadoPago
                  userId={currentUser.uid}
                  userEmail={currentUser.email}
                  arrayItems={arrayItems}
                  totalPay={totalPay}
                />
              )}
            </div>
          </div>
          <div></div>
        </section>
      </aside>
    </div>
  );
};

export default Order;
