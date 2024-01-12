import { doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseDb } from "./config";
const addCarrito = async (uid) => {
  const cartDocRef = doc(firebaseDb, "carritos", uid);
  try {
    const cartUser = await getDoc(cartDocRef);

    !cartUser.exists() && (await setDoc(cartDocRef, { productos: [] }));
  } catch (error) {
    console.log("Error creando/verficando el carrito", error.message);
  }
};
export default addCarrito;
