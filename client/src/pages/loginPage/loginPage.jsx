import { LogoIcon } from "../../icons";
import { NavLink } from "react-router-dom";


export const LoginPage = () => {
  const infoEmail = (event) => {
    let infoEmail = event.target.value;
  };

  const infoPassword = (event) => {
    let infoPass = event.target.value;
  };

  return (
    <div className="relative ">
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
        className={"absolute top-20 right-11 text-4xl"}
      >
        ADMIN
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
            style={{ borderRadius: "10px", marginBottom: "25px" }}
            name="correo"
            type="text"
            placeholder=" Correo..."
            onChange={infoEmail}
          ></input>
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
            onChange={infoPassword}
          ></input>
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
          <NavLink to={"/signUpPage"}>
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
        </div>
      </div>
    </div>
  );
};


