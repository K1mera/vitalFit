import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openShopList } from "../store/slices/products/thunks";
import { useState } from "react";
import { OrderModal, ProcessOrder } from "./";
import { LogoIcon, FavoriteIcon, ShoppingCartIcon, UserIcon } from "../icons";
import CartButton from "./Cart/CartButton/CartButton";
import Cart from "./Cart/Cart";

export const NavBarComp = () => {
  const dispatch = useDispatch();

  const [showCart, setShowCart] = useState(false);
  const { orderWindow } = useSelector((state) => state.orders);
  const { shopListOpen, shoppingCart } = useSelector((state) => state.product);

  const onShopList = () => {
    if (shopListOpen !== false) return dispatch(openShopList(false));
    dispatch(openShopList(true));
  };

  return (
    <>
      {!shopListOpen ? "" : <OrderModal />}
      {!orderWindow ? "" : <ProcessOrder />}
      <nav className="flex w-full bg-primaryLight h-24 items-center py-5 px-10 justify-between">
        <LogoIcon className={"w-[34px] h-[69px] mr-[128px]"} />
        <section className="font-bebas flex gap-2 text-2xl">
          <NavLink
            to="home"
            className={({ isActive }) =>
              `hover:text-tertiary ${
                !isActive
                  ? "text-black"
                  : "text-primary underline decoration-primary underline-offset-4"
              }`
            }>
            Home
          </NavLink>
          <NavLink
            to="productsPage"
            className={({ isActive }) =>
              `hover:text-tertiary ${
                !isActive
                  ? "text-black"
                  : "text-primary underline decoration-primary underline-offset-4"
              }`
            }>
            Productos
          </NavLink>
          <NavLink
            to="training"
            className={({ isActive }) =>
              `hover:text-tertiary ${
                !isActive
                  ? "text-black"
                  : "text-primary underline decoration-primary underline-offset-4"
              }`
            }>
            Training
          </NavLink>
          <NavLink
            to="blog"
            className={({ isActive }) =>
              `hover:text-tertiary ${
                !isActive
                  ? "text-black"
                  : "text-primary underline decoration-primary underline-offset-4"
              }`
            }>
            Blog
          </NavLink>
          <NavLink
            to="asesorias"
            className={({ isActive }) =>
              `hover:text-tertiary ${
                !isActive
                  ? "text-black"
                  : "text-primary underline decoration-primary underline-offset-4"
              }`
            }>
            Asesorias
          </NavLink>
        </section>
        <section className="flex gap-2 w-[160px]">
          {/* // todo  */}
          {/* change the icon if the user is logged */}
          <NavLink to={"/loginPage"}>
            <UserIcon
              className={
                "w-10 transition fill-primaryDark hover:scale-125 hover:fill-primary"
              }
            />
          </NavLink>

          <FavoriteIcon
            className={
              "w-10 transition fill-primaryDark hover:scale-125 hover:fill-primary"
            }
          />
          {/*  <button onClick={() => onShopList()} className="relative">
            <ShoppingCartIcon
              className={
                "w-10 transition fill-primaryDark hover:scale-125 hover:fill-primary"
              }
            />
            <span className="absolute flex justify-center items-center w-5 h-5 text-xs top-0 right-[-4px] font-montserrat text-white bg-primary/90 rounded-full">
              {shoppingCart.length}
            </span>
          </button> */}
          <CartButton setShowCart={setShowCart} />
          {showCart && <Cart setShowCart={setShowCart} />}
        </section>
      </nav>
    </>
  );
};
