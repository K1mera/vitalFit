import React from "react";

const Review = ({ name, feedback, rating, fecha }) => {
  return (
    <div className="w-[450px] mx-auto relative bg-gradient-to-r from-slate-200 to-slate-300 text-black rounded-lg overflow-hidden shadow-lg mb-5 flex p-4">
      <div className="p-1 rounded-full shadow-md h-fit">
        <img
          src={
            "https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1"
          }
          alt={name}
          width={65}
          className="rounded-full"
        />
      </div>
      <div className="px-4 py-2  w-[80%]">
        <div className="flex  justify-between">
          <div className="text-xl font-bebas mr-5">{name}</div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className={`text-xl ${
                  index < rating ? "text-yellow-400" : "text-gray-500"
                }`}>
                &#9733;
              </span>
            ))}
          </div>
        </div>
        <p className=" text-sm mt-2 font-montserrat font-medium text-slate-900">
          {feedback}
        </p>
        <p className="text-end text-slate-600 mt-2">{fecha}</p>
      </div>
    </div>
  );
};

export default Review;
