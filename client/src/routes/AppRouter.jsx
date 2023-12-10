import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Home, LoginPage, LoginUser, SingUpPage } from "../pages";
import { NavBarComp } from "../components";

export const AppRouter = () => {
  const location = useLocation();
  const rutaActual = location.pathname;
  const showNavBar =
    rutaActual !== "/loginPage" &&
    rutaActual !== "/signUpPage" &&
    rutaActual !== "/loginUser";

  return (
    <>
      {showNavBar && <NavBarComp />}
      <div>
        <Routes>
          <Route path="home" element={<Home />} />
          {/* agreguen la ruta de las paginas que creen aquí abajo */}

          <Route path="/loginUser" element={<LoginUser />} />
          <Route path="/signUpPage" element={<SingUpPage />} />
          <Route path="/loginPage" element={<LoginPage />}></Route>
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </>
  );
};
