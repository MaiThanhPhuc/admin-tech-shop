import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import MainLayout from '../layout/MainLayout/MainLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import NotFound from '../pages/NotFound/NotFound';
import { ListProduct } from '../pages/Product/ListProduct';
import { AddProduct } from '../pages/Product/AddProduct';
import { DetailProduct } from '../pages/Product/DetailProduct';
import { ReportProduct } from '../pages/Product/ReportProduct';
import { AddUser } from '../pages/User/AddUser';
import { DetailUser } from '../pages/User/DetailUser';
import { ListUser } from '../pages/User/ListUser';
import { ReportUser } from '../pages/User/ReportUser';
import AddCategory from '../pages/Category/AddCategory';
import ListCategory from '../pages/Category/ListCategory';
import AddStore from '../pages/Store/AddStore';
const MyRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} exact />
            <Route path="/product">
              <Route path="add-product" element={<AddProduct />} exact />
              <Route path="detail-product/:id" element={<DetailProduct />} exact />
              <Route path="list-product" element={<ListProduct />} exact />
              <Route path="report-product" element={<ReportProduct />} exact />
            </Route>
            <Route path="/user">
              <Route path="add-user" element={<AddUser />} exact />
              <Route path="detail-user/:id" element={<DetailUser />} exact />
              <Route path="list-user" element={<ListUser />} exact />
              <Route path="report-user" element={<ReportUser />} exact />
            </Route>
            <Route path="/category">
              <Route path="add-category" element={<AddCategory />} exact />
              <Route path="list-category" element={<ListCategory />} exact />
            </Route>
            <Route path="/store">
              <Route path="add-store" element={<AddStore />} exact />
              <Route path="list-store" element={<ListCategory />} exact />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default MyRoutes;
