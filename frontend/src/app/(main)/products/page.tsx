"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import ProductCart from "@/app/components/product-cart";
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
  return (
    <div>
      <div>
        <img src="/zurag1.png" />
        hfhfhf
      </div>
      <div className="grid grid-cols-4 px-12 gap-x-6 gap-y-12 my-4">
        {allProduct.map((product: any) => (
          <Link href={`/detailproduct/${product._id}`} key={product._id}>
            <ProductCart
              name={product.name}
              price={product.price}
              image={product.images[0]}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
