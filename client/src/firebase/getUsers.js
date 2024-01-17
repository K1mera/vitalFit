import { collection, doc, getDoc } from "firebase/firestore";
import { firebaseDb } from "./config";

const getUsers = async () => {
  try {
    const docRef = doc(collection(firebaseDb, "users"));
    const document = await getDoc(docRef);
    return document.data;
  } catch (error) {
    console.log(error.message);
  }
};
export default getUsers;
