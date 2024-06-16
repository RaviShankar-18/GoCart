import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

const productDetailsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductDetails: (state, action) => {
      state.isLoading = true;
      state.data = null;
      state.error = null;
    },
    getProductdetailsSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload.results;
      state.error = null;
    },

    getProductDetailsfail: (state, action) => {
      state.isLoading = false;
      state.data = [];
      state.error = action.payload.error;
    },
  },
});

export const {
  getProductDetails,
  getProductdetailsSuccess,
  getProductDetailsfail,
} = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
