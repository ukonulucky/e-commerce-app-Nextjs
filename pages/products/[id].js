import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCart } from '../../redux/userSlice'

import data from '../../utils/data'

function ProductScreen() {
    const router = useRouter()
 const { id } = router.query
 const dispatch  = useDispatch()  
 const cart = useSelector(state => state.user.cart)
 

 const productEle = data.products.find(i => i.slug === id)
const addToCart = (item) => {
const itemIndex = cart.findIndex(i => i.slug === item.slug)
console.log("this is the quantity",cart[itemIndex]?.quantity)
console.log("this is the countInStock",cart[itemIndex]?.countInStock)

if(parseFloat(cart[itemIndex]?.quantity) === parseFloat( cart[itemIndex]?.countInStock)){
  alert("Item not remaining in cart")
  router.push("/cart")
  return
}
     dispatch(addCart(item))
     router.push("/cart")

}
 
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
            <button className='primary-button w-full'
            onClick={
              () => addToCart(productEle)
            
            }>
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