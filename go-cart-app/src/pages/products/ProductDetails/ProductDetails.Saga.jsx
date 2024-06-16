import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  getProductDetails,
  getProductdetailsSuccess,
  getProductDetailsfail,
} from "./ProductDetails.Slice.jsx";

function* getProductDetailsAction(action) {
  try {
    const response = yield call(
      axios.get,
      `https://dummyjson.com/products/${action.payload.productId}`
    );
    const productDetails = yield response.data;
    console.log("ProductdetailsInfo", productDetails);
    if (!productDetails) {
      yield put(
        getProductDetailsfail({
          error: "Product Details not found",
        })
      );
    }

    yield put(
      getProductdetailsSuccess({
        results: productDetails,
      })
    );
  } catch (e) {
    yield put(getProductDetailsfail({ error: "Product Details not found" }));
  }
}

function* watchGetProductDetails() {
  yield takeEvery(getProductDetails, getProductDetailsAction);
}

export default watchGetProductDetails;
