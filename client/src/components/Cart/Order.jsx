import React, { useContext, useState } from "react";
import { userAuth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";

const Order = ({ setShowOrder }) => {
  initMercadoPago("TEST-96d6884d-30e9-4fe8-a75f-16fdc52d9ddb");
  const navigate = useNavigate();
  const { currentUser, products, productsLocalStorage, setTotalPay, totalPay } =
    useContext(userAuth);
  const [preferenceId, setPreferenceId] = useState(null);
  const envio = 4500;
  let cartItems;
  let totalAmount;
  let envioGratis = false;
  const createPreference = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/create_preference",
        {
          title: "VitalFit",
          quantity: 1,
          unit_price: totalPay,
        }
      );
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

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

  const handlePay = async () => {
    if (!currentUser) navigate("/loginUser");
    if (currentUser.dataCompleted) {
      const id = await createPreference();
      if (id) {
        setPreferenceId(id);
      }
      return;
    }
    navigate("/preCheckout");
  };

  return (
    <div>
      <aside className="sideMenuLayout">
        <section>
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
        {currentUser && currentUser.calle && currentUser.altura && (
          <div>
            <span>{`La dirección de envío registrada es ${currentUser.calle} ${currentUser.altura}`}</span>
            <a href="/preCheckout">
              <p> Cambiar la dirección</p>
            </a>
          </div>
        )}

        <section className="flex justify-between items-center bg-white fixed bottom-0 h-14 w-72">
          <div className="font-bebas text-2xl mb-2">
            <p className="text-base mt-2">Sub-total: {totalAmount}</p>
            <span>Total: </span>

            <span>$ {totalPay}</span>
          </div>
          <div className="fixed right-7 bottom-2 font-bebas text-2xl">
            {totalAmount > 0 && (
              <button
                onClick={handlePay}
                className=" bg-primary p-1 px-3 rounded-2xl text-white">
                Pagar
              </button>
            )}
            {preferenceId && <Wallet initialization={{ preferenceId }} />}
          </div>
        </section>
      </aside>
    </div>
  );
};

export default Order;
