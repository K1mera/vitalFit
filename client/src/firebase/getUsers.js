import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firebaseDb } from "./config";

const getUsers = async () => {
  try {
    // const docRef = doc(collection(firebaseDb, "users"));
    // const document = await getDoc(docRef);
    const querySnapshot = await getDocs(
        collection(firebaseDb, "users")
    );
    const listaUsuarios = querySnapshot.docs.map((doc) =>
    doc.data()
);

    return listaUsuarios;
  } catch (error) {
    console.log(error.message);
  }
};
export default getUsers;
