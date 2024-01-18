import { doc, getDoc } from "firebase/firestore";
import { firebaseDb } from "./config";

const getUser = async (uid) => {
  try {
    const docRef = doc(firebaseDb, "users", uid);
    const document = await getDoc(docRef);
    return document.data();
  } catch (error) {
    console.log(error.message);
  }
};
export default getUser;
