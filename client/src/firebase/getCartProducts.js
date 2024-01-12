import { doc, getDoc } from "firebase/firestore";
import { firebaseDb } from "./config";

const getCartProducts = async (uid) => {
  try {
    const cartDocRef = doc(firebaseDb, "carritos", uid);

    const cartDoc = await getDoc(cartDocRef);

    if (cartDoc.exists()) {
      const cartData = cartDoc.data();
      const products = cartData.productos;
      return products;
    } else {
      return [];
    }
  } catch (error) {}
};

export default getCartProducts;
