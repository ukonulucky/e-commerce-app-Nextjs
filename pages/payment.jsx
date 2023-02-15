import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import CheckoutWizard from '../components/CheckoutWizard'
import { savePaymentMethod } from '../redux/userSlice'

function payment() {
    const router = useRouter()
   const address=  useSelector(state => state.user.shippingAddress.location)
   const dispatch = useDispatch()
   const [selectedPaymentMethod , setSelectedPaymentMethod ] = useState("")
   const paymentMethod=  useSelector(state => state.user.paymentMethod)
   const submitHandler = (e) => {
    e.preventDefault()
    if(!selectedPaymentMethod){
        toast.warn( "Payment method is required" )
        return
    }
  dispatch(savePaymentMethod(selectedPaymentMethod))
    console.log('this is',selectedPaymentMethod)
    toast.success("payment  method successful")

   }
    
     useEffect(() => {
        if(!address){
            router.push("/shipping")
            return
        }
       setSelectedPaymentMethod(paymentMethod || "") 
     }, [])
     
  return (
    <div>
        <Head>
            <title>
                Payment
            </title>
        </Head>
        <CheckoutWizard activeStep={2} />
        <form className='mx-auto max-w-screen-md'
        onSubmit={submitHandler}>
            {
                ["Paypal",
            "Stripe","CashOnDelivery"].map(payment => (
                <div key={payment} className="mb-4">
                    <input 
                    type={"radio"}
                    id={payment}
                    checked={selectedPaymentMethod === payment}
                    onChange ={() => setSelectedPaymentMethod(payment)}
                    />
                    <label htmlFor={payment} className="p-2">
                        {payment}

                    </label>
                </div>
                
            ))
            }
            <div className='mb-4 flex justify-between'>
                <input
                type="button"
                onClick={() => router.push("/shipping")}
                className="default-button cursor-pointer"
                value={"Back"}
                />
            
                <button className='primary-button'>
                    Next
                </button>

            </div>


        </form>

    </div>
  )
}

export default payment