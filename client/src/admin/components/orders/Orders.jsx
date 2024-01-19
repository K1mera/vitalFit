import React, { useEffect, useState } from "react";
import getAllBills from "../../../firebase/getAllBills";
import CardOrders from "./CardOrders";
import NavbarOrder from "./NavBarOrder";

const Orders = () => {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllBills();

      if (response) {
        const filtered = response.filter((e) => {
          return e.status !== "pending";
        });
        setOrders(filtered);
      }
    };
    fetchData();
    return () => fetchData();
  }, []);

  const arrayData = orders?.map((i) => {
    return i.data;
  });

  return (
    <div>
      <NavbarOrder />

      {orders &&
        orders.map((e, index) => (
          <div className="bg-white rounded mt-3">
            <CardOrders
              key={index}
              orderId={e.billNumber}
              arrayData={e.data}
              fecha={e.fecha}
              status={e.status}
            />
          </div>
        ))}
    </div>
  );
};

export default Orders;
