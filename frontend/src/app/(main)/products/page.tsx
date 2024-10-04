"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import ProductCart from "@/app/components/product-cart";
import axios from "axios";

const Products = () => {
  type Product = { name: string; price: number; image: string };
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
      <div className="grid grid-cols-4 px-12 gap-x-3 gap-y-7 my-4">
        {allProduct.map((product) => (
          <ProductCart
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
