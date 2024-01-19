import React, { useState, useContext, useEffect } from "react";
import { userAuth } from "../../../context/auth-context";
import { getReviewsByUser } from "../../../firebase/getReviewsByUser";
import { DeleteIcon } from "../../../icons";
import deleteReview from "../../../firebase/deleteReview";
import { Loading } from "../../../components/Loading/Loading";
import Swal from "sweetalert2";
const Profile_userReviews = () => {
  const [userRevs, setUserRevs] = useState(null);
  const [deleted, setDeleted] = useState(null);
  const { currentUser, loading } = useContext(userAuth);
  useEffect(() => {
    const fetchReviews = async () => {
      if (currentUser) {
        const reviews = await getReviewsByUser(currentUser?.uid);
        if (reviews) {
          setUserRevs(reviews);
        }
      }
    };
    fetchReviews();
  }, [currentUser, deleted]);

  const handleDelete = async (review) => {
    await deleteReview(currentUser?.uid, review);
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
      title: `La review ha sido eliminada con éxito`,
    });
    setTimeout(() => {
      location.reload();
    }, 2000);
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : userRevs && userRevs.length > 0 ? (
        <div className="w-[90vw] mx-auto my-16">
          <h2 className="font-bebas text-4xl mx-auto text-center mb-5">
            Mis reviews
          </h2>
          <div className="flex flex-col w-[90vw] font-montserrat mx-auto">
            {userRevs &&
              userRevs.map((e, index) => (
                <section
                  key={index}
                  className="flex bg-primaryLight/80 rounded p-5 w-[800px] mx-auto mb-10 h-auto">
                  <section className="my-auto">
                    <article className="mr-6">
                      <img src={e.itemImg} width={100} className="rounded" />
                    </article>
                  </section>

                  <section className="w-[700px]">
                    <section className="flex justify-between">
                      <article className="mr-5 font-bebas text-2xl w-80 mb-3">
                        {e.itemName}
                      </article>
                      <article className="mr-5">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span
                            key={index}
                            className={`text-2xl items-center ${
                              index < e.rating
                                ? "text-yellow-400"
                                : "text-gray-500"
                            }`}>
                            &#9733;
                          </span>
                        ))}
                      </article>
                    </section>
                    <article className="indent-5 mr-6 max-w-fit mb-3">
                      {e.feedback}
                    </article>
                    <article className=" text-end mr-6 text-slate-600 ">
                      {e.fecha}
                    </article>
                  </section>

                  <section className=" my-auto">
                    <button onClick={() => handleDelete(e.reviewNumber)}>
                      <DeleteIcon className="text-primary w-10" />
                    </button>
                  </section>
                </section>
              ))}
          </div>
        </div>
      ) : (
        <h2 className="font-bebas text-4xl mx-auto text-center my-16">
          Aún no publicas ninguna review
        </h2>
      )}
    </div>
  );
};

export default Profile_userReviews;
