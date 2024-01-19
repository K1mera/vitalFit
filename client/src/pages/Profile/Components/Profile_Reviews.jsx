import React, { useState, useEffect, useContext } from "react";
import { CreateReview } from "../../../components/Review/CreateReview";
import { getBillsByUser } from "../../../firebase/getBillsByUser";
import { userAuth } from "../../../context/auth-context";
import { Loading } from "../../../components/Loading/Loading";

export const Profile_Reviews = () => {
  const { currentUser } = useContext(userAuth);
  const [showReview, setShowReview] = useState(false);
  const [shopping, setShopping] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          const billsByUser = await getBillsByUser(currentUser?.uid);

          let products = [];
          if (billsByUser) {
            const billsSuccesfull = billsByUser
              .filter((e) => e.status == "succesfull")
              .map((e) => e.data)
              .flat();
            const uniqueObjetos = {};
            const sinDuplicados = billsSuccesfull.filter((obj) => {
              // Genera una clave única para cada objeto basada en sus propiedades
              const clave = obj.title;

              // Si la clave no existe en el objeto auxiliar, marca el objeto como único
              if (!uniqueObjetos[clave]) {
                uniqueObjetos[clave] = true;
                return true;
              }

              return false; // Si la clave ya existe, el objeto es duplicado
            });
            setShopping(sinDuplicados);
          } else {
            setShopping([]);
          }
          setLoading(false);
        }
      } catch (error) {
        console.log("Error al obtener las compras del usuario:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const handleOpenReviewModal = (product) => {
    setSelectedItem(product);
    setShowReview(true);
  };

  const handleCloseReviewModal = () => {
    setShowReview(false);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className=" max-w-max mx-auto p-10 mt-18">
          <h2 className="text-3xl font-bebas mb-10 text-center">
            Estos son los productos que has comprado!
          </h2>
          <div className={shopping.length < 3 ? "mb-40 mx-auto" : "mx-auto"}>
            {shopping &&
              shopping.map((e, index) => (
                <section
                  key={index}
                  className="flex min-w-max justify-between p-3 text-xl font-montserrat">
                  <article>
                    <img src={e.picture_url} alt="" width={67} />
                  </article>
                  <article className="w-52 ml-4 my-auto font-semibold">
                    {e.title}
                  </article>

                  <article className="w-20 mr-5 my-auto font-semibold">
                    ${e.unit_price}
                  </article>
                  <button
                    className="bg-primary p-2 text-lg rounded font-bebas text-white h-min my-auto"
                    onClick={() => {
                      handleOpenReviewModal(e);
                    }}>
                    Agregar reseña
                  </button>
                </section>
              ))}
          </div>
          {showReview && selectedItem && (
            <div>
              <div>
                <CreateReview
                  setShowReview={handleCloseReviewModal}
                  selectedItem={selectedItem}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
