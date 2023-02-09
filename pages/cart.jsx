import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {TiDeleteOutline} from "react-icons/ti"
import { removeCart } from "../redux/userSlice";

function cart() {
  const cart = useSelector((state) => state.user.cart);
     const dispatch = useDispatch()

     const removeProductHandler = (product) => {
        dispatch(removeCart(product))
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
                                    {i.quantity}
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
            <button className="primary-button min-w-full">
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
