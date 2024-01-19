import { doc, setDoc, collection, updateDoc } from "firebase/firestore";
import { firebaseDb } from "./config";

export const updateBillMP = async (userId, billNumber, data) => {
  try {
    const userBillRef = collection(firebaseDb, "users", userId, "facturas");
    const billRef = doc(userBillRef, billNumber);

    await updateDoc(billRef, data, { merge: true });
    return { ok: true };
  } catch (error) {
    console.log("Error al actualizar factura:", error.message);
  }
};
