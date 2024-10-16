"use client";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProductCart from "@/app/components/product-cart";
import { getDiscountedPrice } from "../shoppingcart/[user_id]/page";

const Categories = () => {
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  type categories = any;
  const [getCategories, setGetCategories] = useState<categories>([]);
  const getAllCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/v1/category/all"
      );
      setGetCategories(response.data.getAllCategory);
    } catch (error) {
      console.error("fetch category data error", error);
    }
  };
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
    getAllCategory();
    getAllProduct();
  }, []);
  return (
    <div className="flex flex-row">
      <div>
        <div>
          <h1>Ангилал</h1>
          <div>
            {getCategories.map((category: any) => (
              <div className="min-w-fit">
                <Checkbox />
                {category.name}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1>Хэмжээ</h1>
          <div>
            {sizes.map((size) => (
              <div>
                <Checkbox />
                {size}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-3 px-12 gap-x-6 gap-y-12 my-4">
          {allProduct.map((product: any) => (
            <Link href={`/detailproduct/${product._id}`} key={product._id}>
              <ProductCart
                name={product.name}
                price={product.price}
                image={product.images[0]}
                discount={product.discount}
                priceWithDiscount={getDiscountedPrice(
                  product.price,
                  product.discount
                )}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
