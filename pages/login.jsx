import React, { useEffect } from 'react'
import Head from "next/head"
import Link from 'next/link'
import {useForm} from "react-hook-form"
import { signIn, useSession } from "next-auth/react"
import { getError } from '../utils/getError'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

function Login() {
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
formState: {errors}

    } = useForm()
    const submitForm =async (data) => {
      try {
        console.log(data)
        
        const res = await signIn("credentials",{
            redirect:false,
            email: data.email,
            password: data.password
        })
        if(res.status !== 200){
            toast.error("invalid login credentials")
        }
      } catch (error) {
        toast.error(getError(error))
      }
    }
  return (
    <div className='w-full flex justify-center items-center'>
    <Head>
        <title>Login</title>
    </Head>
        <form className=' mx-auto max-w-screen-md w-full '
        onSubmit={handleSubmit(submitForm)}
        >
            <h1 className="mb-4 text-xl">
                Login
            </h1>
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
                <button className='primary-button'>
                    Login
                </button>
            </div>
            <div className="mb-4">
                Don&apos;t have an account? &nbsp;
                <Link  href={`/register?redirect=${redirect || "/"}`}>
                Register
                </Link>

            </div>


        </form>

    </div>
  )
}

export default Login