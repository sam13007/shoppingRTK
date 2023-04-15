import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: "",
  products: [],
};

export const asyncProduct = createAsyncThunk("user/fetchUser", async () => {
  const response = await axios.get("http://localhost:5000/products");
  return response.data;
});
const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(asyncProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(asyncProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(asyncProduct.rejected, (state, action) => {
      state.loading = false;
      state.products = action.error.message;
    });
  },
});

export default productSlice.reducer;
