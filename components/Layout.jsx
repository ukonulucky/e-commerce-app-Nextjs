import React from 'react';
import Head from "next/head"

import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Header from './Header';

function Layout({children, title}){
   
    return (
        <Provider store={store}>
        <div className='flex flex-col justify-between min-h-screen'>
            <Head>
                <title>{title ? title - "Store" :"Home Page,"}</title>
                <meta name="description" content="E-commerce website page" />

            </Head>
           <header>
           <Header />
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
        </Provider>
    )
}

export default Layout