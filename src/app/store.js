import cartSlice from "../features/cartSlice";
import productSlice from "../features/productSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
  },
});

export default store;
