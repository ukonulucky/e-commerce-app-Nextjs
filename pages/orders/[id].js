import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
import { getError } from "../../utils/getError";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

function order() {
  const [{isPending}, paypalDispatch] = usePayPalScriptReducer()
  const { query } = useRouter();
  const orderId = query.id;
  const ACTIONTYPES = {
    FETCH_REQUEST: "FETCH_REQUEST",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONTYPES.FETCH_REQUEST:
        return {
          ...state,
          loading: true,
          error: "",
        };
        break;
      case ACTIONTYPES.FETCH_SUCCESS:
        return {
          ...state,
          loading: false,
          order: action.payload,
          error: "",
        };
        break;
      case ACTIONTYPES.FETCH_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        break;
      default:
        return state;
        break;
    }
  };
  const [{ loading, order, error }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  useEffect(() => {
    const fetDate = async () => {
      try {
        dispatch({
          type: ACTIONTYPES.FETCH_REQUEST,
        });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        console.log("data gotten", data);
        dispatch({ type: ACTIONTYPES.FETCH_SUCCESS, payload: data });
      } catch (error) {
        dispatch({
          type: ACTIONTYPES.FETCH_ERROR,
          payload: getError(error),
        });
      }
    };
    if (!order._id || order._id !== orderId) {
      fetDate();
    }else{
      const loadPayPalScript = async () => {
        const {data: clientId} = await axios.get("/api/keys/paypal")
        paypalDispatch({
          type:"resetOptions",
          value:{
            "client-id": clientId,
            currency:"USD"
          }
        })
        paypalDispatch({
          type:"setLoadingStatus",
          value: "pending"
        })

      }
      loadPayPalScript();
    }
  }, [order, orderId, paypalDispatch]);

  const {
    taxPrice,
    itemPrice,
    shippingPrice,
    totalPrice,
    shippingAddress,
    isDelivered,
    deliveredAt,
    paymentMethod,
    isPaid,
    orderItems,
  } = order;

  return (
    <div>
      <Head>
        <title>Order - {orderId}</title>
      </Head>
      {loading ? (
        <div> Loading....</div>
      ) : error ? (
        <div className="alert-error">{error} </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Shpping Address</h2>
              <div>
                {shippingAddress.fullName},{shippingAddress.address},{" "}
                {shippingAddress.city},{shippingAddress.postCode},{" "}
                {shippingAddress.country}
              </div>
              {isDelivered ? (
                <div className="alert-success">Delivered at {deliveredAt}</div>
              ) : (
                <div className="alert-error">Not delivered</div>
              )}
            </div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Payment Method</h2>
              <div>{paymentMethod}</div>
              {isPaid ? (
                <div className="alert-success">Paid at {paidAt}</div>
              ) : (
                <div className="alert-error">Not paid</div>
              )}
            </div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>
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
                  {orderItems.map((i) => (
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
            </div>
          </div>
          <div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Order Summary</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>items</div>
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
                {!isPaid && (
                  <li>
                    {isPending ? (
                      <div>Loadind...</div>
                    ) : (
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </div>
                    )}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
order.auth = true;

export default order;
