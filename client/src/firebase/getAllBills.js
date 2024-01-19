import { collectionGroup, getDocs, query, where } from "firebase/firestore";
import { firebaseDb } from "./config";

const getAllBills = async () => {
  try {
    const q = query(collectionGroup(firebaseDb, "facturas"));
    const querySnapshot = await getDocs(q);
    const bills = [];
    querySnapshot.forEach((doc) => bills.push(doc.data()));
    return bills;
  } catch (error) {
    console.error("Error al obtener todas las facturas:", error.message);
  }
};

export default getAllBills;
