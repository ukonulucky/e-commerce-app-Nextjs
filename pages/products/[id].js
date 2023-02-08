import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import data from '../../utils/data'

function ProductScreen() {
    const router = useRouter()
 const { id } = router.query

 const productEle = data.products.find(i => i.slug === id)

 
 const productComp = function(){
    console.log(productEle)
    if(productEle){
    return <div className='grid gap-4 grid-cols-1 md:grid-cols-4'>
        <div className='md:col-span-2'>
            <Image
            src={`/${productEle.image}`}
            alt={productEle.name}
            layout="responsive"
            width={640}
            height={640}
            />
        </div>
        <div>
            <ul>
                <li>
                    <h1 className='text-lg'>
                        {productEle.name}

                    </h1>
                </li>
                <li>
                  Category:  {productEle.category}
                </li>
              <li>
                Brand:  {productEle.brand}
              </li>
              <li>
                {productEle.rating} of {productEle.numReviews} reviews
              </li>
              <li>
                Description: {productEle.description} 
              </li>
            </ul>
        </div>
         <div className='card p-5'>
            <div className='mb-2 flex justify-between'>
              <div>
                Price 
              </div>
              <div>
                ${productEle.price}
              </div>
            </div>
            <div className='mb-2 flex justify-between'>
              <div>
                Status
              </div>
              <div>
                 {
                    productEle.countInStock > 0 ? "In Stock" : "Not in Stock"
                 }
              </div>
             
            </div>
            <button className='primary-button w-full'>
                Add to cart
              </button>
         </div>
        <div>

        </div>

    </div>

    } else{
        return <div>
            No Product Found
        </div>
    }
 }
 const productDisplay = productComp()
    
  return (
    <div>
    <Link href={"/"} >
       <a className='text-lg text-black
       font-bold'>
       back to products
       </a>
    </Link>
  {
    productDisplay
  }
    </div>
  )
}

export default ProductScreen