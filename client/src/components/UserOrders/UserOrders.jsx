import React, { useContext, useState } from "react";
import { CloseIcon } from "../../icons/CloseIcon";
import { userAuth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { updateBillMP } from "../../firebase/updateBillMP";

const UserOrders = ({ setShowOrders, fecha, status, products, id }) => {
  const { currentUser } = useContext(userAuth);
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const handleReceived = async () => {
    await updateBillMP(currentUser.uid, id, { status: "received" });
    setDisable(true);
    return;
  };
  const handleReview = () => {
    setShowOrders();
    navigate("/createReviews");
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center font-montserrat font-medium">
      <div
        className="bg-white
        rounded
        mt-20
        flex
        flex-col
        justify-center
        items-center
        m-auto
        w-fit 
        p-5
      
      ">
        <section className=" w-full  text-right">
          <button onClick={() => setShowOrders()}>
            <CloseIcon
              className={
                "mb-1 text-red-700/90 w-8 transition hover:scale-125 hover:text-red-600"
              }
            />
          </button>
        </section>
        <section className=" w-full mb-2 ">
          <h3 className="justify-start">Compra #{id.slice(-6)}</h3>
        </section>
        <section className="grid grid-cols-3">
          {products &&
            products.map((i, index) => (
              <div key={index} className="w-full">
                <div className="flex items-center justify-start">
                  <img src={i.picture_url} alt={i.title} width={70} />
                  <h2 className="font-bebas text-2xl">
                    {i.title}{" "}
                    <span className="text-teal-600 font-montserrat text-xl ml-3">
                      X {i.quantity}
                    </span>
                  </h2>
                </div>
              </div>
            ))}
        </section>
        <h4 className="mt-3">Fecha de compra: {fecha}</h4>
        <h4>
          Estado de compra:{" "}
          {status == "succesfull" ? (
            <span>En proceso</span>
          ) : status == "send" ? (
            <span>En camino</span>
          ) : status == "received" ? (
            <span>Recibido!</span>
          ) : (
            <span>En proceso</span>
          )}
        </h4>
        <div className="flex mt-2">
          <button
            onClick={handleReview}
            className="bg-primary p-2 font-bebas rounded text-white mx-2">
            Agregar reseña
          </button>
          {status !== "received" && !disable && (
            <button
              onClick={handleReceived}
              className="bg-primary p-2 font-bebas rounded text-white mx-2">
              Recibido
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
