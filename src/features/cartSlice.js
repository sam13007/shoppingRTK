import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : {
      productsInCart: [],
      totalProducts: 0,
      totalCost: 0,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const itemIndex = state.productsInCart.findIndex(
        (product) => product.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.productsInCart[itemIndex] = {
          ...state.productsInCart[itemIndex],
          quantity: state.productsInCart[itemIndex].quantity + 1,
        };
      } else {
        const item = { ...action.payload, quantity: 1 };
        state.productsInCart.push(item);
      }
      state.totalCost = state.productsInCart.reduce(
        (a, b) => (a += b.quantity * b.price),
        0
      );
      state.totalProducts += 1;
      toast.info(`${action.payload.name} added to cart`, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 500,
      });
      localStorage.setItem("products", JSON.stringify(state));
    },
    removeProduct: (state, action) => {
      state.productsInCart = state.productsInCart.filter(
        (product) => product.id !== action.payload.id
      );
      state.totalProducts -= action.payload.quantity;
      state.totalCost = state.productsInCart.reduce(
        (a, b) => (a += b.quantity * b.price),
        0
      );
      localStorage.setItem("products", JSON.stringify(state));
      toast.error(`${action.payload.name} removed from cart`, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 500,
      });
    },
    subtractProduct: (state, action) => {
      const itemIndex = state.productsInCart.findIndex(
        (product) => product.id === action.payload.id
      );
      state.productsInCart[itemIndex].quantity -= 1;
      if (state.productsInCart[itemIndex].quantity <= 0) {
        state.productsInCart = state.productsInCart.filter(
          (product) => product.id !== action.payload.id
        );
      }
      state.totalProducts = state.productsInCart.reduce(
        (a, b) => (a += b.quantity),
        0
      );
      state.totalCost = state.productsInCart.reduce(
        (a, b) => (a += b.quantity * b.price),
        0
      );
      toast.error(`${action.payload.name} removed from cart`, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 500,
      });
      localStorage.setItem("products", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.productsInCart = [];
      state.totalProducts = 0;
      state.totalCost = 0;
      toast.error(`Cart has been cleared`, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 500,
      });
      localStorage.setItem("products", JSON.stringify(state));
    },
  },
});

export default cartSlice.reducer;
export const { addProduct, removeProduct, subtractProduct, clearCart } =
  cartSlice.actions;
