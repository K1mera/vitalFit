import { useState } from "react";
import React, { useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import createBill from "../../firebase/createBill";
import { updateBillMP } from "../../firebase/updateBillMP";

import { productsIns } from "../../api/productsInstance";


const MercadoPago = ({ userId, userEmail, arrayItems, userData }) => {
  const [preferenceId, setPreferenceId] = useState();
  initMercadoPago("TEST-96d6884d-30e9-4fe8-a75f-16fdc52d9ddb");

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
      await updateBillMP(userId, orderId, { orderMP: id });
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
