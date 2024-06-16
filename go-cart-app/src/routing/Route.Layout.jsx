import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductListing from "../pages/products/ProductListing/ProductList.Layout";
import ProductDetails from "../pages/products/ProductDetails/ProductDetails.Layout";
import CartLayout from "../pages/products/Cart/Cart.Layout";
import Search from "../components/header/Search";
import Navbar from "../components/header/Navbar";
import ShoppingCart from "../pages/products/Cart/ShoppingCart";
import FilterBrand from "../pages/products/ProductListing/FilterBrand";

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="view-product/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<CartLayout />} />
          <Route path="/search" element=<Search /> />
          <Route path="/navbar" element=<Navbar /> />
          <Route path="/shopping-cart" element=<ShoppingCart /> />
          <Route path="/filter-brand" element=<FilterBrand /> />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routing;
