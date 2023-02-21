import React, { useEffect } from 'react'
import Head from "next/head"
import Link from 'next/link'
import {useForm} from "react-hook-form"
import { signIn, useSession } from "next-auth/react"
import { getError } from '../utils/getError'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import axios from 'axios'

function SignUp() {
    const router = useRouter()
    const {redirect} = router.query
    const {data: session} = useSession()
 
    useEffect(() => {
  if(session?.user){
     router.push(redirect || "/")
  }
    },[ router, redirect,session])
    const {
handleSubmit,
register,
getValues,
formState: {errors}

    } = useForm({
        mode:"onTouched"
    })
    const submitForm =async (data) => {
      try {
        console.log(data)
        const createUser = await axios.post("/api/auth/signup", data)
        console.log("createdUser",createUser)
        const loginUser = await signIn("credentials",{
            redirect:false,
            email: data.email,
            password: data.password
        })
        if(loginUser.status !== 200){
            toast.error("invalid SignUp credentials")
        }
      } catch (error) {
        toast.error(getError(error))
      }
    }
  return (
    <div className='w-full flex justify-center items-center'>
    <Head>
        <title>Create Account</title>
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
                    Register
                </button>
            </div>
            <div className="mb-4">
                All ready have an account? &nbsp;
                <Link  href={`/login?redirect=${redirect || "/"}`}>
                Login
                </Link>

            </div>


        </form>

    </div>
  )
}

export default SignUp