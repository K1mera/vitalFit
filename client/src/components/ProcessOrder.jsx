import React from "react";
import { CloseIcon } from "../icons";
import { useDispatch, useSelector } from "react-redux";
import { ItemsCheckoutList } from "./ItemsCheckoutList";
import { finishOrder } from "../store/slices/orders/thunks";

export const ProcessOrder = () => {
  const dispatch = useDispatch();
  const { currentOrder, totalPriceOrder, orders } = useSelector(
    (state) => state.orders
  );

  const orderId = orders.length + 1;

  console.log(currentOrder);

  const onCloseOrder = (id, date, order, totalAmount) => {
    dispatch(finishOrder(id, date, order, totalAmount));
  };

  const today = new Date();
  const purchaseDate = {
    month: today.getMonth(),
    day: today.getDate(),
    year: today.getFullYear(),
  };

  const discount = (totalPriceOrder - (totalPriceOrder * 90) / 100).toFixed(2);
  const finalPrice = totalPriceOrder - discount;

  return (
    <aside className="sideMenuLayout font-montserrat">
      <section className="flex justify-between items-center ">
        <h2 className="font-bebas font-medium text-xl">Summary</h2>
        {/* <button>
          <CloseIcon
            className={
              "text-red-700/90 w-8 transition hover:scale-125 hover:text-red-600"
            }
          />
        </button> */}
      </section>
      <section className="flex flex-col gap-2 bg-white p-4 rounded-lg flex-1">
        {currentOrder.map((item) => (
          <ItemsCheckoutList
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            count={item.count}
            total={item.totalPriceAmt}
          />
        ))}
        <p className="flex justify-between">
          Delivery <span className="text-green-500 font-medium">Free</span>
        </p>
        <p className="flex justify-between">
          Discount<span className="font-regular">${discount}</span>
        </p>
      </section>
      <div className="bg-white h-16 flex justify-between items-center p-4 rounded-lg">
        <p className="font-bold text-xl">Total:</p>
        <span className="text-xl font-semibold">${finalPrice}</span>
      </div>
      <button
        className="bg-green-500 rounded-lg w-full py-3 text-white font-bold text-lg"
        onClick={() =>
          onCloseOrder(orderId, purchaseDate, currentOrder, finalPrice)
        }
      >
        Confirm and close
      </button>
    </aside>
  );
};
