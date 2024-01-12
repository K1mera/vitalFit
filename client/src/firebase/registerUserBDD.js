import { doc, setDoc } from "firebase/firestore";
import { firebaseDb } from "./config";

export const registerUserBDD = async (user) => {
  try {
    const docRef = doc(firebaseDb, "users", user.id);
    await setDoc(docRef, user);
  } catch (error) {
    console.log(error);
  }
};
