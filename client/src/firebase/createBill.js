import { doc, setDoc, collection } from "firebase/firestore";
import { firebaseDb } from "./config";

const generateUniqueBillNumber = () => {
  const timestamp = Date.now(); // Obtener la fecha actual en milisegundos
  const randomNumber = Math.floor(Math.random() * 10000); // Número aleatorio de 0 a 9999
  return `${timestamp}${randomNumber}`; // Combinar la marca de tiempo y el número aleatorio
};

const generateDate = () => {
  const tiempo = Date.now();
  const fecha = new Date(tiempo).toLocaleDateString();
  return fecha;
};
const createBill = async (userId, billData, userData) => {
  try {
    // Generar un número de factura único
    const billNumber = generateUniqueBillNumber();
    const fecha = generateDate();

    // Crear una referencia al documento de factura en la colección de facturas del usuario
    const userBillRef = collection(firebaseDb, "users", userId, "facturas");
    const billRef = doc(userBillRef, billNumber);

    // Guardar la factura en Firestore
    await setDoc(billRef, {
      billNumber,
      fecha,
      data: billData,
      userData: userData,
      status: "pending",
      // Otros detalles de la factura
    });

    return billNumber; // Devolver el número de factura generado
  } catch (error) {
    console.error("Error al crear la factura:", error);
    throw error;
  }
};

export default createBill;
