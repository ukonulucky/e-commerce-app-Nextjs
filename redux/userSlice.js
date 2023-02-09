import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState:{
        userInfo:"",
        cart : [],
        balance: 0,
        erorr: false,
        pending: null,
    },
    reducers: {
        addCart: (state, action) => {
            const itemIndex = state.cart.findIndex( i => i.slug === action.payload.slug)
            console.log(itemIndex)
            if(itemIndex >= 0){
                const updatedOrder = {
                    ...state.cart[itemIndex], quantity: state.cart[itemIndex].quantity + 1
                }
                state.cart.splice(itemIndex, 1, updatedOrder)
            }else{
                state.cart = [...state.cart, {
                    ...action.payload, quantity: 1
                }];
            }
   
        },
        removeCart:(state, action) => {
         const updatedCart =  state.cart.filter(i => i.slug !== action.payload.slug)
         state.cart = [...updatedCart]
        }
    },
   
})


export const {addCart, removeCart} = userSlice.actions

export default userSlice.reducer