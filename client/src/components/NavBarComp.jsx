import { NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { userAuth } from "../context/auth-context";
import { useDispatch, useSelector } from "react-redux";
import { LogoIcon, FavoriteIcon, UserIcon } from "../icons";
import { cleanFilters, cleanSorts, cleanSearch, getLogout } from "../store";
import CartButton from "./Cart/CartButton/CartButton";
import Cart from "./Cart/Cart";
import Order from "./Cart/Order";
import addCarrito from "../firebase/addCarrito";
import { BiLogOutCircle } from "react-icons/bi";
import logOutUser from "../firebase/logOut";
import ReviewsIcon from "../icons/ReviewsIcon";

export const NavBarComp = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth)
  console.log(user);

  const {
    currentUser,
    showCart,
    showOrder,
    setShowOrder,
    setShowCart,
    setCurrentUser,
    setProductsLocalStorage,
    setProducts,
    isRegistered,
  } = useContext(userAuth);
  console.log(isRegistered);

  const logOut = async () => {
    dispatch(getLogout());
    setCurrentUser(null);
    setProductsLocalStorage([]);
    setProducts([]);
  };

  useEffect(() => {
    currentUser && addCarrito(currentUser.uid);
  }, [currentUser]);

  const resetFilters = () => {
    dispatch(cleanFilters());
    dispatch(cleanSorts());
    dispatch(cleanSearch());
  };

  return (
    <>
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
            }
            onClick={resetFilters}>
            Productos
          </NavLink>
        </section>
        <section className="flex gap-2 w-[195px]">

          {
            !user.displayName ?
            <NavLink to={"auth/loginPage"}>
              <UserIcon
                className={
                  "w-10 transition fill-primaryDark hover:scale-125 hover:fill-primary"
                }
              />
            </NavLink> :
            <BiLogOutCircle
              onClick={logOut}
              style={{
                width: "19%",
                height: "19%",
                marginTop: "2.5%",
              }}
              className={
                "w-10 transition fill-primaryDark hover:scale-125 hover:fill-primary cursor-pointer"
              }
            />

          }
          

          {user.displayName && <ReviewsIcon />}

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
          {showCart && (
            <Cart setShowCart={setShowCart} setShowOrder={setShowOrder} />
          )}
          {showOrder && (
            <Order setShowOrder={setShowOrder} setShowCart={setShowCart} />
          )}
        </section>
      </nav>
    </>
  );
};
