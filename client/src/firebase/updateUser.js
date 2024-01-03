import { collection, doc, setDoc } from "firebase/firestore";
import { firebaseDb } from "../firebase/config";

const updateUser = async (user) => {
  try {
    const collectionRef = collection(firebaseDb, "users");
    const docRef = doc(collectionRef, user.id);
    await setDoc(docRef, user);
  } catch (error) {}
};

export default updateUser;
