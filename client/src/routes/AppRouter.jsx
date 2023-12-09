import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages";
import { NavBarComp } from "../components";


export const AppRouter = () => {
  return (
    <>
      <NavBarComp />
      <div>
        
        <Routes>
          <Route path="home" element={<Home />} />
          {/* agreguen la ruta de las paginas que creen aquí abajo */}



          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </>
  );
};
