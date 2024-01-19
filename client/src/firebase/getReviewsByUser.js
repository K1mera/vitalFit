import { collection, getDocs, where, query } from "firebase/firestore";
import { firebaseDb } from "./config";

export const getReviewsByUser = async (userId) => {
  try {
    //Referencia a la subcolección reviews del usuario
    const userBillRef = collection(firebaseDb, "users", userId, "reviews");

    //consulta para obtener todas las reviews del usuario

    const q = query(userBillRef);
    //ejecuta la consulta
    const querySearch = await getDocs(q);

    //Itera a través de los resultados y almacena las reviews en un arreglo
    const bills = [];
    querySearch.forEach((doc) => bills.push(doc.data()));
    return bills;
  } catch (error) {
    console.log("Error al obtener las reviews del usuario:", error.message);
  }
};
