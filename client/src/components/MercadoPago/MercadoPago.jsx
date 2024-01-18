import { useState } from "react";
import React, { useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import createBill from "../../firebase/createBill";
import { updateBillMP } from "../../firebase/updateBillMP";
import sendEmail from "../../sendEmail/sendEmail";

const MercadoPago = ({ userId, userEmail, arrayItems, totalPay }) => {
  const [preferenceId, setPreferenceId] = useState();
  initMercadoPago("TEST-96d6884d-30e9-4fe8-a75f-16fdc52d9ddb");

  const createPreference = async () => {
    try {
      const orderId = await createBill(userId, arrayItems);
      const { data } = await axios.post(
        "http://localhost:3001/create_preference",
        {
          userId: userId,
          userEmail: userEmail,
          items: arrayItems,
          orderId: orderId,
          /*  title: "VitalFit",
          unit_price: totalPay,
          quantity: 1, */
        }
      );

      const { id } = data;
      if (id) setPreferenceId(id);
      await updateBillMP(userId, orderId, { orderMP: id });
      sendEmail(userEmail,
        `te enviamos este correo para contarte que tu compra esta siendo procesada y todo está saliendo genial! Tu numero de orden de compra es: ${orderId}`, 
        "Gracias por preferirnos!")
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    createPreference();
  }, []);
  return (
    <div>
      {preferenceId ? (
        <Wallet initialization={{ preferenceId }} />
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default MercadoPago;
