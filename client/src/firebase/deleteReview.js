import { doc, deleteDoc, collection } from "firebase/firestore";
import { firebaseDb } from "./config";

const deleteReview = async (userId, reviewId) => {
  // Obtener la referencia al documento de usuario

  const userDocRef = doc(firebaseDb, "users", userId);

  try {
    // Obtener la referencia al documento de revisión dentro de la subcolección "reviews"
    const reviewDocRef = doc(collection(userDocRef, "reviews"), reviewId);
    await deleteDoc(reviewDocRef);
    console.log("Review eliminada exitosamente");
  } catch (error) {
    console.error("Error al eliminar la review:", error);
  }
};

export default deleteReview;
