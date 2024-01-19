import { LogoIcon } from "../../icons";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { validationUser } from "./validations";
import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import { loginWithEmail } from "../../store";
import getUsers from "../../store/slices/auth/getDocs";
import bgImage from "/assets/image-loginPage.jpeg";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  const [errors, setErrors] = useState({});
  const [login, setLogin] = useState({
    correo: "",
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

  const signUpWithPasswordAndEmail = async (e) => {
    e.preventDefault();

    try {
      const users = await getUsers();
      const findUser = users.find((user) => user.email === login.correo);

      if (findUser) {
        if (findUser.disabled) {
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
            title: `Usuario bloqueado, comunicate con soporte`,
          });
        } else {
          const userLogin = await dispatch(
            loginWithEmail(login.correo, login.contraseña)
          );

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
        }
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
    <form className="relative" onSubmit={signUpWithPasswordAndEmail}>
      <LogoIcon className={"w-[34px] h-[69px] absolute top-10 left-10"} />
      <div className="flex items-center justify-center h-screen overflow-hidden">
        <img className="w-full h-full object-cover" src={bgImage} />
      </div>

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
              marginBottom: "25px",
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
            style={{ borderRadius: "10px", marginBottom: "10px" }}
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
              marginTop: "10px",
            }}
          >
            CONTRASEÑA
          </label>
          <br />
          <input
            className="w-full h-9"
            style={{ borderRadius: "10px", marginBottom: "10px" }}
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
            
            type="submit"
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
              marginTop: "12px",
              marginLeft: "145px",
              cursor: "pointer",
            }}
            disabled={status === "checking"}
            className="disabled:opacity-70"
          >
            ENTRAR
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
            No tienes cuenta?
          </span>
          <NavLink to={"/auth/signUpPage"}>
            <span
              style={{
                fontFamily: "NuevaFuente, montserrat",
                color: " #2FD6BD  ",
                marginLeft: "5px",
                fontSize: "0.9rem",
              }}
            >
              Registrate.
            </span>
          </NavLink>
          <br />
          <NavLink to={"/auth/resetPass"}>
            <span
              style={{
                fontFamily: "NuevaFuente, montserrat",
                color: " #2FD6BD  ",
                marginLeft: "5px",
                fontSize: "0.9rem",
                marginLeft: "27.5%",
              }}
            >
              Olvide mi contraseña
            </span>
          </NavLink>
        </div>
      </div>
    </form>
  );
};
