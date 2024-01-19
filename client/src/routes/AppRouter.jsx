import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Home, DetailPage, Succesfull, Profile_Reviews } from "../pages";

import {
  FooterComp,
  NavBarComp,
  ResetPassword,
  CreateReview,
} from "../components";

// import { Detail } from "../components/DetailCard/detail.jsx";

import ProductsPage from "../pages/ProductsPage";
import PreCheckout from "../pages/Pre-checkout/PreCheckout";
import Profile_Orders from "../pages/Profile/Components/Profile_Orders";
import Profile_userReviews from "../pages/Profile/Components/Profile_userReviews";

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
        <Route path="/checkout/successfull" element={<Succesfull />} />
        <Route path="/reviews" element={<Profile_userReviews />} />
        <Route path="/resetPass" element={<ResetPassword />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/*" element={<Navigate to="/home" />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/createReviews" element={<Profile_Reviews />} />
        <Route path="/orders" element={<Profile_Orders />} />
      </Routes>
      <FooterComp />
    </>
  );
};
