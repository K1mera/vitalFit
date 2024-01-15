import React, { useState, useEffect, useContext } from "react";
import { CreateReview } from "../../../components/Review/CreateReview";
import { getBillsByUser } from "../../../firebase/getBillsByUser";
import { userAuth } from "../../../context/auth-context";

const Profile_Reviews = () => {
  const { user } = useContext(userAuth);
  const [showReview, setShowReview] = useState(false);
  const [shopping, setShopping] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const billsByUser = await getBillsByUser(user?.id);
        if (billsByUser) {
          const billsToArray = billsByUser.map((e) => Object.values(e));
          const billsFiltered = billsToArray
            .map((e) => e.filter((item) => item.hasOwnProperty("name")))
            .flat();
          const uniqueObject = {};
          const billsSinDuplicados = billsFiltered.filter((obj) => {
            const clave = obj.name;
            if (!uniqueObject[clave]) {
              uniqueObject[clave] = true;
              return true;
            }
            return false;
          });
          setShopping(billsSinDuplicados);
        } else {
          setShopping([]);
        }
        setLoading(false);
      } catch (error) {
        console.log("Error al obtener las compras del usuario:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

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
        <p>Cargando...</p>
      ) : (
        <div>
          <h2>Reviews de tus compras</h2>
          <table>
            <thead>
              <th>Imágen</th>
              <th>Nombre</th>
              <th>Precio</th>
            </thead>
            <tbody>
              {shopping.map((e, index) => (
                <tr key={index}>
                  <td>
                    <img src={e.image[0]} alt="" width={25} />
                  </td>
                  <td>{e.name}</td>
                  <td>{e.price}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleOpenReviewModal(e.name);
                      }}>
                      Agregar reseña
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showReview && (
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

export default Profile_Reviews;
