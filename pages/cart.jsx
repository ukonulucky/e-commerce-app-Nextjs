import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {TiDeleteOutline} from "react-icons/ti"
import { removeCart, updateQuntity } from "../redux/userSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import db from "../utils/db";
import productModel from "../models/Product";



  function cart({productServer}) {
    console.log("this is the product", productServer[0]?.countInStock)
  const router = useRouter()
  const cart = useSelector((state) => state.user.cart);
     const dispatch = useDispatch()

     const removeProductHandler = (product) => {
        dispatch(removeCart(product))
        toast.success("Product deleted successfully")
     }
     const handleQuantity =(product,newQuantity) => {
      const updatedProduct = {
        ...product,quantity:parseInt(newQuantity)
      } 
      if(updatedProduct.quantity > productServer[0]?.countInStock){
        toast.success("Product not available in stock")
        return
      }
      dispatch( updateQuntity(updatedProduct))

      toast.success("Product quantity update successful")
     }
  return (
    <div>
      <h3 className="text-xl font-bold capitalize mb-2">Shopping cart</h3>
      {
        cart.length > 0 ?
        <div className="grid md:grid-cols-4 gap-8">
        <div className="col-span-3">
          <table className="min-w-full ">
            <thead>
                <tr className="mb-4 border-b">
                    <td className="text-left text-xl font-bold">
                        Item
                    </td>
                    <td  className="text-right text-xl font-bold">
                        Quantity
                    </td>
                    <td  className="text-right text-xl font-bold">
                        Price
                    </td>
                    <td className="text-right text-xl font-bold">
                        Action
                    </td>
                   
                </tr>
            </thead>
            <tbody>
                {
                    cart.map((i) => (
                    
                             <tr key={i.slug} className="min-w-full ">
                                <td 
                                className="min-w-full
                                border-solid h-full py-4"
                                >
                                    <Image 
                                    src={`/${i.image}`}
                                    width= {50}
                                    height={50}
                                    alt={i.slug}
                                    />
                                </td>
                                <td className="font-bold text-right min-w-full h-full py-4"
                            
                                >
                                    <select name="" id="" value={i.quantity}
                                    
                                    onChange= {
                                      (e) => {
                                        handleQuantity(i, e.target.value)
                                      }
                                    }>
                                     {
                                     [... Array(i.countInStock).keys()].map((i,k)=> {
                                     return  <option value={i + 1} key={k}>
                                        {i + 1}
                                      </option>
                                     })
                                     }

                                    </select>
                                </td >
                                <td className="font-bold text-right min-w-full h- full py-4">
                                    {i.price}
                                </td>
                                <td className="font-bold   min-w-ful h-full py-4 ">
                                  <div className="cursor-pointer flex items-center justify-end text-3xl font-bold  pr-4   text-red-700" onClick={() => {
                                    removeProductHandler(i)
                                  }}>
                                  <TiDeleteOutline />
                                  </div>
                                </td>
                             </tr>

                    ))
                }
            </tbody>
          </table>
        </div>

        <div className="card md:min-w-full p-4">
           <p className="mb-3"><span className="font-bold text-lg">Subtotal</span>{"  "}({
            cart.length}): {"  "}${
            cart.reduce((acc, inc) => acc + (inc.price * inc.quantity),0 )}</p>
            <button className="primary-button min-w-full"
            onClick={() => {
              router.push("login?redirect=/shipping")
            }}>
                Check Out
            </button>
        </div>
      </div> :
        <p>No item present in cart</p>
      }

    </div>
  );
}

export default cart;

export const getServerSideProps = async (context) => {
     const { slug } = context.query
     await db.connect()
     const productServer = await productModel.find({
      slug
     }).lean()
     return {
   props:{
    productServer : productServer ? productServer.map(i => db.converDocToObject(i)) : null
   }
     }
     
}
