export default function NavbarOrder() {
  return (
    <nav>
      <div className="font-bebas">
        <ul className="px-3 flex gap-2 w-full justify-center items-center ">
          <li className="w-[30%]">Ordenº</li>
          <li className="w-[30%]">Cantidad</li>
          <li className="w-[20%]">Total</li>
          <li className="w-[15%]">Fecha</li>
          <li className="w-[15%]">Estado</li>
        </ul>
      </div>
    </nav>
  );
}
