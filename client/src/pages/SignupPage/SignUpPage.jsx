import { LogoIcon } from "../../icons";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { validationForm } from "./validations";

export const SingUpPage = () => {
  const [handleForm, setHandleForm] = useState({
    nombre: "",
    dni: "",
    correo: "",
    contraseña: "",
    confirmarContraseña: "",
  });
  const [errors, setErrors] = useState({});

  const handleFormLogin = (event) => {
    const { name, value } = event.target;
    setHandleForm({
      ...handleForm,
      [name]: value,
    });
    setErrors(validationForm({ ...handleForm, [name]: value }));
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
          className="absolute top-40 z-20 justify-center"
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
            style={{ borderRadius: "10px", marginBottom: "10px" }}
            name="nombre"
            type="text"
            placeholder=" Nombre..."
            value={handleForm.nombre}
            onChange={handleFormLogin}
          ></input>
          {errors.nombre && <p className="text-red-400">{errors.nombre}</p>}
          <br />
          <label
            style={{
              fontFamily: "NuevaFuente, bebas neue",
              color: " #D9D9D9",
              fontSize: "1.5rem",
            }}
          >
            DNI
          </label>
          <br />
          <input
            className="w-full h-9"
            style={{ borderRadius: "10px", marginBottom: "10px" }}
            name="dni"
            type="text"
            placeholder=" DNI..."
            value={handleForm.dni}
            onChange={handleFormLogin}
          ></input>
          {errors.dni && <p className="text-red-400">{errors.dni}</p>}
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
            style={{ borderRadius: "10px", marginBottom: "10px" }}
            name="correo"
            type="text"
            placeholder=" Email..."
            value={handleForm.correo}
            onChange={handleFormLogin}
          ></input>
          {errors.correo && <p className="text-red-400">{errors.correo}</p>}
          <label
            style={{
              fontFamily: "NuevaFuente, bebas neue",
              color: " #D9D9D9",
              fontSize: "1.5rem",
              marginTop: "10px",
            }}
          >
            CONTRASEÑA
          </label>
          <input
            className="w-full h-9"
            style={{
              borderRadius: "10px",
              marginBottom: "10px",
            }}
            name="contraseña"
            type="password"
            placeholder=" Contraseña..."
            value={handleForm.contraseña}
            onChange={handleFormLogin}
          ></input>
          {errors.contraseña && (
            <p className="text-red-400">{errors.contraseña}</p>
          )}
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
            style={{ borderRadius: "10px", marginBottom: "10px" }}
            name="confirmarContraseña"
            type="password"
            placeholder=" Confirmar contraseña..."
            value={handleForm.confirmarContraseña}
            onChange={handleFormLogin}
          ></input>
          {errors.confirmarContraseña && (
            <p className="text-red-400">{errors.confirmarContraseña}</p>
          )}
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
              marginBottom: "15px",
              marginTop: "12px",
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
