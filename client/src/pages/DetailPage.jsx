import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../store";

export const DetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id]);

  const lengthReviews = product.Reviews;

  console.log(lengthReviews);

  return (
    <main className="w-auto h-full flex flex-col items-center mt-10 mx-8 gap-16">
      <section className="flex flex-row items-center gap-2 h-full">
        <figure className="flex-1 h-full flex items-center w-auto justify-center gap-10">
          {/* <div className="w-[20%] h-full flex flex-col gap-2">
            <div className="bg-primaryLight/25 h-[94px] w-[94px]">foto 1</div>
            <div className="bg-primaryLight/25 h-[94px] w-[94px]">foto 2</div>
            <div className="bg-primaryLight/25 h-[94px] w-[94px]">foto 3</div>
            <div className="bg-primaryLight/25 h-[94px] w-[94px]">foto 4</div>
          </div> */}
          <img className="h-full" src={product.image} />
        </figure>
        <dl className="flex-1 flex flex-col p-7 w-auto h-auto bg-primaryLight/30 rounded-xl">
          <section className="flex flex-col w-full items-start ">
            <dt className="font-bebas text-2xl">{product.name}</dt>
            <dd className="font-montserrat mb-3">
              {" "}
              ⭐ ⭐ ⭐ ⭐ ⭐ { lengthReviews } opiniones
            </dd>
            <span className="font-montserrat font-medium text-primary text-2xl">
              ${product.price}
            </span>
          </section>
          <section className="flex items-center h-12 gap-2.5 mt-1">
            <figure className="flex px-3 py-2 items-center gap-2 font-bebas rounded-full border-solid border-2 border-black text-black">
              <button className="transition hover:scale-150 hover:text-primary px-2">
                -
              </button>
              1
              <button className="transition hover:scale-150 hover:text-primary px-2">
                +
              </button>
            </figure>
            <button className="addButton">AGREGAR</button>
          </section>
          <section className="flex flex-col py-2.5 gap-2.5 font-montserrat">
            <dd>
              {/* Es un producto muy bueno. Potencia musculos rapidamente y permite
              el desarrollo adecuado de los huesos, y el cuero cabelludo,
              saludable y nutritivo recomendado por terapeutas en todo el mundo. */}
              {product.description}
            </dd>
            <div>
              <dt className="font-bold text-xl">Detalles</dt>
              <ul className="list-disc">
                <li className="ml-5">
                  <span className="font-bold">Size: </span>
                  {product.size}
                </li>
                <li className="ml-5">
                  <span className="font-bold">Dosis: </span>
                  {product.dose}
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
      {/* comentarios */}
      <section className="flex flex-col h-48 w-full gap-8">
        <div className="flex items-center justify-center w-full px-10">
          <blockquote className="flex w-1/3 h-full gap-5 items-center px-4">
            <figure className="w-[82px] h-[82px] rounded-full bg-primaryLight"></figure>
            <dl className="flex flex-col  w-full">
              <dt className="font-bebas flex flex-col text-lg">
                User 1<span className="text-sm">⭐ ⭐ ⭐ ⭐ ⭐</span>
              </dt>
              <dd className="font-montserrat">
                Muy buen producto, llevo dos días usandolo y ya parezco Hulk
              </dd>
            </dl>
          </blockquote>
          <blockquote className="flex w-1/3 h-full gap-5 items-center px-4">
            <figure className="w-[82px] h-[82px] rounded-full bg-primaryLight"></figure>
            <dl className="flex flex-col w-full">
              <dt className="font-bebas flex flex-col text-lg">
                User 1<span className="text-sm">⭐ ⭐ ⭐ ⭐ ⭐</span>
              </dt>
              <dd className="font-montserrat ">
                Muy buen producto, llevo dos días usandolo y ya parezco Hulk
              </dd>
            </dl>
          </blockquote>
          <blockquote className="flex w-1/3 h-full gap-5 items-center px-4">
            <figure className="w-[82px] h-[82px] rounded-full bg-primaryLight"></figure>
            <dl className="flex flex-col  w-full">
              <dt className="font-bebas flex flex-col text-lg">
                User 1<span className="text-sm">⭐ ⭐ ⭐ ⭐ ⭐</span>
              </dt>
              <dd className="font-montserrat">
                Muy buen producto, llevo dos días usandolo y ya parezco Hulk
              </dd>
            </dl>
          </blockquote>
        </div>
        <button className="p-2 font-bebas text-xl text-primaryDark hover:text-tertiary transition">
          Ver más
        </button>
      </section>
      {/* destacados */}
      <section></section>
    </main>
  );
};
