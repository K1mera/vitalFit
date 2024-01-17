import { useState } from "react";
import { useDispatch } from "react-redux";
import { validationUser } from "./validations";

import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { loginWithEmailAndPass } from "../../firebase/providers";

import { LogoIcon } from "../../icons";
import { loginWithEmail, startGoogle } from "../../store/slices";
import emailjs from "emailjs-com";

export const LoginUser = () => {
  const [errors, setErrors] = useState({});
  const [login, setLogin] = useState({
    correo: "",
    contraseña: "",
  });

  const dispatch = useDispatch();

  const onGoogle = () => {
    dispatch(startGoogle());
  };

  const onCredentialsLogin = (user, pass) => {
    dispatch(loginWithEmail(user, pass));
  };

  const handleLogin = (event) => {
    const { name, value } = event.target;
    setLogin({
      ...login,
      [name]: value,
    });
    setErrors(validationUser({ ...login, [name]: value }));
  };

  const signUpWithPasswordAndEmail = async (e) => {
    e.preventDefault();

    try {
      const userLogin = await loginWithEmailAndPass(
        login.correo,
        login.contraseña
      );

      if (userLogin.ok === true) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: `Bienvenido ${userLogin.displayName}`,
        });
        setLogin({
          correo: "",
          contraseña: "",
        });

        const estructuraCorreo = {
          from_name: "Camila!",
          from_email: "cami562ggh@gmail.com",
          message: "Compra en proceso, esta todo preparado...",
        };
        
        const serviceID = "service_b7x0yxk";
        const templateID = "template_flad8yt";
        
        emailjs.init("NAmw66C0MvdblO1rC");
        
        emailjs
          .send(serviceID, templateID, estructuraCorreo, "NAmw66C0MvdblO1rC")
          .then((response) => {
            alert("¡Enviado!");
            console.log("Correo electrónico enviado con éxito:", response);
          })
          .catch((error) => {
            console.error("Error al enviar el correo electrónico:", error);
          });
        
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: `Usuario no encontrado, email o contraseña incorrectos`,
        });
      }
    } catch (error) {
      console.log(error.message, "mensaje");
    }
  };

  const validationFormLogin = () => {
    return (
      errors.correo || errors.contraseña || !login.correo || !login.contraseña
    );
  };

  return (
    <form onSubmit={signUpWithPasswordAndEmail} className="relative">
      <LogoIcon className={"w-[34px] h-[69px] absolute top-10 left-10"} />
      <div className="flex items-center justify-center h-screen overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="../src/icons/image-loginPage.jpeg"
        />
      </div>
      <NavLink to={"/loginPage"}>
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
      </NavLink>
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
            CORREO
          </label>
          <br />
          <input
            className="w-full h-9"
            style={{ borderRadius: "10px", marginBottom: "25px" }}
            name="correo"
            type="text"
            placeholder=" Correo..."
            value={login.correo}
            onChange={handleLogin}
          ></input>
          {errors.correo && <p className="text-red-400">{errors.correo}</p>}
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
            disabled={validationFormLogin()}
            onClick={signUpWithPasswordAndEmail}
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
          <NavLink to={"/resetPass"}>
            <h1
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "3%",
                fontFamily: "Nueva Fuente, montserrat",
                color: " #2FD6BD  ",
              }}
            >
              Olvidé mi contraseña
            </h1>
          </NavLink>
        </div>
      </div>
    </form>
  );
};
