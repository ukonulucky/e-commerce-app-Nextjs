import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

function Header() {
    const cart = useSelector(state => state.user.cart)

 const totalItem = cart.reduce((acc, cur) => {
  return acc + cur.quantity
 }, 0)

  return (
    <div>
          <nav className='flex justify-between px-4 items-center shadow-md h-12'>
            <Link href="/">
                <a className='font-bold lowercase'>
                Amazona
                </a>
            </Link>
            <div className=''>
            <Link href='/cart' >
             <a className='px-2 capitalize text-lg' >
                cart
                <span className='ml-1 py-1 px-2 bg-red-600 rounded-full text-xs text-white font-bold'>{totalItem ? totalItem : 0}</span>
                </a>
             </Link>
             <Link href='login?redirect=/shipping' >
             <a className='px-2 capitalize text-lg' >Login</a>
             </Link>
            </div>
           </nav>
    </div>
  )
}

export default Header