import { doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseDb } from "./config";

const clearCart = async (uid) => {
  try {
    const cartDocRef = doc(firebaseDb, "carritos", uid);

    const cartDoc = await getDoc(cartDocRef);

    //Si el documento del carrito existe, establece el campo de products como un array vacio
    if (cartDoc.exists()) {
      await setDoc(cartDocRef, { productos: [] }, { merge: true });
    }
  } catch (error) {
    console.log("Error al vaciar el carrito:", error.message);
  }
};

export default clearCart;
