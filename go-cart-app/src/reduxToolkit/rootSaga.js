import { all, fork } from "redux-saga/effects";
import watchGetProductList from "../pages/products/ProductListing/ProductList.Saga";
import watchGetProductDetails from "../pages/products/ProductDetails/ProductDetails.Saga";

export default function* rootSaga() {
  yield all([fork(watchGetProductList), fork(watchGetProductDetails)]);
}
