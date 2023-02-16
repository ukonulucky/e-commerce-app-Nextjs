import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CheckoutWizard from "../components/CheckoutWizard";
import { clearCart } from "../redux/userSlice";
import { getError } from "../utils/getError";

function placeorder() {
  const router = useRouter();
  const dispatch =  useDispatch();
  const productInfo = useSelector((state) => state.user);
  // the round2 function id is used to present a number in the decimal rounded format e.g 1235.656 == 1235.66
  const cartTotalAmount = productInfo.cart.reduce(
    (a, c) => a + c.quantity * c.price,
    0
  );
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemPrice = round2(cartTotalAmount);

  const shippingPrice = itemPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemPrice * 0.15);
  const totalPrice = round2(itemPrice + shippingPrice + taxPrice);

const [loading, setLoading] = useState(false)
const placeOrderHandler = async (state) => {
   try {
    const {data } = await axios.post("/api/orders", {
      orderItems: productInfo.cart,
      paymentMethod: productInfo.paymentMethod,
      shippingAddress: productInfo.shippingAddress.location,
      shippingPrice,
      itemPrice,
      taxPrice,
      totalPrice
    })
    setLoading(false)
    dispatch(clearCart())
    router.push(`api/orders/${data._id}`)

   } catch (error) {
    setLoading(false)
    toast.error(getError(error))
   }
}

  useEffect(() => {
    if (!productInfo.paymentMethod) {
      router.push("/payment");
    } 
  }, [productInfo.paymentMethod, router]);

  return (
    <div>
      <Head>
        <title>Place Order</title>
      </Head>
      <CheckoutWizard activeStep={3} />
      {productInfo.cart.length === 0 ? (
        <div>
          Cart is empty <Link href={"/"}>Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>
              <div>
                {productInfo.shippingAddress.location.fullName},
                {productInfo.shippingAddress.location.address},{" "}
                {productInfo.shippingAddress.location.city},
                {productInfo.shippingAddress.location.postCode},{" "}
                {productInfo.shippingAddress.location.country}
                <div>
                  <Link href={"/shipping"}>Edit</Link>
                </div>
              </div>
            </div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Payment Method</h2>
              <div>{productInfo.paymentMethod}</div>
              <div>
                <Link href="/payment">Edit</Link>
              </div>
            </div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg font-bolder">Order Items</h2>

              <table className="min-w-full ">
                <thead>
                  <tr className="mb-4 border-b">
                    <td className="text-left text-xl font-bold">Item</td>
                    <td className="text-right text-xl font-bold">Quantity</td>
                    <td className="text-right text-xl font-bold">Price</td>
                    <td className="text-right text-xl font-bold">Subtotal</td>
                  </tr>
                </thead>
                <tbody>
                  {productInfo.cart.map((i) => (
                    <tr key={i._id} className="min-w-full ">
                      <td
                        className="min-w-full
                         border-solid h-full py-4"
                      >
                        <Link href={`/products/${i.slug}`}>
                          <a className="flex items-center">
                            <Image
                              src={`/${i.image}`}
                              width={50}
                              height={50}
                              alt={i.slug}
                            />
                            &nbsp;
                            {i.name}
                          </a>
                        </Link>
                      </td>
                      <td className="font-bold text-right min-w-full h-full py-4">
                        {i.quantity}
                      </td>
                      <td className="font-bold text-right min-w-full h-full py-4">
                        {i.price}
                      </td>
                      <td className="font-bold text-right min-w-full h- full py-4">
                        {i.price * i.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link href={"/cart"}>Edit</Link>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <h2 className="mb-2 text-lg">Order Summary</h2>
            <ul>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Items</div>
                  <div>${itemPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Tax</div>
                  <div>${taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Shipping</div>
                  <div>${shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Total</div>
                  <div>${totalPrice}</div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <button
                    className="primary-button w-full"
                    disabled={loading}
                    onClick={placeOrderHandler}
                  >
                    {loading ? "Loading..." : "Place Order"}
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default placeorder;
placeorder.auth = true;
