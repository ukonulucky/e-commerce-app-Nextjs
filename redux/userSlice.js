import { createSlice } from "@reduxjs/toolkit";
// import Cookie from "json-cookie"

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: "",
    cart:
      typeof window !== "undefined" && localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [],
        shoppingAddress:
            typeof window !== "undefined" && localStorage.getItem("shippingAddress")
        ? JSON.parse(localStorage.getItem("shippingAddress"))
        : {
            location: {}
        },
    balance: 0,
    erorr: false,
    pending: null,
  },
  reducers: {
    addCart: (state, action) => {
      const itemIndex = state.cart.findIndex(
        (i) => i.slug === action.payload.slug
      );
      if (itemIndex >= 0) {
        const updatedOrder = {
          ...state.cart[itemIndex],
          quantity: state.cart[itemIndex].quantity + 1,
        };
        const data1 = state.cart.splice(itemIndex, 1, updatedOrder);
        localStorage.setItem("cart", JSON.stringify(data1));
        state.cart.splice(itemIndex, 1, updatedOrder);
      } else {
        const data2 = JSON.stringify([
          ...state.cart,
          {
            ...action.payload,
            quantity: 1,
          },
        ]);
        localStorage.setItem("cart", data2);
        state.cart = [
          ...state.cart,
          {
            ...action.payload,
            quantity: 1,
          },
        ];
      }
    },
    removeCart: (state, action) => {
      const updatedCart = state.cart.filter(
        (i) => i.slug !== action.payload.slug
      );
      state.cart = [...updatedCart];
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    reset: (state, action) => {
      return {
        ...state, 
        cart: [],
        userInfo:"",
        balance: 0,
        error:false,
        pending: false,
        paymentMethod:"",
        shoppingAddress:{
            location: {}
        }

      };
    },
    saveShippingAddress: (state, action) => {
        console.log("comig from store", action.payload)

           state.shoppingAddress.location = action.payload

           console.log("comig from store2", state.shoppingAddress.location)
           localStorage.setItem("shippingAddress", JSON.stringify(state.shoppingAddress))
    }
    ,
    updateQuntity: (state, action) => {
      const index = state.cart.findIndex((i) => i.slug === action.payload.slug);
      console.log(index);
      state.cart.splice(index, 1, action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const { addCart, removeCart, updateQuntity,reset, saveShippingAddress } = userSlice.actions;

export default userSlice.reducer;
