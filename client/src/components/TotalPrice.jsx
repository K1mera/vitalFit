
import { useDispatch, useSelector } from "react-redux";

import {processOrder, saveTotalPrice} from "../store/slices/orders/thunks";
import {cleanShoppingCart, handleShopList} from "../store";
// import {cleanShoppingCart, openShopList} from "../store/slices/shop/thunks";

export const TotalPrice = () => {
  const dispatch = useDispatch();

  const { shoppingCart } = useSelector((state) => state.product);

  const totalPriceAmt = shoppingCart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);

  const onPay = ( items ) => {
    dispatch(saveTotalPrice(totalPriceAmt))
    dispatch(processOrder(items))
    dispatch(cleanShoppingCart())
    dispatch(handleShopList(false))
  }

  return (
    <div className="z-50 h-16 w-full flex justify-between items-center rounded-lg bg-white px-6">
      <button
        className="font-semibold flex text-xl bg-green-500 text-white rounded-lg py-1 px-4 gap-6 justify-center items-center transition hover:scale-110 hover:shadow-md hover:shadow-green-500/70"
        onClick={() => onPay(shoppingCart)}
      >
        <h1 className="font-montserrat font-bold text-2xl flex justify-center items-center">Pay</h1>
      </button>
      <div className="flex gap-2 items-center">
        <h1 className="font-light text-2xl">Total:</h1>
        <span className="font-bold text-2xl bg-gray-400/40 rounded-lg py-1 px-3">
          ${totalPriceAmt}
        </span>
      </div>
    </div>
  );
};
