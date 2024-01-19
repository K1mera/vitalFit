
import { Link, useNavigate } from "react-router-dom";

const CardOrders = ({ orderId, arrayData, fecha, status, quantityItems }) => {
  const newOrder = orderId.slice(-6);
  console.log(arrayData);
  const navigate = useNavigate();

  const totalItems =
    arrayData.length > 1
      ? arrayData.reduce((t, item) => t + item.quantity, 0)
      : arrayData[0].quantity;

  const totalPay =
    arrayData.length > 1
      ? arrayData.reduce((t, item) => t + item.unit_price * item.quantity, 0)
      : arrayData[0].unit_price * arrayData[0].quantity;
  return (
    <Link to={`detail/${orderId}`} target="blank">
      <div className="p-4 font-montserrat transition hover:scale-[101%]">
        {/*   <span className="w-[30%]">#{newOrder}</span>
      <span className="w-[30%]">
        {totalItems}
        {totalItems > 1 ? "productos" : "producto"}
      </span>
      <span className="w-[20%]">_{totalPay}</span>
      <span className="w-[15%]">{fecha}</span>
      {status == "succesfull" && <span>Pendiente</span>}
      <button className="w-[15%]">Aceptar orden</button> */}
        <ul className="px-3 flex gap-2 w-full justify-center items-center ">
          <li className="w-[30%]">{newOrder}</li>
          <li className="w-[36%]">
            {totalItems} {totalItems > 1 ? "productos" : "producto"}
          </li>
          <li className="w-[23%]">{totalPay}</li>
          <li className="w-[20%]">{fecha}</li>
          <li
            className={
              status == "succesfull"
                ? "w-[13%] font-semibold text-red-500"
                : status == "accept"
                ? "w-[13%] font-semibold text-teal-600"
                : status == "send"
                ? "w-[13%] font-semibold text-orange-600"
                : "w-[13%] font-semibold text-green-600"
            }
          >
            {status == "succesfull"
              ? "Pendiente"
              : status == "accept"
              ? "Preparando"
              : status == "send"
              ? "En camino"
              : "Recibido"}
          </li>
        </ul>
      </div>
    </Link>
  );
};

export default CardOrders;
