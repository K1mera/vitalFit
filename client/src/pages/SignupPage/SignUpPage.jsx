import { LogoIcon } from "../../icons";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export const SingUpPage = () => {
  const [handleForm, setHandleForm] = useState({
    nombre: "",
    id: "",
    correo: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  const handleFormLogin = (event) => {
    const { name, value } = event.target;
    setHandleForm({
      ...handleForm,
      [name]: value,
    });
  };

  return (
    <div className="relative">
      <LogoIcon className={"w-[34px] h-[69px] absolute top-10 left-10"} />
      <div className="flex items-center justify-center">
        <img
          className="w-full h-full object-cover"
          src="src/icons/image-loginPage.jpeg"
        />
      </div>
      <span
        style={{ fontFamily: "NuevaFuente, montserrat", color: "#D9D9D9" }}
        className={"absolute top-10 right-14 text-3xl"}
      >
        Soy
      </span>
      <span
        style={{ fontFamily: "NuevaFuente, bebas neue", color: "#D74545 " }}
        className={"absolute top-20 right-11 text-4xl"}
      >
        ADMIN
      </span>
      <div className="w-100% flex items-center justify-center">
        <div
          className="absolute top-40 z-20"
          style={{
            background: "rgba(71, 81, 87, 0.8)",
            padding: "15px",
            borderRadius: "25px",
            boxShadow: "0 4px 6px rgba(10, 10, 10, 0.7)",
            width: "400px",
          }}
        >
          <h1
            style={{
              fontFamily: "NuevaFuente, bebas neue",
              color: " #D9D9D9",
              fontSize: "1.4rem",
              marginBottom: "8px",
            }}
            className="text-lg font-bold text-64x43"
          >
            CREAR CUENTA
          </h1>

          <label
            style={{
              fontFamily: "NuevaFuente, bebas neue",
              color: " #D9D9D9",
              fontSize: "1.4rem",
            }}
          >
            NOMBRE
          </label>
          <br />
          <input
            className="w-full h-9"
            style={{ borderRadius: "10px", marginBottom: "25px" }}
            name="nombre"
            type="text"
            placeholder=" Nombre..."
            value={handleForm.nombre}
            onChange={handleFormLogin}
          ></input>
          <br />
          <label
            style={{
              fontFamily: "NuevaFuente, bebas neue",
              color: " #D9D9D9",
              fontSize: "1.5rem",
            }}
          >
            ID
          </label>
          <br />
          <input
            className="w-full h-9"
            style={{ borderRadius: "10px", marginBottom: "25px" }}
            name="id"
            type="text"
            placeholder=" ID..."
            value={handleForm.id}
            onChange={handleFormLogin}
          ></input>
          <br />
          <label
            style={{
              fontFamily: "NuevaFuente, bebas neue",
              color: " #D9D9D9",
              fontSize: "1.5rem",
            }}
          >
            CORREO
          </label>
          <input
            className="w-full h-9"
            style={{ borderRadius: "10px", marginBottom: "25px" }}
            name="correo"
            type="text"
            placeholder=" Email..."
            value={handleForm.correo}
            onChange={handleFormLogin}
          ></input>
          <label
            style={{
              fontFamily: "NuevaFuente, bebas neue",
              color: " #D9D9D9",
              fontSize: "1.5rem",
            }}
          >
            CONTRASEÑA
          </label>
          <input
            className="w-full h-9"
            style={{ borderRadius: "10px", marginBottom: "25px" }}
            name="contraseña"
            type="password"
            placeholder=" Contraseña..."
            value={handleForm.contraseña}
            onChange={handleFormLogin}
          ></input>
          <label
            style={{
              fontFamily: "NuevaFuente, bebas neue",
              color: " #D9D9D9",
              fontSize: "1.5rem",
            }}
          >
            CONFIRMAR CONTRASEÑA
          </label>
          <input
            className="w-full h-9"
            style={{ borderRadius: "10px", marginBottom: "25px" }}
            name="confirmarContraseña"
            type="password"
            placeholder=" Confirmar contraseña..."
            value={handleForm.confirmarContraseña}
            onChange={handleFormLogin}
          ></input>
          <button
            style={{
              fontFamily: "NuevaFuente, bebas neue",
              color: " #D9D9D9",
              fontSize: "1.2rem",
              background: "#D74545",
              padding: "6px",
              paddingLeft: "25px",
              paddingRight: "25px",
              borderRadius: "15px",
              marginBottom: "10px",
              marginLeft: "145px",
            }}
          >
            CREAR
          </button>
          <br />
          <span
            style={{
              fontFamily: "NuevaFuente, montserrat",
              color: " #D9D9D9",
              fontSize: "0.9rem",
              marginLeft: "80px",
            }}
          >
            Ya tienes cuenta?
          </span>
          <NavLink to={"/loginUser"}>
            <span
              style={{
                fontFamily: "NuevaFuente, montserrat",
                color: " #2FD6BD  ",
                marginLeft: "5px",
                fontSize: "0.9rem",
              }}
            >
              Inicia sesión.
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
