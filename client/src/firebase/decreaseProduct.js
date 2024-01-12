import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firebaseDb } from "./config";

const decreaseProduct = async (uid, productID) => {
  try {
    const cartDocRef = doc(firebaseDb, "carritos", uid);

    const cartDoc = await getDoc(cartDocRef);

    if (cartDoc.exists()) {
      const cartData = cartDoc.data();
      const products = cartData.productos;

      const index = products.findIndex((p) => p.id === productID);
      if (index !== -1) {
        //si el índice es mayor a cero, disminuye su cantidad
        if (products[index].cantidad > 0) {
          products[index].cantidad -= 1;

          //verifica si la cantidad llega a 0 y elimina el producto del carrito
          if (products[index].cantidad === 0) {
            products.splice(index, 1);
          }

          //actualiza el documento del carrito
          await updateDoc(cartDocRef, {
            productos: products,
          });
          console.log("Cantidad disminuida con éxito");
        }
      }
    }
  } catch (error) {
    console.log("El producto no existe en el carrito:", error.message);
  }
};

export default decreaseProduct;
