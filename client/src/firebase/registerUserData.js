import { doc, setDoc } from "firebase/firestore";
import { firebaseDb } from "./config";

const registerUserData = async (user) => {
  try {
    const docRef = doc(firebaseDb, "users", user.id);
    await setDoc(docRef, user);
  } catch (error) {}
};

export default registerUserData;
