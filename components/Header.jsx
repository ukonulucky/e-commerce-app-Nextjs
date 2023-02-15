import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Menu} from "@headlessui/react"
import DropdownLink from './DropdownLink'
import { reset } from '../redux/userSlice'




function Header() {

  const dispatch = useDispatch()
    const cart = useSelector(state => state.user.cart)

 const totalItem = cart.reduce((acc, cur) => {
  return acc + cur.quantity
 }, 0)

 const {status, data:session} = useSession()
 const handleLogOut = () => {
  console.log("handleLogOut ran")
  localStorage.removeItem("cart")
  dispatch(reset())

  signOut({
    callbackUrl:"/login"
  })
 }

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
             {
              status === "loading" ? 'Loading' : (
                session?.user.name ?
                <Menu as="div" className="relative inline-block">
                   <Menu.Button className="text-blue-600 outline-none">
                   {session.user.name}
                   </Menu.Button>
                   <Menu.Items  className="absolute origin-top-right bg-white right-0
                   w-56 shadow-lg outline-none">
                    <Menu.Item as="div" >
                      <DropdownLink href="/profile" className="dropdown-link">
                        Profile
                      </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                      <DropdownLink href="/order history" className="dropdown-link">
                        Order History
                      </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <a className='dropdown-link'
                        onClick={handleLogOut}
                        >
                          LogOut
                        </a>
                      </Menu.Item>
                     
                   
 
                   </Menu.Items>
                </Menu>
                : <Link href='login?redirect=/shipping' >
                <a className='px-2 capitalize text-lg' >Login</a>
                </Link>
              )
             }
            </div>
           </nav>
    </div>
  )
}

export default Header