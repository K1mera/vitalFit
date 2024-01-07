import { LogoIconWhite } from "../icons"




export const FooterComp = () => {
  return (
    <footer className="flex w-full h-[340px] py-10 px-20 gap-20 bg-footerImg bg-no-repeat bg-cover ">
      <figure>
        <LogoIconWhite className={"w-[75px] h-[151px]"} />
      </figure>
      <section className="h-full">
        <h1 className="text-2xl font-bebas text-white">Sitio Web</h1>
        <ul className="text-white mt-2">
          <li className="hover:text-primary">Productos</li>
          <li className="hover:text-primary">Asesorías</li>
          <li className="hover:text-primary">Ofertas</li>
          <li className="hover:text-primary">Preguntas frecuentes</li>
          <li className="hover:text-primary">Blog</li>
          <li className="hover:text-primary">Contacto</li>
        </ul>
      </section>
      <section className="h-full text-white ">
        <h1 className="text-2xl font-bebas">Social Media</h1>
        <ul className="text-white mt-2">
          <li className="hover:text-primary">Facebook</li>
          <li className="hover:text-primary">Instagram</li>
          <li className="hover:text-primary">Youtube</li>
          <li className="hover:text-primary">TikTok</li>
        </ul>
      </section>
    </footer>
  );
}
