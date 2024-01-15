import { doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseDb } from "./config";

export const userDirectionBDD = async (uid, data) => {
  const docRef = doc(firebaseDb, "users", uid);
  const userDoc = await getDoc(docRef);
  if (userDoc.exists()) {
    await setDoc(docRef, { ...data, dataCompleted: true }, { merge: true });
  }
  return {
    ok: true,
  };
};
