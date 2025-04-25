import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config";

export const fetchProducts = createAsyncThunk(
  "/products/fetchProducts",
  async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  }
);

export const fetchByCategory = createAsyncThunk(
  "/products/fetchByCategory",
  async (categoryId) => {
    const response = await axios.get(`${BASE_URL}/categories/${categoryId}/products`);
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "success";
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchByCategory.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchByCategory.fulfilled, (state, action) => {
      state.status = "success";
      state.products = action.payload;
    });
    builder.addCase(fetchByCategory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { filterBySearch } = productsSlice.actions;

export default productsSlice.reducer;
