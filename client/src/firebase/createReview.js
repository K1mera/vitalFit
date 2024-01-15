import { doc, setDoc, collection } from "firebase/firestore";
import { firebaseDb } from "./config";

const generateUniqueReview = () => {
  const timeStamp = Date.now();
  const random = Math.floor(Math.random() * 10000); //Número aleatorio entre 0 9999
  return `${timeStamp}${random}`;
};

export const createReview = async (userId, reviewInfo) => {
  try {
    //Genera un número de review único
    const reviewNumber = generateUniqueReview();

    //Genera un referencia al documento de la review por usuario
    const userReviewRef = collection(firebaseDb, "users", userId, "reviews");
    const reviewRef = doc(userReviewRef, reviewNumber);

    //Guarda la review en firestore
    await setDoc(reviewRef, {
      reviewNumber,
      ...reviewInfo, //detalles de la review
    });
    return reviewNumber; //Retorna el número de review
  } catch (error) {
    console.log("Error al crear la reseña:", error.message);
  }
};
