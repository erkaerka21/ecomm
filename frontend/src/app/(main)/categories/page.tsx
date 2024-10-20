"use client";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ProductCart } from "@/app/components/product-cart";
import { getDiscountedPrice } from "../shoppingcart/page";

const Categories = () => {
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  type categories = any;
  const [getCategories, setGetCategories] = useState<categories>([]);
  // const [checkedItem, setCheckedItem] = useState([]);
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
  // const checkItemSize = (e: any) => {
  //   if (e.target.value.checked) {
  //     console.log("checked item size", e.target.value);
  //   }
  // };
  useEffect(() => {
    getAllCategory();
    getAllProduct();
  }, []);
  return (
    <div className="flex flex-row px-12 my-8 justify-between">
      <div className="w-full space-y-7">
        <div className="space-y-3">
          <h1 className="font-bold">Ангилал</h1>
          <div className="space-y-1">
            {getCategories.map((category: any) => (
              <div
                className="flex flex-row  space-x-1 items-center"
                key={category._id}
              >
                <Checkbox value={category.name} key={category.name} />
                <p>{category.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="font-bold">Хэмжээ</h1>
          <div className="space-y-1">
            {sizes.map((size) => (
              <div className="flex flex-row  space-x-1 items-center" key={size}>
                <Checkbox value={size} key={size} />
                <p>{size}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-3 gap-x-5 gap-y-10">
          {allProduct.map((product: any) => (
            <Link href={`/detailproduct/${product._id}`}>
              <ProductCart
                key={product._id}
                name={product.name}
                price={product.price}
                image={product.images[0]}
                discount={product.discount}
                priceWithDiscount={getDiscountedPrice(
                  product.price,
                  product.discount
                )}
                id={product.id}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
