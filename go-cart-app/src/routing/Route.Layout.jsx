import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/header/Navbar";
import Search from "../components/header/Search";
import CartLayout from "../pages/products/Cart/Cart.Layout";
import ShoppingCart from "../pages/products/Cart/ShoppingCart";
import PaymentSuccess from "../pages/products/PaymentSuccess/PaymentSuccess";
import ProductDetails from "../pages/products/ProductDetails/ProductDetails.Layout";
import ProductListing from "../pages/products/ProductListing/ProductList.Layout";

const Routing = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ paddingTop: "70px" }}>
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="view-product/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<CartLayout />} />
          <Route path="/search" element={<Search />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Routing;
