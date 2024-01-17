import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firebaseDb } from "./config";

const increaseProduct = async (uid, productID, amount) => {
  try {
    //Referencia al documento de carrito
    const cartDocRef = doc(firebaseDb, "carritos", uid);

    //Obtiene el documento del carrito
    const cartDoc = await getDoc(cartDocRef);

    if (cartDoc.exists()) {
      //si el carrito existe, obtenemos los productos
      const cartData = cartDoc.data();
      const products = cartData.productos;

      //Encuentra el índice del producto en el array para poder modificarlo
      const index = products?.findIndex((p) => p.id == productID);

      if (index !== -1) {
        //findIndex retorna -1 cuando no hay coincidencias
        //Si el producto existe en el carrito, aumenta su cantidad
        if (amount) {
          console.log("entró");

          products[index].cantidad += amount;
        } else {
          products[index].cantidad += 1;
        }

        //Actualiza el documento del carrito con la cantidad de productos actualizada
        await updateDoc(cartDocRef, {
          productos: products,
        });
      } else {
        console.log("El producto no existe en el carrito");
      }
    } else {
      console.log("El carrito no existe para este usuario");
    }
  } catch (error) {
    console.log("Error al aumentar la cantidad del producto:", error.message);
  }
};

export default increaseProduct;
