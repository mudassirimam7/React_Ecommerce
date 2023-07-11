
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProductIndex = state.cart.findIndex(product => product.id === action.payload.id);
      if (existingProductIndex >= 0) {
        state.cart[existingProductIndex].quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(product => product.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    incrementQuantity: (state, action) => {
      const existingProductIndex = state.cart.findIndex(product => product.id === action.payload.id);
      if (existingProductIndex >= 0) {
        state.cart[existingProductIndex].quantity++;
        state.cart[existingProductIndex].totalPrice += action.payload.price;
      }
    },
    decrementQuantity: (state, action) => {
      const existingProductIndex = state.cart.findIndex(product => product.id === action.payload.id);
      if (existingProductIndex >= 0) {
        const product = state.cart[existingProductIndex];
        if (product.quantity > 1) {
          product.quantity--;
          product.totalPrice -= action.payload.price;
        } else {
          state.cart = state.cart.filter(p => p.id !== product.id);
        }
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;