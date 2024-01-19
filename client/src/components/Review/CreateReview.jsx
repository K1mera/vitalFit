import React, { useState, useContext } from "react";
import { FaStar } from "react-icons/fa";
import { createReview } from "../../firebase/createReview";
import { userAuth } from "../../context/auth-context";
import { CloseIcon } from "../../icons/CloseIcon";
import Swal from "sweetalert2";

export const CreateReview = ({ setShowReview, selectedItem }) => {
  const { currentUser } = useContext(userAuth);

  const stars = Array(5).fill(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(undefined);
  const [feedback, setFeedback] = useState("");

  const userReview = {
    id: currentUser.uid,
    name: currentUser.displayName,
    photoURL: currentUser.photoURL,
  };
  const handleRatingClick = (value) => setSelectedRating(value);

  const handleRatingHover = (value) => setHoveredRating(value);
  const handleRatingLeave = () => setHoveredRating(undefined);

  const handleFeedbackChange = (e) => {
    if (feedback.length < 250) {
      setFeedback(e.target.value);
    }
    return;
  };

  const saveData = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: `Por favor, ingresa tu comentario antes de enviar`,
      });
      return;
    }
    if (!selectedRating) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: `Por favor, ingresa una puntuación`,
      });
      return;
    }
    await createReview(currentUser?.uid, {
      itemName: selectedItem.title,
      feedback,
      itemId: selectedItem.id,
      userReview,
      rating: selectedRating,
      itemImg: selectedItem.picture_url,
    });
    setShowReview(false);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: `Gracias por tus comentarios!`,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center ">
      <div
        className="bg-white
        rounded
        mt-20
        flex
        flex-col
        justify-center
        items-center
        m-auto
        w-[50vw]
        h-auto 
        p-5
      
      ">
        <section className=" w-[45vw]  text-right">
          <button onClick={() => setShowReview()}>
            <CloseIcon
              className={
                "mb-1 text-red-700/90 w-8 transition hover:scale-125 hover:text-red-600"
              }
            />
          </button>
        </section>
        <span className="font-bebas text-3xl">
          {" "}
          Review para <span className="text-primary">{selectedItem.title}</span>
        </span>
        <div>
          <div className="flex my-3">
            {stars.map((_, index) => (
              <FaStar
                key={index}
                size={24}
                color={
                  (hoveredRating || selectedRating) > index
                    ? "#D6774F"
                    : "#94a3b8"
                }
                onClick={() => handleRatingClick(index + 1)}
                onMouseOver={() => handleRatingHover(index + 1)}
                onMouseLeave={handleRatingLeave}
              />
            ))}
          </div>
        </div>
        <div>
          <textarea
            className="w-[40vw] font-montserrat border-slate-400 resize-none h-36 focus:ring-0 focus:border-slate-400"
            placeholder="Escribe tu opinión del producto recibido"
            value={feedback}
            onChange={handleFeedbackChange}></textarea>
          <p className=" text-end  text-slate-600">{feedback.length}/250</p>
          <div className="text-center">
            <button
              className="bg-primary p-2 rounded font-bebas text-white text-xl mt-2"
              onClick={saveData}>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
