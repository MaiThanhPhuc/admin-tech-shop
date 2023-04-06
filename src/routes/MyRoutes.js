import {Routes, Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import MainLayout from "../layout/MainLayout/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import NotFound from "../pages/NotFound/NotFound";
import {User} from "../pages/User/User";
import {Product} from "../pages/Product/Product";
const MyRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} exact />
            <Route path="/user" element={<User />} exact />
            <Route path="/product" element={<Product />} exact />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default MyRoutes;
