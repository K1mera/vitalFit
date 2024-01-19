import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../store";
import { useContext } from "react";
import { userAuth } from "../context/auth-context";
import addProductToCart from "../firebase/addProductToCart";
import increaseProduct from "../firebase/increaseProduct";
import { Loading } from "../components";
import getAllReviews from "../firebase/getAllReviews";
import Review from "../components/Review/Review";
import getCartProducts from "../firebase/getCartProducts";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./slider.css";
import BackIcon from "../icons/BackIcon";
import Swal from "sweetalert2";

export const DetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { product, loading } = useSelector((state) => state.product);
  const [amount, setAmount] = useState(1);
  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState(null);
  const [promedioRevs, setPromedioRevs] = useState(null);
  const { currentUser, productsLocalStorage, setProductsLocalStorage } =
    useContext(userAuth);
  const { name, price, image, stock } = product;

  useEffect(() => {
    dispatch(getProductById(id));
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await getAllReviews();
      const filtered = response.filter((product) => product.itemId == id);
      if (filtered.length > 0) {
        setReviews(filtered);
        const rating = filtered.map((e) => e.rating);
        const prom = rating.reduce((t, rev) => t + rev, 0);
        setPromedioRevs(prom / filtered.length);
      }
    };

    fetchReviews();
  }, [currentUser, id]);

  const newArray =
    image?.map((e) => {
      return { original: e, thumbnail: e };
    }) || [];
  const addProduct = async () => {
    if (stock > 0) {
      if (currentUser) {
        const existing = productsLocalStorage?.find((p) => p.id == id);
        if (existing) {
          existing.cantidad += amount;
          setProductsLocalStorage([...productsLocalStorage]);
        } else {
          const existingBDD = await getCartProducts(currentUser.uid);
          const filtered = existingBDD?.find((p) => p.id == id);
          if (filtered) {
            increaseProduct(currentUser.uid, id, amount);
          } else {
            addProductToCart(currentUser.uid, {
              name: name,
              price: price,
              image: image[0],
              stock: stock,
              cantidad: amount,
              id: id,
            });
          }
        }
      } else {
        const existing = JSON.parse(localStorage.getItem("products")) || [];
        console.log(existing);
        const exists = existing.find((p) => p.id == id);
        if (exists) {
          if (exists.cantidad >= stock) {
            return;
          }
          exists.cantidad += amount;
          localStorage.setItem("products", JSON.stringify(existing));
          setProductsLocalStorage(existing);
        } else {
          existing.push({
            name: name,
            price: price,
            image: image[0],
            cantidad: amount,
            id: id,
            stock: stock,
          });

          localStorage.setItem("products", JSON.stringify(existing));
          setProductsLocalStorage(existing);
        }
      }
    }
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: "success",
      title: `Producto agregado al carrito`,
    });
  };

  const increaseAmount = () => {
    setAmount(amount + 1);
  };

  const decreaseAmount = () => {
    if (amount <= 1) return;
    setAmount(amount - 1);
  };

  /*  const handleSelect = (e) => {
    setSelectedFlavour(e.target.value);
  }; */

  const handleBack = () => {
    navigate("/productsPage");
  };
  return (
    <main className="w-auto h-full flex flex-col items-center mt-6 mx-8 gap-16">
      {loading ? (
        <Loading />
      ) : (
        <>
          <section className="flex flex-row items-center gap-2 h-full w-[90vw]">
            <section className="flex">
              <section className="">
                <button onClick={handleBack}>
                  <BackIcon
                    className={
                      "mb-1 text-primary/90 w-10 mr-20 transition hover:scale-125 hover:text-primary"
                    }
                  />
                </button>
              </section>
              <ImageGallery
                items={newArray}
                /* additionalClass={styles} */
                thumbnailPosition="left"
              />
              <dl className="flex-1 flex flex-col p-7 w-auto h-auto bg-primaryLight/30 rounded-xl">
                <section className="flex flex-col w-auto items-start ">
                  <dt className="font-bebas text-3xl">{product.name}</dt>
                  <dd className="font-montserrat mb-3">
                    <span className="mr-3">{promedioRevs}</span>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span
                        key={index}
                        className={`text-xl ${
                          index < promedioRevs
                            ? "text-yellow-400"
                            : "text-gray-500"
                        }`}>
                        &#9733;
                      </span>
                    ))}

                    <span className="ml-3">{reviews?.length}</span>
                    {reviews?.length > 1 ? (
                      <span className="ml-3">Opiniones</span>
                    ) : reviews?.length > 0 ? (
                      <span className="ml-3">Opinión</span>
                    ) : (
                      <span className="ml-3">Aún no hay opiniones</span>
                    )}
                  </dd>
                  <span className="font-montserrat font-medium text-primary text-2xl">
                    ${product.price}
                  </span>
                </section>
                <section className="flex items-center h-12 gap-2.5 mt-1">
                  <figure className="flex px-3 py-2 items-center gap-2 font-bebas rounded-full border-solid border-2 border-black text-black">
                    <button
                      className="transition hover:scale-150 hover:text-primary px-2"
                      onClick={decreaseAmount}>
                      -
                    </button>
                    {amount}
                    <button
                      className="transition hover:scale-150 hover:text-primary px-2"
                      onClick={increaseAmount}>
                      +
                    </button>
                  </figure>
                  {/*   <select
                  className="font-montserrat font-medium bg-transparent border-none focus:ring-0 focus:border-0"
                  onChange={handleSelect}>
                  <option disabled selected>
                  Sabor
                  </option>
                  {product.flavour &&
                    product.flavour.map((e, index) => (
                      <option className="focus:bg-black" value={e}>
                        {e}
                      </option>
                    ))}
                </select> */}
                  <button className="addButton" onClick={addProduct}>
                    AGREGAR
                  </button>
                </section>
                <section className="flex flex-col py-2.5 gap-2.5 font-montserrat">
                  <div>
                    <dt className="font-bold">Características</dt>

                    <ul className="list-disc">
                      {product.pre_description &&
                        product.pre_description.map((e, index) => (
                          <li className="ml-5 ">{e}</li>
                        ))}
                      <li className="ml-5">
                        <span className="font-bold">Tamaño: </span>
                        {product.size}
                      </li>
                      <li className="ml-5">
                        <span className="font-bold">Stock: </span>
                        {product.stock}
                      </li>
                    </ul>
                  </div>
                </section>
              </dl>
            </section>
          </section>

          <section className=" bg-primaryLight/40 rounded-xl w-[80vw] p-10 font-montserrat font-normal">
            <h3 className="font-bold">Descripción</h3>
            {product.description &&
              product.description.map((e, index) => (
                <p key={index} className="indent-5">
                  {e}.
                </p>
              ))}
            <h3 className="font-bold">Dosis</h3>
            {product.dose && <p className="indent-5">{product.dose}</p>}
          </section>
          <section className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-2  w-[98%] items-start ">
            {reviews &&
              reviews.map((r, index) => (
                <div className="">
                  <Review
                    key={index}
                    name={r.userReview.name}
                    feedback={r.feedback}
                    rating={r.rating}
                    fecha={r.fecha}
                  />
                </div>
              ))}
          </section>

          {/* destacados */}
          <section></section>
        </>
      )}
    </main>
  );
};
