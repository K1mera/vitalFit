import React from "react";

const Calification = ({ image, title, description }) => {

  return (
    <div 
      className="flex flex-column "
      style={{height: 100}}
    >
      <img height={40} width={70}
      style={{
        borderRadius: "60%"
      }}
      src={image} />
      <div>
        <h1 style={{
          fontFamily: "Nueva Fuente, bebas neue",
          fontSize: "1.3rem"
        }} >{title}</h1>
        <h3>⭐ ⭐ ⭐ ⭐ ⭐</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Calification;
