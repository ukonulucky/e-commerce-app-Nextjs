import Head from "next/head";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { saveShippingAddress } from "../redux/userSlice";

export default function Shipping() {
    const dispatch = useDispatch()
    const handleSubmitHandler = (data) => {
        console.log(data)
      dispatch(saveShippingAddress(data))
    }
  const userAddress = useSelector(state => state.user.shoppingAddress.location)
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValue,
  } = useForm();

  const populateFormFields = () => {
       if(userAddress){
        setValue("fullName", userAddress.fullName)
        setValue("address", userAddress.address)
        setValue("city", userAddress.city)
        setValue("country", userAddress.country)
         setValue("postCode", userAddress.postCode)
       }
  }

  useEffect(() => {
        populateFormFields()
  }, [userAddress])


  return (
    <div>
      <Head>
        <title>Shipping Address</title>
      </Head>
      <CheckoutWizard activeStep={1} />
      <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(handleSubmitHandler)}>
        <h1 className="mb-4 text-xl">Shipping Address</h1>
       <div className="mb-4">
        <label htmlFor="fullName">Full Name</label>
       <input type="text"
         className="w-full" 
         id="fullName"
         {
            ...register("fullName",{
                required:"Please enter your name"
            })
         }
         />
         {
            errors?.fullName && (
                <div className="text-red-500">
                    {errors.fullName.message}
                </div>
            )
         }

       </div>
       <div className="mb-4">
        <label htmlFor="addres">Address</label>
       <input type="text"
         className="w-full" 
         id="address" 
         {
            ...register("address",{
                required:"Please enter your address",
                minLength:{
                    value:3,
                    message: "Adrress should be more than 2 characters long"
                }
            })
         }
         />
         {
            errors?.address && (
                <div className="text-red-500">
                    {errors.address.message}
                </div>
            )
         }

       </div>
       <div className="mb-4">
        <label htmlFor="city">City</label>
       <input type="text"
         className="w-full" 
         id="city"
         {
            ...register("city",{
                required:"Please enter your city"
            })
         }
         />
         {
            errors?.city && (
                <div className="text-red-500">
                    {errors.city.message}
                </div>
            )
         }

       </div>
       <div className="mb-4"> 
        <label htmlFor="fullName">Postal Code</label>
       <input type="text"
         className="w-full" 
         id="postCode"
         {
            ...register("postCode",{
                required:"Please enter your postal code"
            })
         }
         />
         {
            errors?.postCode && (
                <div className="text-red-500">
                    {errors.postCode.message}
                </div>
            )
         }

       </div>
       <div className="mb-4">
        <label htmlFor="country">Country</label>
       <input type="text"
         className="w-full" 
         id="country"
         {
            ...register("country",{
                required:"Please enter your country"
            })
         }
         />
         {
            errors?.country && (
                <div className="text-red-500">
                    {errors.country.message}
                </div>
            )
         }

       </div>
       <div className="mb-4 flex justify-between">
        <button className="primary-button"
        >Next</button>
       </div>
      </form>
    </div>
  );
}

Shipping.auth = true;



