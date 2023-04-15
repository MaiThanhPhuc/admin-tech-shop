import { Outlet, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import jwt from 'jwt-decode';

const PrivateRoute = () => {
  const auth = localStorage.getItem('access_token');
  const checkAuthAdmin = () => {
    if (auth === null) return false;
    const role = jwt(auth).role;
    if (role === 'adminSystem' || role === 'adminShop') return true;
    else return false;
  };

  return checkAuthAdmin() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
