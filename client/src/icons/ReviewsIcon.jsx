import React from "react";
import { FavoriteIcon } from "./FavoriteIcon";
import { useNavigate } from "react-router-dom";

const ReviewsIcon = () => {
  const navigate = useNavigate();
  return (
    <div className="group inline-block ">
      <button className="outline-none focus:outline-none  px-3 py-1  rounded-sm flex items-center min-w-32 max-sm:w-screen">
        <span className="pr-1 font-semibold flex">
          <FavoriteIcon
            className={
              "w-10 transition fill-primaryDark hover:scale-125 hover:fill-primary -mt-1"
            }
          />
        </span>
      </button>
      <ul
        className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
transition duration-150 ease-in-out origin-top min-w-32 z-10">
        <ul>
          <li className="rounded-sm px-3 py-1 hover:bg-gray-100 font-montserrat">
            <button onClick={() => navigate("/orders")}>Mis compras</button>
          </li>
          <li className="rounded-sm px-3 py-1 hover:bg-gray-100 font-montserrat">
            <button onClick={() => navigate("/createReviews")}>
              Agregar review
            </button>
          </li>
          <li className="rounded-sm px-3 py-1 hover:bg-gray-100 font-montserrat">
            <button onClick={() => navigate("/reviews")}>Mis reviews</button>
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default ReviewsIcon;
