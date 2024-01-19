import React, { useContext, useEffect, useState } from "react";
import { userAuth } from "../../../context/auth-context";
import { getBillsByUser } from "../../../firebase/getBillsByUser";
import UserOrders from "../../../components/userOrders/UserOrders";
import DeliveryIcon from "../../../icons/DeliveryIcon";
import LoadingOrder from "../../../icons/LoadingOrder";
import ProcessingIcon from "../../../icons/ProcessingIcon";
import { Loading } from "../../../components/Loading/Loading";
import CheckIcon from "../../../icons/CheckIcon";

const Profile_Orders = () => {
  const { currentUser } = useContext(userAuth);
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          const billsByUser = await getBillsByUser(currentUser?.uid);

          if (billsByUser) {
            const filtered = billsByUser.filter((e) => e.status !== "pending");
            setOrders(filtered);
          }
          setLoading(false);
          return;
        }
      } catch (error) {}
    };
    fetchData();

    return () => fetchData();
  }, [currentUser]);

  const handleOpenOrder = (order) => {
    setSelectedOrder(order);
    setShowOrders(true);
  };

  const handleCloseOrder = () => {
    setShowOrders(false);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className=" max-w-max mx-auto p-10 mt-4">
          <h2 className="text-3xl font-bebas mb-10 text-center">Tus compras</h2>
          <div className="mx-auto grid grid-cols-2">
            {orders &&
              orders.map((i, index) => (
                <section
                  key={index}
                  className="my-5 bg-stone-300 mx-10
                    p-5 font-montserrat font-medium rounded hover:cursor-pointer"
                  onClick={() => handleOpenOrder(i)}>
                  <div className="flex">
                    <article className="mr-10">
                      <img
                        src={i.data[0].picture_url}
                        width={120}
                        className="rounded"
                      />
                    </article>
                    <article>
                      <article className="text-slate-600 mb-1">
                        Compra #{i.billNumber.slice(-6)}
                      </article>
                      <article className="mb-1">
                        <p>
                          {i.data[0].title}{" "}
                          {i.data.length - 1 > 0 && (
                            <span>
                              y {i.data.length - 1}
                              {i.data.length == 2
                                ? " producto más"
                                : " productos más"}
                            </span>
                          )}
                        </p>
                      </article>
                      <article className="text-slate-600 mb-1">
                        {i.fecha}
                      </article>
                      <article className="">
                        {i.status == "send" ? (
                          <div className="flex text-sm items-center text-slate-700">
                            <DeliveryIcon className="mb-1 fill-primary w-10 " />
                            <p className="ml-3">Tu compra está en camino</p>
                          </div>
                        ) : i.status == "accept" ? (
                          <div className="flex text-sm items-center">
                            <ProcessingIcon className="mb-1  w-10" />

                            <p className="ml-3 text-slate-700">
                              Estamos preparando tu orden
                            </p>
                          </div>
                        ) : i.status == "received" ? (
                          <div className="flex text-sm items-center">
                            <CheckIcon className="mb-1 text-primary w-9 " />
                            <p className="ml-3 text-slate-700">
                              Indicaste que recibiste tu pedido!
                            </p>
                          </div>
                        ) : (
                          <div className="flex text-sm items-center">
                            <LoadingOrder className="mb-1 fill-primary w-9 " />
                            <p className="ml-3 text-slate-700">
                              Tu orden aún no ha sido procesada
                            </p>
                          </div>
                        )}
                      </article>
                    </article>
                  </div>
                </section>
              ))}
          </div>
          {showOrders && selectedOrder && (
            <div>
              <UserOrders
                setShowOrders={handleCloseOrder}
                fecha={selectedOrder.fecha}
                status={selectedOrder.status}
                products={selectedOrder.data}
                id={selectedOrder.billNumber}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile_Orders;

{
  /*  {orders &&
        orders.map((i, index) => (
          <div key={index}>
            <UserOrders
              fecha={i.fecha}
              status={i.status}
              products={i.data}
              id={i.billNumber}
            />
          </div>
        ))} */
}
