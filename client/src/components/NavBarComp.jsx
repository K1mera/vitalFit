import { NavLink } from "react-router-dom";

import { LogoIcon, FavoriteIcon, ShoppingCartIcon, UserIcon } from "../icons";

export const NavBarComp = () => {
  return (
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
          }
        >
          Home
        </NavLink>
        <NavLink
          to="products"
          className={({ isActive }) =>
            `hover:text-tertiary ${
              !isActive
                ? "text-black"
                : "text-primary underline decoration-primary underline-offset-4"
            }`
          }
        >
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
          }
        >
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
          }
        >
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
          }
        >
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
        <ShoppingCartIcon
          className={
            "w-10 transition fill-primaryDark hover:scale-125 hover:fill-primary"
          }
        />
      </section>
    </nav>
  );
};
