import ProductDetailsSlice from "../pages/products/ProductDetails/ProductDetails.Slice";
import ProductListSlice from "../pages/products/ProductListing/ProductList.Slice";
import CartSlice from "../pages/products/Cart/Cart.Slice";
const reducer = {
  productListing: ProductListSlice,
  productDetails: ProductDetailsSlice,
  cartProducts: CartSlice,
};

export default reducer;
