"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DetailProductPage() {
  // const params = useParams();
  // console.log(params, "params info iig harah");
  // const { id }: { id: string } = useParams();
  // console.log("url iin id iig harah", id);
  const params = useParams();
  const [productDetail, setProductDetail] = useState({
    name: "",
    price: "",
    images: [""],
    isNew: true,
  });
  const getProductPage = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/products/${params.id}`
      );
      setProductDetail(response.data.getOneProduct);
      console.log("tatah datag harag", response.data);
    } catch (error) {
      console.error("fetching products detail page is wrong", error);
    }
  };
  useEffect(() => {
    getProductPage();
  }, []);
  return (
    <div>
      <div className="flex flex-row">
        <div></div>
        <div>
          <img src={productDetail.images[0]} />
        </div>
        <div>
          <div>
            {productDetail.isNew === true && (
              <div className="text-sm font-bold border-2 border-blue-600 rounded-2xl px-[1vw] py-[0.5vh]">
                ШИНЭ
              </div>
            )}
            {productDetail.isNew === false && <div></div>}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
