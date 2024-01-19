import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getAllBills from "../../firebase/getAllBills";
import { LogoIcon } from "../../icons";
import { Loading } from "../../components";
import { updateBillMP } from "../../firebase/updateBillMP";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(true);
  const [disabledAccept, setDisabledAccept] = useState(false);
  const [disabledSend, setDisabledSend] = useState(false);
  const [accept, setAccept] = useState(false);
  const [send, setSend] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const orders = await getAllBills();
      if (orders) {
        const filter = orders.filter((e) => e.billNumber == id);
        setOrder(filter[0]);
        setLoading(false);
      }
      return;
    };
    fetch();
  }, [id]);
  console.log(order);

  const handleAccept = async () => {
    const response = await updateBillMP(order.userData.id, order.billNumber, {
      status: "accept",
    });

    setDisabledAccept(true);
    setAccept(true);
  };
  const handleSend = async () => {
    const response = await updateBillMP(order.userData.id, order.billNumber, {
      status: "send",
    });

    setSend(true);
    setDisabledSend(true);
  };

  const totalPay =
    order && order.data.reduce((t, i) => t + i.quantity * i.unit_price, 0);
  console.log(totalPay);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className=" w-fit mx-auto my-5 font-montserrat p-8">
          <section className="flex items-center">
            <article className="">
              <LogoIcon className="w-20" />
            </article>
            <article className="mx-20">
              <h2>
                <span className="font-semibold">Orden Nº: </span>
                {id}
              </h2>

              <p>
                <span className="font-semibold">ID de pago: </span>
                {order.payment_id}
              </p>
              <p>
                <span className="font-semibold">Tipo de pago: </span>{" "}
                MercadoPago
              </p>
              <p>
                <span className="font-semibold">Fecha: </span>
                {order.fecha}
              </p>
            </article>
            <article>
              <p>
                <span className="font-semibold">Destinatario: </span>{" "}
                {order.userData.name}
              </p>
              <p>
                <span className="font-semibold">Email: </span>{" "}
                {order.userData.email}
              </p>
              <p>
                <span className="font-semibold">Teléfono: </span>{" "}
                {order.userData.telefono}
              </p>
              <p>
                <span className="font-semibold">Documento: </span>{" "}
                {order.userData.documento}
              </p>
            </article>
          </section>
          <section className="mt-8 mb-10">
            <h2 className="text-xl">Dirección</h2>
            <article className="grid grid-cols-2 indent-4">
              <p>
                <span className="font-semibold">Provincia: </span>{" "}
                {order.userData.provincia}
              </p>
              <p>
                <span className="font-semibold">Municipio: </span>{" "}
                {order.userData.municipio}
              </p>
            </article>
            <article className="grid grid-cols-2 indent-4 ">
              <p>
                <span className="font-semibold">Ciudad: </span>{" "}
                {order.userData.ciudad}
              </p>
              <p>
                <span className="font-semibold">Calle: </span>{" "}
                {order.userData.calle}
              </p>
            </article>
            <article className="grid grid-cols-2 indent-4">
              <p>
                <span className="font-semibold">Altura: </span>{" "}
                {order.userData.altura}
              </p>
              <p>
                <span className="font-semibold">Piso / Dpto: </span>
                {order.userData.pisoDpto ? order.userData.pisoDpto : ""}
              </p>
            </article>
          </section>
          <section>
            <section className="flex text-xl font-medium mb-5">
              <span className="w-[20%]">IMG</span>
              <span className="w-[50%]">Nombre producto</span>
              <span className="w-[15%]">Cant</span>
              <span className="w-[15%]">Precio unit</span>
            </section>
            {order.data &&
              order.data.map((p, index) => (
                <div
                  key={index}
                  className="flex items-center bg-slate-100 rounded mx-auto w-full">
                  <article className="w-[20%]">
                    <img src={p.picture_url} width={60} alt="" />
                  </article>
                  <article className="w-[50%]">
                    <span className="text-lg font-medium">{p.title}</span>
                  </article>
                  <span className="text-lg font-medium w-[15%]">
                    {" "}
                    X {p.quantity}
                  </span>
                  <article className="w-[15%]">
                    <span className="text-lg font-medium">
                      {" "}
                      ${p.unit_price}
                    </span>
                  </article>
                </div>
              ))}
          </section>
          <section>
            <article className="text-end mt-5 font-semibold text-xl">
              TOTAL: ${totalPay}
            </article>
          </section>
          <section className=" text-end mt-5">
            {order.status == "succesfull" && !disabledAccept ? (
              <button
                onClick={handleAccept}
                className="p-3 bg-primary text-white font-bebas text-xl rounded mt-5">
                Aceptar orden
              </button>
            ) : order.status == "accept" && !disabledSend ? (
              <button
                onClick={handleSend}
                className="p-3 bg-green-500 text-white font-bebas text-xl rounded mt-5">
                Marcar como enviada
              </button>
            ) : null}
          </section>
          <section>
            {accept ? (
              <p className="text-end font-medium text-lg text-teal-600">
                Orden en proceso!
              </p>
            ) : send ? (
              <p className="text-end font-medium text-lg text-teal-600">
                Productos en camino!
              </p>
            ) : null}
          </section>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
