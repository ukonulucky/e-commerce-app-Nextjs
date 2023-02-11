import React from 'react'
import Head from "next/head"
import Link from 'next/link'
import {useForm} from "react-hook-form"

function login() {
    const {
handleSubmit,
register,
formState: {errors}

    } = useForm()
    const submitForm = (email,password) => {
  console.log(email, password)
    }
  return (
    <div>
    <Head>
        <title>Login</title>
    </Head>
        <form className='mx-auto max-w-screen-md  border-red-500 '
        onSubmit={handleSubmit(submitForm)}
        >
            <h1 className="mb-4 text-xl">
                Login
            </h1>
            <div className="mb-4">
                <label htmlFor="email">Email</label>
              <div className="mb-2">
              <input type="email" name="email" id="email" className='block  w-1/2'
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
                <input type="password" name="password" id="password" className='w-1/2 block' 
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
                <Link  href="register">
                Register
                </Link>

            </div>


        </form>

    </div>
  )
}

export default login