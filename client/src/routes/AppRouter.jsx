import { Navigate, Route, Routes, useLocation } from "react-router-dom";
<<<<<<< HEAD
import {
  Home,
  LoginPage,
  LoginUser,
  SingUpPage,
  DetailPage,
  Succesfull,
} from "../pages";
=======
import { Home, DetailPage } from "../pages";
>>>>>>> 19b93c0355968392be5c57af120a9f36ee8b7391

import { FooterComp, NavBarComp, ResetPassword } from "../components";

// import { Detail } from "../components/DetailCard/detail.jsx";

import ProductsPage from "../pages/ProductsPage";
import PreCheckout from "../pages/Pre-checkout/PreCheckout";

// import { Detail } from "../components/DetailCard/detail.jsx";

export const AppRouter = () => {
  // const location = useLocation();
  // const rutaActual = location.pathname;
  // const showNavBar =
  //   rutaActual !== "/loginPage" &&
  //   rutaActual !== "/signUpPage" &&
  //   rutaActual !== "/loginUser" &&
  //   rutaActual !== "/resetPass";

  return (
    <>
     <NavBarComp />

      <Routes>
        <Route path="home" element={<Home />} />
        {/* agreguen la ruta de las paginas que creen aquí abajo */}
        <Route path="/productspage" element={<ProductsPage />} />
        <Route path="/preCheckout" element={<PreCheckout />} />
        <Route path="checkout/successfull" element={<Succesfull />} />
        <Route path="/resetPass" element={<ResetPassword />} />
        <Route path="/detail" element={<DetailPage />} />
        
        <Route path="/*" element={<Navigate to="/home" />} />
        //
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
      <FooterComp />
    </>
  );
};
