import React from 'react';
import Head from "next/head"
import Link from 'next/link';

function Layout({children, title}){
    return (
        <div className='flex flex-col justify-between min-h-screen'>
            <Head>
                <title>{title ? title - "Store" :"Home Page,"}</title>
                <meta name="description" content="E-commerce website page" />

            </Head>
           <header>
           <nav className='flex justify-between px-4 items-center shadow-md h-12'>
            <Link href="">
                <a className='font-bold lowercase'>
                Amazona
                </a>
            </Link>
            <div className=''>
            <Link href='' >
             <a className='px-2 capitalize text-lg' >cart</a>
             </Link>
             <Link href='' >
             <a className='px-2 capitalize text-lg' >Login</a>
             </Link>
            </div>
           </nav>
           </header>
           <main className='container m-auto mt-4 p-4'>
            {children}
           </main>
           <footer className='flex justify-center items-center shadow-inner h-12'>
            <p className='text-center '>
            Copyright @ 20223 Amazona
            </p>
           </footer>
        </div>
    )
}

export default Layout