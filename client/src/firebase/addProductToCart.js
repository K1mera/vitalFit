import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { firebaseDb } from "./config";

const addProductToCart = async (uid, product) => {
  try {
    const cartDocRef = doc(firebaseDb, "carrito", uid);

    //verifica si hay carritos asociados al usuario
    const cartDoc = await getDoc(cartDocRef);

    //verifica product es un array
    if (Array.isArray(product)) {
      //verfica si hay productos anteriores en el carrito
      const existingProducts = cartDoc.data().products;

      if (existingProducts.length > 0) {
        //si hay productos anteriores, los junta con los productos agregados
        const combined = [...existingProducts, product];
        //nuevo array con todos los productos
        const added = [];

        for (const product of combined) {
          //si en el nuevo array "added" existe el producto se le modifica la cantidad
          //si no existe, se pushea el producto nuevo
          const exist = added.find((p) => p.id === product.id);
          if (exist) {
            exist.cantidad + product.cantidad;
          } else {
            added.push(product);
          }
        }

        //actualiza el carrito con los productos agregados
        added &&
          (await updateDoc(cartDocRef, {
            products: added,
          }));
      } else {
        cartDoc.exists() &&
          product &&
          (await updateDoc(cartDocRef, { products: arrayUnion(...product) }));
      }
    } else {
      cartDoc.exists() &&
        product &&
        (await updateDoc(cartDocRef, { products: arrayUnion(...product) }));
    }
  } catch (error) {
    console.log("Error al agregar producto al carrito", error.message);
  }
};

export default addProductToCart;
