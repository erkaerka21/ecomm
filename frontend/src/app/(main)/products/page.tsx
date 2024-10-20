"use client";
import React, { useEffect, useState } from "react";
import { ProductCart, SpecialProductCart } from "@/app/components/product-cart";
import axios from "axios";
import Link from "next/link";

const Products = () => {
  type Product = any;
  const [allProduct, setAllProduct] = useState<Product>([]);
  const getAllProduct = async () => {
    try {
      const respo = await axios.get(
        "http://localhost:9000/api/v1/products/all"
      );
      setAllProduct(respo.data.getAllProduct);
      console.log("all product", respo.data.getAllProduct);
    } catch (error) {
      console.error("fetch products data error", error);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  const getDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };
  return (
    <div>
      <Link href={`/detailproduct/${allProduct[21]?._id}`}>
        <div
          style={{
            backgroundImage: "url('/zurag1.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "70vh",
            position: "relative",
          }}
        >
          <div className="absolute bottom-10 left-40">
            <p className="text-4xl font-semibold mb-5">
              {allProduct[21]?.name}
            </p>
            <p className="text-7xl font-bold">{allProduct[21]?.price}₮</p>
          </div>
        </div>
      </Link>
      <div className="grid grid-cols-4 px-12 gap-x-6 gap-y-12 my-4">
        {allProduct?.map((product: any, index: any) => {
          return (
            <>
              {index === 6 || index === 7 ? (
                <Link
                  href={`/detailproduct/${product._id}`}
                  className="col-span-2 row-span-9"
                >
                  <SpecialProductCart
                    key={index}
                    name={product.name}
                    price={product.price}
                    image={product.images[0]}
                    id={product._id}
                    discount={product.discount}
                    priceWithDiscount={getDiscountedPrice(
                      product.price,
                      product.discount
                    )}
                  />
                </Link>
              ) : (
                <Link href={`/detailproduct/${product._id}`}>
                  <ProductCart
                    key={index}
                    name={product.name}
                    price={product.price}
                    image={product.images[0]}
                    id={product._id}
                    discount={product.discount}
                    priceWithDiscount={getDiscountedPrice(
                      product.price,
                      product.discount
                    )}
                  />
                </Link>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
