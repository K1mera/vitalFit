import { useContext, useState } from "react";
import React, { useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

import { updateBillMP } from "../../firebase/updateBillMP";

import { productsIns } from "../../api/productsInstance";
import createBill from "../../firebase/createBill";

const MercadoPago = ({ userId, userEmail, arrayItems, userData }) => {
  const [preferenceId, setPreferenceId] = useState();
  initMercadoPago("TEST-96d6884d-30e9-4fe8-a75f-16fdc52d9ddb");

  useEffect(() => {
    const createPreference = async () => {
      try {
        const orderId = await createBill(userId, arrayItems, userData);

        //   const { data } = await productsIns.post("/create_preference", {
        const { data } = await productsIns.post("/create_preference", {
          userId: userId,
          userEmail: userEmail,
          items: arrayItems,
          orderId: orderId,
        });

        const { id } = data;
        if (id) setPreferenceId(id);
        if (id && orderId) {
          const update = await updateBillMP(userId, orderId, { orderMP: id });
        }

        return;
      } catch (error) {
        console.log(error);
      }
    };
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
