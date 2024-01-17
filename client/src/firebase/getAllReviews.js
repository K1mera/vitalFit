import { collectionGroup, getDocs, query } from "firebase/firestore";
import { firebaseDb } from "./config";

const getAllReviews = async () => {
  try {
    const q = query(collectionGroup(firebaseDb, "reviews"));
    const querySnapshot = await getDocs(q);
    const reviews = [];
    querySnapshot.forEach((doc) => reviews.push(doc.data()));
    return reviews;
  } catch (error) {
    console.error("Error al obtener todas las facturas:", error.message);
  }
};

export default getAllReviews;
