import { useDispatch, useSelector } from "react-redux";
import { addItems, removeCartItem } from "../store/slices/products/thunks";


export const ItemsAdded = ({ id, name, price, image, count }) => {
  // const { shoppingCart } = useSelector((state) => state.product);

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
        src={image}
        alt={name}
      />
      <div className="flex flex-col w-[60%] h-full">
        <h3>{name}</h3>
        <h2 className="font-bold text-lg">${price}</h2>
        <p className="bg-gray-200/70 px-2 rounded-lg w-11 flex flex-row justify-center items-center">
          x {count}
        </p>
        <div className="font-montserrat flex flex-row gap-4 pt-1">
          <button
            onClick={() => onAddItem(id)}
            className="px-2 rounded-lg border border-tertiary flex justify-center items-center h-7 text-tertiary hover:bg-tertiary hover:text-white"
          >
            add
          </button>
          <button
            onClick={() => onRemoveItem(id)}
            className="px-2 rounded-lg border border-primary flex justify-center items-center h-7 text-primary hover:bg-primary hover:text-white"
          >
            remove
          </button>
        </div>
      </div>
    </div>
  );
};
