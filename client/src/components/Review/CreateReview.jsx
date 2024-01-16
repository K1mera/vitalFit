import React, { useState, useContext } from "react";
import { FaStar } from "react-icons/fa";
import { createReview } from "../../firebase/createReview";
import { userAuth } from "../../context/auth-context";
import { CloseIcon } from "../../icons/CloseIcon";

const CreateReview = ({ setShowReview, selectedItem }) => {
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

  const handleFeedbackChange = (e) => setFeedback(e.target.value);

  const saveData = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      alert("Por favor ingresa tu comentario antes de enviar la valoración");
      return;
    }
    await createReview(currentUser?.uid, {
      selectedItem,
      feedback,
      selectedItem,
      userReview,
    });
    setShowReview(false);
    window.alert("gracias por tu valoración");
  };
  return (
    <aside className="sideMenuLayout">
      <button>
        <CloseIcon
          className={
            "mb-1 text-red-700/90 w-8 transition hover:scale-125 hover:text-red-600"
          }
        />
      </button>
      <span>{`Review de ${selectedItem.name}`}</span>
      <div>
        {stars.map((_, index) => (
          <FaStar
            key={index}
            size={24}
            color={
              (hoveredRating || selectedRating) > index ? "#D6774F" : "#94a3b8"
            }
            onClick={() => handleRatingClick(index + 1)}
            onMouseOver={() => handleRatingHover(index + 1)}
            onMouseLeave={handleRatingLeave}
          />
        ))}
      </div>
      <div>
        <textarea
          placeholder="Escribe tu opinión del producto recibido"
          value={feedback}
          onChange={handleFeedbackChange}></textarea>
        <button onClick={saveData}>Enviar</button>
      </div>
    </aside>
  );
};

export default CreateReview;
