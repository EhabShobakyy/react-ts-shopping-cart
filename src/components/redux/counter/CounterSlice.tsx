import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  src: string;
}

export interface cartShoppingState {
  items: Record<number, CartItem>; // Store items with item id as the key
}

const initialState: cartShoppingState = {
  items: {},
};

export const counterSlice = createSlice({
  name: "cart-shopping",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const { id, name, price, src } = action.payload;
      if (state.items[id]) {
        state.items[id].quantity += 1; // Increment quantity if item exists
      } else {
        state.items[id] = { id, name, price, src, quantity: 1 }; // Add new item with quantity 1
      }
    },
    decrement: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      if (state.items[itemId]) {
        if (state.items[itemId].quantity > 1) {
          state.items[itemId].quantity -= 1; // Decrease quantity if greater than 1
        } else {
          delete state.items[itemId]; // Remove item from cart if quantity reaches 0
        }
      }
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
