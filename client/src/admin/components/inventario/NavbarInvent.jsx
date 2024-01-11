import style from "./NavbarInvent.module.css";
export default function NavbarInvent() {
  return (
    <nav>
      <div>
        <ul className={style.NavbarInvent}>
          <li className={style.products}>Productos</li>
          <li className={style.stock}>Stock</li>
          <li className={style.price}>Precio</li>
          <li className={style.actions}>Acciones</li>
        </ul>
      </div>
    </nav>
  );
}
