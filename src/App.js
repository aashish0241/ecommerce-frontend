import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Orderplace from "./components/Orderplace/Ortderplace";
import Admin from "./components/admin/admin";
import Createproduct from "./components/admin/createProduct/createproduct";
import Order from "./components/admin/order/order";
import Overview from "./components/admin/overview/overview";
import Productdetails from "./components/admin/productdetails/productdetails";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import ProductList from "./components/productdata/productdata";
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import { getLoginStatus } from "./redux/features/auth/authSlice";

// import "./react-toastify/dist/ReactToastify.css"; // Correct import path

// import  Spinner  from "./components/loading/Loader";

const App = () => {
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
        <ToastContainer />

        <Header />
        {/* <Spinner /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/createproduct" element={<Createproduct />} />
          <Route path="/productdetails" element={<Productdetails />} />
          <Route path="/order" element={<Order />} />
          <Route path="/orderplace" element={<Orderplace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
