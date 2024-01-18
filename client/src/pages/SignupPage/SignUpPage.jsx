import { LogoIcon } from "../../icons";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { validationForm } from "./validations";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";

import { useDispatch } from "react-redux";
import { startCreateUser, startGoogle } from "../../store";
import { registerUserBDD } from "../../firebase/registerUserBDD";

import bgImage from "/assets/image-loginPage.jpeg";




export const SingUpPage = () => {
  const dispatch = useDispatch();
  const [handleForm, setHandleForm] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    correo: "",
    contraseña: "",
    confirmarContraseña: "",
  });
  const [errors, setErrors] = useState({});


  const validationDisabledButton = () => {
    return (
      errors.nombre ||
      errors.apellido ||
      errors.dni ||
      errors.correo ||
      errors.contraseña ||
      errors.confirmarContraseña ||
      !handleForm.nombre ||
      !handleForm.dni ||
      !handleForm.correo ||
      !handleForm.contraseña ||
      !handleForm.confirmarContraseña
    );
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const displayName = handleForm.nombre + " " + handleForm.apellido;
      const userCredential = await dispatch(
        startCreateUser(handleForm.correo, handleForm.contraseña, displayName)
      );

      console.log(userCredential);

      if (userCredential.ok === true) {
        await registerUserBDD({
          role: "user",
          status: "active",
          id: userCredential.uid,
          email: userCredential.email,
          displayName: userCredential.displayName,
        });

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
          title: `Usuario creado con exito: ${userCredential.displayName} `,
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
          title: `Ups, ocurrio un error, intenta un nuevo email`,
        });
      }
    } catch (error) {
      console.log(error.message, "mensaje");
    }

    setHandleForm({
      nombre: "",
      apellido: "",
      dni: "",
      correo: "",
      contraseña: "",
      confirmarContraseña: "",
    });
  };

  const singInWithGooglePage = async (e) => {
    e.preventDefault();
    try {
      // const responseGoogle = new GoogleAuthProvider();
      const authWithGoogle = await dispatch(startGoogle());
      if (authWithGoogle.ok === false) {
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
          title: ` Upss! Ocurrio un error, intentalo más tarde`,
        });
      } else {
        return authWithGoogle;
      }
    } catch (error) {
      console.log(error.message, "mensaje");
    }
  };


  const handleFormLogin = (event) => {
    const { name, value } = event.target;
    setHandleForm({
      ...handleForm,
      [name]: value,
    });
    setErrors(validationForm({ ...handleForm, [name]: value }));
  };

  return (
    <form className=" h-[calc(100vh+35vh)]">
      <LogoIcon className={"w-[34px] h-[69px] absolute top-10 left-10"} />

      <div className="flex items-center justify-center h-full">
        <img className="w-full h-full object-cover object-center" src={bgImage} />
      </div>
  
      <div className="w-100% flex items-center justify-center">
        <div
          className="absolute top-20 z-20 justify-center"
          style={{
            background: "rgba(71, 81, 87, 0.8)",
            padding: "15px",
            borderRadius: "25px",
            boxShadow: "0 4px 6px rgba(10, 10, 10, 0.7)",
            width: "400px",
            marginTop: "3%",
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
              fontSize: "1.4rem",
            }}
          >
            APELLIDO
          </label>
          <br />
          <input
            className="w-full h-9"
            style={{ borderRadius: "10px", marginBottom: "10px" }}
            name="apellido"
            type="text"
            placeholder=" Apellido..."
            value={handleForm.apellido}
            onChange={handleFormLogin}
          ></input>
          {errors.apellido && <p className="text-red-400">{errors.apellido}</p>}
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
            disabled={validationDisabledButton()}
            onClick={submit}
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
          <button
            onClick={singInWithGooglePage}
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "19%",
              background: "#D74545",
              padding: "2.5%",
              borderRadius: "9px",
            }}
          >
            <FcGoogle />{" "}
            <span
              style={{
                marginLeft: "8px",
                fontFamily: "NuevaFuente, montserrat",
                color: "white",
              }}
            >
              Inicia sesión con Google
            </span>
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
          <NavLink to={"/auth/loginPage"}>
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
    </form>
  );
};
