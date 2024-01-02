import { useState } from "react";
import { LogoIcon } from "../../icons";
import { NavLink } from "react-router-dom";
import { validationEmail } from "./validation";
import Swal from "sweetalert2";

export const ResetPassword = () => {
  const [correo, setCorreo] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [errors, setErrors] = useState("");

  const handleOnSubmit = (event) => {
    event.preventDefault();

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
      title: "Revisa tu correo",
    });

    setCorreo("");
    setIsSend(true);
  };

  const handlePass = (event) => {
    const value = event.target.value;
    setCorreo(value);
    setErrors(validationEmail(correo));
  };

  return (
    <form onSubmit={handleOnSubmit} className="relative">
      <LogoIcon className={"w-[34px] h-[69px] absolute top-10 left-10"} />
      <div className="flex items-center justify-center h-screen overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="src/icons/image-loginPage.jpeg"
        />
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
            alignItems: "center",
            marginTop: "6%",
          }}
        >
          <label
            style={{
              color: "#D9D9D9",
              fontFamily: "Nueva Fuente, bebas neue",
              fontSize: "1.6rem",
            }}
          >
            CORREO
          </label>
          <br />
          <input
            className="w-full h-8"
            style={{
              borderRadius: "10px",
            }}
            name="correo"
            value={correo}
            placeholder="  Aquí tu correo..."
            onChange={handlePass}
          ></input>
          {errors ? <p>{errors}</p> : null}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              marginTop: "5%",
            }}
          >
            {isSend ? (
              <NavLink to={"/loginUser"}>
                <button
                  style={{
                    background: "#D74545",
                    padding: "3%",
                    paddingRight: "4%",
                    paddingLeft: "4%",
                    fontFamily: "Nueva Fuente, bebas neue",
                    color: "#D9D9D9",
                    fontSize: "1.3rem",
                    borderRadius: "15px",
                  }}
                >
                  Volver al inicio de sesión
                </button>
              </NavLink>
            ) : (
              <button
                disabled={errors}
                type="submit"
                style={{
                  background: "#D74545",
                  padding: "3%",
                  paddingRight: "4%",
                  paddingLeft: "4%",
                  fontFamily: "Nueva Fuente, bebas neue",
                  color: "#D9D9D9",
                  fontSize: "1.3rem",
                  borderRadius: "15px",
                }}
              >
                {" "}
                Enviar{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};
