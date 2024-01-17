
import {Navigate, Route, Routes} from 'react-router-dom'
import {LoginPage, SingUpPage} from '../pages';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/signUpPage" element={<SingUpPage />} />
      <Route path="/loginPage" element={<LoginPage />} />

      <Route path="/*" element={<Navigate to='/auth/loginPage' />} />
    </Routes>
  );
}
