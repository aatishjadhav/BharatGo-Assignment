import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    showCartOffcanvas: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    
    },
    clearCart: (state) => {
      state.cart = [];
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      state.cart = state.cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      );
      
    },
    toggleCartOffcanvas: (state) => {
      state.showCartOffcanvas = !state.showCartOffcanvas;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCartOffcanvas } = cartSlice.actions;

export default cartSlice.reducer;
