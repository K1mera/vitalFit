import { LogoIcon } from "../../icons";
import { useState } from "react";
import { validationUser } from "./validations";

export const LoginUser = () => {
  const [errors, setErrors] = useState({});
  const [login, setLogin] = useState({
    usuario: "",
    contraseña: "",
  });

  const handleLogin = (event) => {
    const { name, value } = event.target;
    setLogin({
      ...login,
      [name]: value,
    });
    setErrors(validationUser({ ...login, [name]: value }));
  };

  return (
    <div className="relative">
      <LogoIcon className={"w-[34px] h-[69px] absolute top-10 left-10"} />
      <div className="flex items-center justify-center h-screen overflow-hidden">
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
        className={"absolute top-20 right-10 text-4xl"}
      >
        USUARIO
      </span>
      <div className="w-100% flex items-center justify-center">
        <div
          className="absolute top-1/4 z-20"
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
              fontSize: "1.5rem",
              marginBottom: "20px",
            }}
            className="text-lg font-bold text-64x43"
          >
            LOGIN
          </h1>

          <label
            style={{
              fontFamily: "NuevaFuente, bebas neue",
              color: " #D9D9D9",
              fontSize: "1.5rem",
            }}
          >
            USUARIO
          </label>
          <br />
          <input
            className="w-full h-9"
            style={{ borderRadius: "10px", marginBottom: "25px" }}
            name="usuario"
            type="text"
            placeholder=" Usuario..."
            value={login.usuario}
            onChange={handleLogin}
          ></input>
          {errors.usuario && <p className="text-red-400">{errors.usuario}</p>}
          <br />
          <label
            style={{
              fontFamily: "NuevaFuente, bebas neue",
              color: " #D9D9D9",
              fontSize: "1.5rem",
            }}
          >
            CONTRASEÑA
          </label>
          <br />
          <input
            className="w-full h-9"
            style={{ borderRadius: "10px", marginBottom: "25px" }}
            name="contraseña"
            type="password"
            placeholder=" Contraseña..."
            value={login.contraseña}
            onChange={handleLogin}
          ></input>
          {errors.contraseña && (
            <p className="text-red-400">{errors.contraseña}</p>
          )}
          <br />
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
            ENTRAR
          </button>
          <br />
        </div>
      </div>
    </div>
  );
};
