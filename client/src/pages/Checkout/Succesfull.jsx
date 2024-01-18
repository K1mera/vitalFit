import React, { useEffect, useState, useContext } from "react";
import clearCart from "../../firebase/clearCart";
import { getBillsByUser } from "../../firebase/getBillsByUser";
import { updateBillMP } from "../../firebase/updateBillMP";
import { userAuth } from "../../context/auth-context";
import { useDispatch } from "react-redux";
import { putProduct } from "../../store";

export const Succesfull = () => {
  const { currentUser, loading } = useContext(userAuth);
  const searchParams = new URLSearchParams(window.location.search);
  const paymentId = searchParams.get("payment_id");
  const arrayExternalData = searchParams.get("external_reference").split("-_");
  const externalReference = arrayExternalData[0];
  const dispatch = useDispatch();

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
    setPaymentResult(response[0].data);
    return;
  };

  const handleStock = () => {
    paymentResult?.map((i) =>
      dispatch(putProduct({ stock: i.newStock }, i.id))
    );
    return;
  };
  useEffect(() => {
    localStorage.removeItem("products");
    if (currentUser) {
      handlePayment();
      handleStock();
    }
  }, [currentUser, paymentResult]);

  let totalPay = paymentResult?.reduce(
    (total, item) => total + item.unit_price * item.quantity,
    0
  );

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="text-center mt-6 font-montserrat font-medium text-xl indent-3">
          <h1 className="text-primary font-bebas text-5xl font-normal mb-3">
            ¡Pago exitoso!
          </h1>
          <h1 className="mb-2">Gracias por confiar en nosotros!</h1>
          <p className="mb-2">
            Tu compra ha sido procesada y te estaremos informando cuando esté en
            camino!
          </p>
          <p className="mb-2">Disfruta del producto y gracias por comprar!</p>
          <div>
            <p className="mb-14">Los productos de tu compra son:</p>
            {paymentResult &&
              paymentResult.map((i, index) => (
                <div
                  key={index}
                  className=" w-fit mx-auto flex items-center mb-14">
                  <img src={i.picture_url} width={85} alt="" className="mr-4" />
                  <h1 className="mr-10 font-bebas text-3xl">
                    {i.title}{" "}
                    <span className="font-montserrat text-2xl ml-3 text-teal-600">
                      X {i.quantity}
                    </span>
                  </h1>
                  <p>
                    Precio unit:{" "}
                    <span className="ml-3 text-teal-600 font-semibold">
                      ${i.unit_price}
                    </span>
                  </p>
                </div>
              ))}
            <div className="mb-5">
              <p>
                El total de tu compra fue:{" "}
                <span className="ml-3 font-semibold  text-primary ">
                  {" "}
                  ${paymentResult && totalPay}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
