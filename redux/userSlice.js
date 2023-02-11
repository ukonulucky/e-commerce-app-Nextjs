import { createSlice } from '@reduxjs/toolkit'
// import Cookie from "json-cookie"


const userSlice = createSlice({
    name: 'user',
    initialState:{
        userInfo:"",
        cart : typeof window !== 'undefined' && localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
        balance: 0,
        erorr: false,
        pending: null,
    },
    reducers: {
        addCart: (state, action) => {
            const itemIndex = state.cart.findIndex( i => i.slug === action.payload.slug)
            if(itemIndex >= 0){
                const updatedOrder = {
                    ...state.cart[itemIndex], quantity: state.cart[itemIndex].quantity + 1
                }
                const data1 = state.cart.splice(itemIndex, 1, updatedOrder)
               localStorage.setItem('cart', JSON.stringify(data1))
               state.cart.splice(itemIndex, 1, updatedOrder)
            }else{
                const data2 = JSON.stringify([...state.cart, {
                    ...action.payload, quantity: 1
                }])
                localStorage.setItem('cart',  data2)
                state.cart = [...state.cart, {
                    ...action.payload, quantity: 1
                }]
            }
   
        },
        removeCart:(state, action) => {
         const updatedCart =  state.cart.filter(i => i.slug !== action.payload.slug)
         state.cart = [...updatedCart]
         localStorage.setItem('cart',  JSON.stringify(state.cart))
        },
        updateQuntity: (state, action) => {
          const index = state.cart.findIndex(i => i.slug === action.payload.slug)
          console.log(index)
           state.cart.splice(index,1,action.payload)
           localStorage.setItem('cart',  JSON.stringify(state.cart))
        }
    },
   
})


export const {addCart, removeCart, updateQuntity} = userSlice.actions

export default userSlice.reducer