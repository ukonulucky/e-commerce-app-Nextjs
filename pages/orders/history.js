import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import React, { useReducer, useEffect } from 'react'
import { getError } from '../../utils/getError';




function OrderHistory() {
  const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return {
                ...state, 
                loading: true,
                error:""
            }
        case "FETCH_SUCCESS":
            return {
                ...state, loading:false, order: [...action.payload], error:""
            }
            // break;
        case "FETCH_FAILURE":
            return {
                ...state, loading:false, error: action.payload
            }
            // break
    
        default: state
            break;
    }
}
  const [state, dispatch] = useReducer(reducer, { 
    loading: true,
    order: {},
    error: "",
  });



 useEffect(() => {
   const fetchOrders = async() => {
    
   try {
 
    dispatch({
        type:"FETCH_REQUEST"
    })
    const {data} = await axios.get("/api/orders/history")

      dispatch({
        type:"FETCH_SUCCESS",
        payload:data
      })
   
    
   } catch (error) {
    dispatch({
        type:"FETCH_ERROR",
        payload:getError(error)
    })
   }
   }
   fetchOrders()
 }, [])
console.log(state) 
 
  return (
    <div>
<Head>
Order History
</Head>
<h1>Order History</h1>
{
    state?.loading ? (
        <div className=""> Loading... </div>
    ) : (
        state?.error ? (
            <div className='alert-error'>{state.error}</div>
        ) : (
            <div className='overflow-x-auto'>
                <table className="min-w-full ">
                <thead>
                  <tr className="mb-4 border-b">
                    <td className="text-left text-xl font-bold">ID</td>
                    <td className="text-right text-xl font-bold">DATE</td>
                    <td className="text-right text-xl font-bold">TOTAL</td>
                    <td className="text-right text-xl font-bold">PAID</td>
                    <td className="text-right text-xl font-bold">DELIVERED</td>
                    <td className="text-right text-xl font-bold">ACTION</td>
                  </tr>
                </thead>
                <tbody>
                  {state?.order.map((i) =>
                ( 
                  <tr key={i._id} className="min-w-full ">
                      <td
                        className="min-w-full
                         border-solid h-full py-4"
                      >
                        {i._id.substring(0,10)}
                      </td>
                      
                      <td className="font-bold text-right min-w-full h-full py-4">
                        {i.isPaid ? `${i.paidAt.substring(0,10)}`: "Not paid"
                        }
                      </td>
                  
                      <td className="font-bold text-right min-w-full h-full py-4">
                        ${i.totalPrice}
                      </td>
                      <td className="font-bold text-right min-w-full h-full py-4 capitalize">
                        {i.isPaid ? `${i.isPaid}`: "Not paid"
                        }
                      </td>
                      <td className="font-bold text-right min-w-full h- full py-4">
                      {i.isDelivered ? `${i.deliveredAt.substring(0,10)}`: "Not delivered"
                        }
                      
                      </td>
                      <td className="font-bold text-right min-w-full h- full py-4">
                     <Link href={`/orders/${i._id}` }  passHref>
                        <a>
                            Details
                        </a>
                     </Link>
                      
                      </td>
                    </tr>
                  )
                )}
                </tbody>
              </table>

            </div>
        )
    )
}

    </div>
  )
}
 OrderHistory.auth = true
export default OrderHistory