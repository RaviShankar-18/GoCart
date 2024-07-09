import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};
const productListSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductList: (state, action) => {
      state.isLoading = true;
      state.data = null;
      state.error = null;
    },
    getproductListSuccess: (state, action) => {
      (state.isLoading = false),
        (state.data = action.payload.results),
        (state.error = null);
    },
    getproductListFail: (state, action) => {
      (state.isLoading = false),
        (state.data = []),
        (state.error = action.payload.error);
    },
  },
});

export const { getProductList, getproductListSuccess, getproductListFail } =
  productListSlice.actions;
export default productListSlice.reducer;
