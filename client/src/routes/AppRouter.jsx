import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages";
import { NavBarComp } from "../components";
import ProductsPage from '../components/productsPage/ProductsPage.jsx';

export const AppRouter = ( {items, filter, allItems}) => {
  return (
    <>
      <NavBarComp />
      <div>
        
        <Routes>
          <Route path="home" element={<Home />} />
          {/* agreguen la ruta de las paginas que creen aquí abajo */}
          <Route path='/productspage' element= {<ProductsPage items={items} filter={filter} allItems={allItems} />} />



          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </>
  );
};
