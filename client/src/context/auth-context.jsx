import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import addProductToCart from "../firebase/addProductToCart";
import { firebaseAuth } from "../firebase/config";
import getUser from "../firebase/getUser";

export const userAuth = createContext();

const UserContext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState(null);
  const [productsLocalStorage, setProductsLocalStorage] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPay, setTotalPay] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (userFirebase) => {
      if (userFirebase) {
        setCurrentUser(userFirebase);
        //verifica si el usuario está en bdd
        const user = await getUser(userFirebase?.uid);
        if (user) {
          setUser(user);
          setIsRegistered(true);
          //si el producto está registrado toma los productos del carrito
          //guardados en el local storage y los agrega al carrito
          //asociado al usuario
          await addProductToCart(
            userFirebase?.uid,
            JSON.parse(window.localStorage.getItem("products"))
          );

          //elimina los productos del carrito del local storage
          localStorage.removeItem("products");
          setProductsLocalStorage([]);
        } else {
          setIsRegistered(false);
        }
      }
      setLoading(false);
    });
  }, []);

  return (
    <userAuth.Provider
      value={{
        currentUser,
        isRegistered,
        loading,
        setLoading,
        user,
        productsLocalStorage,
        setProductsLocalStorage,
        products,
        setProducts,
        totalPay,
        setTotalPay,
      }}>
      {children}
    </userAuth.Provider>
  );
};

export default UserContext;
