import { collection, getDocs, where, query } from "firebase/firestore";
import { firebaseDb } from "./config";

export const getBillsByUser = async (userId, id) => {
  try {
    //Referencia a la subcolección facturas del usuario
    const userBillRef = collection(firebaseDb, "users", userId, "facturas");

    //consulta para obtener todas las facturas del usuario

    const q = id
      ? query(userBillRef, where("billNumber", "==", id))
      : query(userBillRef);
    //ejecuta la consulta
    const querySearch = await getDocs(q);

    //Itera a través de los resultados y almacena las facturas en un arreglo
    const bills = [];
    querySearch.forEach((doc) =>
      bills.push(doc.data().data, { ...doc.data() })
    );

    return bills;
  } catch (error) {
    console.log("Error al obtener las facturas del usuario:", error.message);
  }
};
