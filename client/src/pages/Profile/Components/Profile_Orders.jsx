import React, { useContext, useEffect, useState } from "react";
import { userAuth } from "../../../context/auth-context";
import { getBillsByUser } from "../../../firebase/getBillsByUser";
import UserOrders from "../../../components/userOrders/UserOrders";
import DeliveryIcon from "../../../icons/DeliveryIcon";
import LoadingOrder from "../../../icons/LoadingOrder";

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
          if (billsByUser) setOrders(billsByUser);
          setLoading(false);
          return;
        }
      } catch (error) {}
    };
    fetchData();
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
        <p>Cargando...</p>
      ) : (
        <div className=" max-w-max mx-auto p-10 mt-16">
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
                          {i.data[0].title}
                          {i.data.length - 1 > 0 && (
                            <span>y {i.data.length - 1} productos más</span>
                          )}
                        </p>
                      </article>
                      <article className="text-slate-600 mb-1">
                        {i.fecha}
                      </article>
                      <article className="">
                        {i.status == "send" ? (
                          <div>
                            <DeliveryIcon className="mb-1 fill-primary w-10 " />
                            <p>Tu compra está en camino</p>
                          </div>
                        ) : i.status == "succesfull" ? (
                          <div className="flex text-sm">
                            <LoadingOrder className="mb-1 fill-primary w-6 " />
                            <p className="ml-3 text-slate-700">
                              Tu compra está en proceso
                            </p>
                          </div>
                        ) : null}
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
