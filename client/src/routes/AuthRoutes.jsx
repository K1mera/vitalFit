
import {Route, Routes} from 'react-router-dom'
import {LoginPage, LoginUser, SingUpPage} from '../pages';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/loginUser" element={<LoginUser />} />
      <Route path="/signUpPage" element={<SingUpPage />} />
      <Route path="/loginPage" element={<LoginPage />} />
    </Routes>
  );
}
