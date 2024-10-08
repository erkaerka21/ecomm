"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import ProductCart from "@/app/components/product-cart";
import { useUser } from "@/app/provider/user-provider";
import { useToast } from "@/hooks/use-toast";

export default function DetailProductPage() {
  const { toast } = useToast();
  const { user } = useUser();
  const [size, setSize] = useState(["XS", "S", "M", "L", "XL", "XXL"]);
  const [choosedSize, setChoosedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const params = useParams();
  // console.log(params, "params info iig harah");
  // const { id }: { id: string } = useParams();
  // console.log("url iin id iig harah", id);
  const params = useParams();
  const productId = params.id;
  const [productDetail, setProductDetail] = useState({
    name: "",
    price: 0,
    images: [""],
    isNew: true,
    description: "",
    size: "",
    discount: 0,
  });
  const [relatedProducts, setRelatedProducts] = useState([]);
  const getDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };
  const getProductPage = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/products/${params.id}`
      );
      setProductDetail(response.data.getOneProduct);
      setRelatedProducts(response.data.relatedProduct);
      console.log("tatah datag harag", response.data);
    } catch (error) {
      console.error("fetching products detail page is wrong", error);
    }
  };
  // const [intoCartData, setIntoCartData] = useState({});
  const createAndAddtoCart = async () => {
    try {
      const respo = await axios.post(`http://localhost:9000/api/v1/cart`, {
        userId: user?._id,
        productId: productId,
        quantity: quantity,
        size: choosedSize,
      });
      if (respo.status === 200) {
        return toast({
          description: "Та бүтээгдэхүүнээ амжилттай сагслаллаа.",
        });
      }
      // console.log("хэрэгтэй зүйлсийг харах : ", );
    } catch (error) {
      toast({
        variant: "destructive",
        description: "бүтээгдэхүүн сагслахад ямар нэгэн алдаа гарлаа",
      });
      console.error("бүтээгдэхүүн сагслахад ямар нэгэн алдаа гарлаа", error);
    }
  };
  useEffect(() => {
    getProductPage();
  }, []);
  console.log("хувцасны сонгосон размер хэмжээг харах", choosedSize);
  console.log("хувцасны сонгосон тоо хэмжээг харах", quantity);
  console.log("хэрэглэгчийн айдиг харах", user?._id);
  return (
    <div className="px-24 py-16">
      <div className="flex flex-row">
        <div className="grid grid-cols-1">
          {productDetail.images.map((image) => (
            <img
              src={image}
              className="rounded-2xl h-[10vh] w-full object-cover"
            />
          ))}
        </div>
        <div>
          <img src={productDetail.images[0]} className="rounded-2xl h-[80vh]" />
        </div>
        <div>
          <div>
            {productDetail.isNew === true && (
              <div className="text-sm font-bold border-2 border-blue-600 rounded-2xl px-[1vw] py-[0.5vh] text-center">
                ШИНЭ
              </div>
            )}
            {productDetail.isNew === false && (
              <div className="text-sm font-bold border-2 border-transparent rounded-2xl px-[1vw] py-[0.5vh] text-transparent">
                ХУУЧИН
              </div>
            )}
          </div>
          <div className="flex flex-row items-center">
            <p className="text-2xl font-bold">{productDetail.name}</p>
            <Heart className=" top-[2vh] right-[1.5vw]" />
          </div>
          <p>{productDetail.description}</p>
          <div>
            <p className="flex flex-row">Хэмжээний заавар</p>

            <div className="flex flex-row">
              {size.map((size) => (
                <p
                  className={`border-2 rounded-full p-2 btn ${
                    productDetail.size === size &&
                    `bg-slate-200 text-white border-slate-200`
                  }`}
                  id={size}
                  onClick={() => setChoosedSize(size)}
                >
                  {size}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-row items-center">
            <CiCircleMinus onClick={() => setQuantity(quantity - 1)} />
            {quantity}
            <CiCirclePlus onClick={() => setQuantity(quantity + 1)} />
          </div>
          <div>
            {getDiscountedPrice(productDetail.price, productDetail.discount)}₮
          </div>
          <Button
            className="bg-blue-600 h-8 rounded-2xl"
            onClick={createAndAddtoCart}
          >
            Сагсанд нэмэх
          </Button>
          <div
            className="
          flex flex-row"
          >
            <p>Үнэлгээ</p>
            <p className="text-blue-400 underline">бүгдийг харах</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-extrabold text-6xl">Холбоотой бараа</h1>
        <div className="grid grid-cols-4 px-12 gap-x-6 gap-y-12 my-4">
          {relatedProducts.map((relatedProduct: any) => (
            <ProductCart
              name={relatedProduct.name}
              price={relatedProduct.price}
              image={relatedProduct.images[0]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
