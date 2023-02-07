import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"


export const registerUser = createAsyncThunk("user/register", async(user) => {
    console.log("code 1 ran")
    const res = await axios.post("http://localhost:7000/api/register",user, {
        withCredentials: true
    })
    console.log("this is the response", res.data)
    return res.data
})

export const loginUser = createAsyncThunk("user/login", async(user) => {
    const res = await axios.post("http://localhost:7000/api/login", user, {
        withCredentials: true
    })
    return res.data

})

export const withdraw = createAsyncThunk("user/withdraw", async (user) => {
    const res = await axios.post("http://localhost:7000/api/login", user, {
        withCredentials: true
    })
    return res.data
})


export const deposit = createAsyncThunk("user/deposit", async(user) => {
    const res = await axios.post("http://localhost:7000/api/login", user, {
        withCredentials: true
    })
    return res.data
})

const userSlice = createSlice({
    name: 'user',
    initialState:{
        userInfo:"",
        transactions : [],
        balance: 0,
        erorr: false,
        pending: null,
    },
    reducers: {
        addCart: (state, action) => {
            console.log("this is the addCart action", action)
      state.products = [...state.products, action.payload];
           state.total += action.payload.price * action.payload.quantity 
        },
        reset : (state) => {
             state = initialState
        },
       
    },
    extraReducers: {
        [registerUser.pending] : (state) => {
           state.pending = true
        },
        [registerUser.rejected] : (state, action) => {
            state.pending = null
            state.error = true

         }, 
         [registerUser.fulfilled] : (state, action) => {
            console.log("this is the action", action.payload )
            console.log("this is the state", state )
            state.error = false, 
            state.pending = null
            state.userInfo = action.payload
         }
    }
})


export const {addCart, reset} = userSlice.actions

export default userSlice.reducer