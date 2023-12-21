import { useDispatch, useSelector } from "react-redux";
import { addItems, removeCartItem } from "../store/slices/products/thunks";


export const ItemsAdded = ({ id, title, price, images, count }) => {
  // const { shoppingCart } = useSelector((state) => state.shop);

  const dispatch = useDispatch();

  const onRemoveItem = (item) => {
    dispatch(removeCartItem(item));
    // console.log(shoppingCart);
  };
  const onAddItem = (item) => {
    dispatch(addItems(item));
  };
  return (
    <div
      key={id}
      className="h-36 gap-4 bg-white rounded-lg flex justify-between items-center p-4"
    >
      <img
        className="w-[40%] rounded-lg h-full object-cover"
        src={images[0]}
        alt={title}
      />
      <div className="flex flex-col w-[60%] h-full">
        <h3>{title}</h3>
        <h2 className="font-bold text-lg">${price}</h2>
        <p className="bg-gray-200/70 px-2 rounded-lg w-11 flex flex-row justify-center items-center">
          x {count}
        </p>
        <div className="flex flex-row gap-4 pt-1">
          <button
            onClick={() => onAddItem(id)}
            className="px-2 rounded-lg border border-blue-600 flex justify-center items-center h-7 text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            add
          </button>
          <button
            onClick={() => onRemoveItem(id)}
            className="px-2 rounded-lg border border-red-600 flex justify-center items-center h-7 text-red-600 hover:bg-red-600 hover:text-white"
          >
            remove
          </button>
        </div>
      </div>
    </div>
  );
};
