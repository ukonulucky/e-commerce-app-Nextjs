
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";

function ProductItem({ product }) {
  return (
    <div className="card">
      <Link href={`/products/${product.slug}`}>
        <a >
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow block  w-full"
          />
        </a>
      </Link>
      <div className="flex items-center justify-center flex-col p-5">
        <Link href={`/products/${product.slug}`}>
          <a>
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button className="primary-button" type="button">
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(ProductItem, {
  ssr: false
}));
