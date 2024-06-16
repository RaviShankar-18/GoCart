import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: JSON.parse(localStorage.getItem("cartProducts")) || [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.data.push(action.payload);
      localStorage.setItem("cartProducts", JSON.stringify(state.data));
    },
    removeFromCart: (state, action) => {
      state.data = state.data.filter(
        (product) => product.id !== action.payload.id
      );
      localStorage.setItem("cartProducts", JSON.stringify(state.data));
    },

    loadCartData: (state) => {
      const savedCartData =
        JSON.parse(localStorage.getItem("cartProducts")) || [];
      state.data = savedCartData;
    },
  },
});

export const { addToCart, removeFromCart, loadCartData } = cartSlice.actions;
export default cartSlice.reducer;
