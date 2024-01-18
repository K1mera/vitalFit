import React, { useEffect, useState, useContext } from "react";
import clearCart from "../../firebase/clearCart";
import { getBillsByUser } from "../../firebase/getBillsByUser";
import { updateBillMP } from "../../firebase/updateBillMP";
import { userAuth } from "../../context/auth-context";

export const Succesfull = () => {
  const { currentUser, loading } = useContext(userAuth);
  const searchParams = new URLSearchParams(window.location.search);
  const paymentId = searchParams.get("payment_id");
  const arrayExternalData = searchParams.get("external_reference").split("-_");
  const externalReference = arrayExternalData[0];

  // console.log(paymentId, "paymentID"); //payment id de mercado pago
  // console.log(paymentResult, "external"); //order id de bdd

  const [paymentResult, setPaymentResult] = useState();

  const handlePayment = async () => {
    await updateBillMP(currentUser.uid, externalReference, {
      payment_id: paymentId,
      status: "succesfull",
    });
    const response = await getBillsByUser(currentUser.uid, externalReference);

    await clearCart(currentUser.uid);
    setPaymentResult(response[0]);
    sendEmail(currentUser.email, "te enviamos este correo para que sepas que tu compra fue finalizada y todo salió existoso!", "Esperamos disfrutes tu compra, gracias por preferirnos!")
    return;
  };

  useEffect(() => {
    localStorage.removeItem("products");
    handlePayment();
  }, [currentUser]);

  let totalPay = paymentResult.reduce(
    (total, item) => total + item.unit_price * item.quantity,
    0
  );

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <h1>Pago exitoso!</h1>
          <h1>Gracias por confiar en nosotros!</h1>
          <p>
            Tu compra ha sido procesada y te estaremos informando cuando esté en
            camino!
          </p>
          <p>Disfruta del producto y gracias por comprar!</p>
          <div>
            <p>Tu compra fue:</p>
            {paymentResult &&
              paymentResult.map((i, index) => (
                <div key={index}>
                  <h1>
                    {i.title} X {i.quantity}
                  </h1>
                  <img src={i.picture_url} width={45} alt="" />
                  <p>Precio unit: {i.unit_price}</p>
                </div>
              ))}
            <div>
              <span>
                El total de tu compra fue: {paymentResult && totalPay}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
