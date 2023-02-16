import { createSlice } from "@reduxjs/toolkit";
// import Cookie from "json-cookie"

const userSlice = createSlice({
  name: "user",
  initialState: {
    cart:
      typeof window !== "undefined" && localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [],
        shippingAddress:
            typeof window !== "undefined" && localStorage.getItem("shippingAddress")
        ? JSON.parse(localStorage.getItem("shippingAddress"))
        : {
            location: ""
        },
        paymentMethod: typeof window !== "undefined" && localStorage.getItem("paymentMethod")
        ? JSON.parse(localStorage.getItem("paymentMethod"))
        : "",
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

           state.shippingAddress.location = action.payload

           console.log("comig from store2", state.shippingAddress.location)
           localStorage.setItem("shippingAddress", JSON.stringify(state.shippingAddress))
    }
    ,
    updateQuntity: (state, action) => {
      const index = state.cart.findIndex((i) => i.slug === action.payload.slug);
      state.cart.splice(index, 1, action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    savePaymentMethod:(state, action) => {
     state.paymentMethod = action.payload
     localStorage.setItem("paymentMethod", JSON.stringify(state.paymentMethod));
    },
    clearCart : (state) => {
      console.log("clearCart ran")
           localStorage.removeItem("cart")
          state.cart = []
    }
  },
});

export const { clearCart, addCart, removeCart, updateQuntity,reset, saveShippingAddress, savePaymentMethod } = userSlice.actions;

export default userSlice.reducer;
