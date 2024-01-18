import style from "./NavbarInvent.module.css";
export default function NavbarInvent() {
  return (
    <nav>
      <div className="font-bebas">
        <ul className="px-3 flex gap-2 w-full justify-center items-center ">
          <li className="w-[calc(50%+50px)]">Productos</li>
          <li className="w-[10%]">Stock</li>
          <li className="w-[20%]">Precio</li>
          <li className="w-[15%]">Acciones</li>
        </ul>
      </div>
    </nav>
  );
}
