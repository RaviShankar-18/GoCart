import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  getProductList,
  getproductListSuccess,
  getproductListFail,
} from "./ProductList.Slice";

function* getProductsListAction(action) {
  try {
    const response = yield call(axios.get, "https://dummyjson.com/products");
    const productList = yield response.data;
    if (!productList) {
      yield put(getproductListFail({ error: "Products List not loaded" }));
      return;
    }
    yield put(getproductListSuccess({ results: productList.products }));
  } catch (e) {
    yield put(getproductListFail({ error: "Products List not loaded" }));
  }
}

function* watchGetProductList() {
  yield takeEvery(getProductList, getProductsListAction);
}

export default watchGetProductList;
