import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getError } from '../utils/getError'

function Profile() {
    const {data: session} = useSession() 

const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: {errors}
} = useForm()

const submitForm = async({name, email, password}) =>{
    try {
        await axios.put("/api/auth/update",{
            name,
            email,
            password
        })

const result = await signIn("credentials", {
    redirect:false,
    email,
    password
})

if(result.error)
{
 toast.error(result.error.message)
 return
}
toast.success("Profile updated successfully")
    } catch (error) {
        console.log(error.response.data.message)
        toast.error(
            getError(error)
        )
    }
}

useEffect(() => {
    console.log(session)
  setValue("name", session.user.name)
  setValue("email", session.user.email)



}, [session.user, setValue])


  return (
    <div className='w-full flex justify-center items-center'>
    <Head>
        <title>Update Profile</title>
    </Head>
        <form className=' mx-auto max-w-screen-md w-full '
        onSubmit={handleSubmit(submitForm)}
        >
            <h1 className="mb-4 text-xl">
                Create Account
            </h1>
            <div className="mb-4 mx-auto">
                <label htmlFor="email">Name</label>
              <div className="mb-2">
              <input type="text" name="name" id="name" autoFocus className='block  w-2/3'
              {...register("name", {
                required: "Name field is required",
              })}
              />
              </div>
              {errors.name && 
              <div className='text-red-600'>
                {errors.name.message}
              </div>
                }
            </div>
            <div className="mb-4 mx-auto">
                <label htmlFor="email">Email</label>
              <div className="mb-2">
              <input type="email" name="email" id="email" className='block  w-2/3'
              {...register("email", {
                required: "Email field is required",
                pattern:{
                    value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                    message: "Please enter a valid email"
                }
              })}
              />
              </div>
              {errors.email && 
              <div className='text-red-600'>
                {errors.email.message}
              </div>
                }
            </div>
            <div className="mb-4"> 
                <label htmlFor="password">Password</label>
                <div className='mb-2'>
                <input type="password" name="password" id="password" className='w-2/3 block' 
                {
                    ...register("password", {
                        required:"Password is required",
                        minLength:{
                            value:6,
                            message:"Password must be more then 5 characters long",
                        }
                    })
                }
                />
        
                </div>
                {errors.password && 
                    <div className='text-red-600'>
                    {
                        errors.password.message
                    }
                    </div>
                }
            </div>
            <div className="mb-4"> 
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className='mb-2'>
                <input type="password" name="confirmPassword" id="confirmPassword" className='w-2/3 block' 
                {
                    ...register("confirmPassword", {
                        required:"Password does not match",
                        validate: (value) => value === getValues("password") || "Password does not match" ,
                        minLength:{
                            value:6,
                            message:"Password must be more then 5 characters long",
                        }
                    })
                }
                />
        
                </div>
                {errors.confirmPassword && 
                    <div className='text-red-600'>
                    {
                        errors.confirmPassword.message
                    }
                    </div>
                }
                
            </div>
            <div className="mb-4">
                <button className='primary-button'>
                    Update Profile
                </button>
            </div>
            


        </form>

    </div>
  )
}
Profile.auth = true
export default Profile