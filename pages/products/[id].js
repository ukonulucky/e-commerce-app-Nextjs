import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import productModel from '../../models/Product'
import { addCart } from '../../redux/userSlice'

import db from '../../utils/db'

function ProductScreen({productEle}) {
  console.log("this is the product", productEle)
    const router = useRouter()
 const dispatch  = useDispatch()  
 const cart = useSelector(state => state.user.cart)
 

 
const addToCart = (item) => {
const itemIndex = cart.findIndex(i => i.slug === item.slug)

if(parseFloat(cart[itemIndex]?.quantity) === parseFloat( cart[itemIndex]?.countInStock)){
  toast.warning("Item not remaining in cart")
  router.push(`/cart?slug=${productEle[0].slug}`)
  return
}
     dispatch(addCart(item))
     router.push(`/cart?slug=${productEle[0].slug}`)

}
 
 const productComp = function(){
    if(productEle.length > 0){
   return productEle.map(i => {
   return <div className='grid gap-4 grid-cols-1 md:grid-cols-4' key={i.slug}>
    <div className='md:col-span-2'>
        <Image
        src={`/${i.image}`}
        alt={i.name}
        layout="responsive"
        width={640}
        height={640}
        />
    </div>
    <div>
        <ul>
            <li>
                <h1 className='text-lg'>
                    {i.name}

                </h1>
            </li>
            <li>
              Category:  {i.category}
            </li>
          <li>
            Brand:  {i.brand}
          </li>
          <li>
            {i.rating} of {i.numReviews} reviews
          </li>
          <li>
            Description: {i.description} 
          </li>
        </ul>
    </div>
     <div className='card p-5'>
        <div className='mb-2 flex justify-between'>
          <div>
            Price 
          </div>
          <div>
            ${i.price}
          </div>
        </div>
        <div className='mb-2 flex justify-between'>
          <div>
            Status
          </div>
          <div>
             {
                i.countInStock > 0 ? "In Stock" : "Not in Stock"
             }
          </div>
         
        </div>
        <button className='primary-button w-full'
        onClick={
          () => addToCart(i)
        
        }>
            Add to cart
          </button>
     </div>
    <div>

    </div>

</div>
   })

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

export async function  getServerSideProps(context) {
  await db.connect()
  const { id } = context.query
  const productItem = await productModel.find({
    slug: id
  }).lean()

  return {
    props:{
      productEle: productItem ? productItem.map(i => db.converDocToObject(i)) : null
    }
  }
  
}
export default ProductScreen