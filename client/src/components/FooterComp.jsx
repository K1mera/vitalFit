import { NavLink } from "react-router-dom";
import { LogoIconWhite } from "../icons"



export const FooterComp = () => {
  return (
    <footer className="flex w-full h-[250px] py-10 px-20 gap-20 bg-footerImg bg-no-repeat bg-cover ">
      <figure>
        <LogoIconWhite className={"w-[75px] h-[151px]"} />
      </figure>
      <section className="h-full">
        <h1 className="text-2xl font-bebas text-white">Sitio Web</h1>
        <ul className="text-white mt-2">
          <NavLink to={'/detail'}><li className="hover:text-primary cursor-pointer">Productos</li></NavLink>
          <li className="hover:text-primary cursor-pointer">Asesorías</li>
          <li className="hover:text-primary cursor-pointer">Ofertas</li>
          <li className="hover:text-primary cursor-pointer">Preguntas frecuentes</li>
          <li className="hover:text-primary cursor-pointer">Blog</li>
          <li className="hover:text-primary cursor-pointer">Contacto</li>
        </ul>
      </section>
      <section className="h-full text-white ">
        <h1 className="text-2xl font-bebas">Social Media</h1>
        <ul className="text-white mt-2">
          <li className="hover:text-primary cursor-pointer">Facebook</li>
          <li className="hover:text-primary cursor-pointer">Instagram</li>
          <li className="hover:text-primary cursor-pointer">Youtube</li>
          <li className="hover:text-primary cursor-pointer">TikTok</li>
        </ul>
      </section>
    </footer>
  );
}
