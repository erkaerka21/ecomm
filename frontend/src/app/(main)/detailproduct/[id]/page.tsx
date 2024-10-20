"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { ProductCart } from "@/app/components/product-cart";
import { useUser } from "@/app/provider/user-provider";
import { useToast } from "@/hooks/use-toast";
import { useMyCard } from "@/app/provider/card-provider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import CreateReview from "@/app/components/create-review";
import ReviewTable from "@/app/components/review-table";
import { Table, TableBody } from "@/components/ui/table";
import { Rate } from "antd";
import _ from "lodash";

export default function DetailProductPage() {
  const [isOpen, setIsOpen] = React.useState(false);
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
  const [size, setSize] = useState(["XS", "S", "M", "L", "XL", "XXL"]);
  const [choosedSize, setChoosedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [getReviews, setGetReviews] = useState([
    { user: {}, product: "", reviewPoint: "", comment: "" },
  ]);
  const { fetchCard } = useMyCard();
  const { toast } = useToast();
  const { user } = useUser();
  // const params = useParams();
  // console.log(params, "params info iig harah");
  // const { id }: { id: string } = useParams();
  // console.log("url iin id iig harah", id);
  const params = useParams();
  console.log("getone productiin detail --- pramsiig harah", params);
  const productId = params.id;

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
      console.log("tatah datag harag", response.data.relatedProduct);
    } catch (error) {
      console.error("fetching products detail page is wrong", error);
    }
  };
  // const [intoCartData, setIntoCartData] = useState({});
  const createAndAddtoCart = async () => {
    try {
      const respo = await axios.post(`http://localhost:9000/api/v1/cart/add`, {
        userId: user?._id,
        productId: productId,
        quantity: quantity,
        size: choosedSize,
      });
      if (respo.status === 200) {
        await fetchCard();

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
  const perTotalPrice = (a: number, b: number) => {
    return a * b;
  };
  const readReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/review/read-review/${params.id}`
      );
      setGetReviews(response.data.getReview);
    } catch (error) {
      console.error("fetching products review is wrong", error);
    }
  };
  const niilberRate = _.sum(getReviews.map((review) => review.reviewPoint));
  console.log("niilber ratiig harah", niilberRate);
  const niitRatiinToo = getReviews.length;
  console.log("niit ratiig harah", niitRatiinToo);
  const dundajRating = (ratinguudSum: number, ratiinToo: number) => {
    return ratinguudSum / ratiinToo;
  };
  console.log(
    "dundaj ratingiig harah:",
    dundajRating(
      _.sum(getReviews.map((review) => review.reviewPoint)),
      getReviews.length
    )
  );
  const starRating = dundajRating(
    _.sum(getReviews.map((review) => review.reviewPoint)),
    getReviews.length
  );
  console.log("dundaj rating", starRating);
  // const [starRating, setStarRating] = useState(Number);
  // setStarRating(
  //   dundajRating(
  //     _.sum(getReviews.map((review) => review.reviewPoint)),
  //     getReviews.length
  //   )
  // );
  useEffect(() => {
    getProductPage();
    readReviews();
  }, []);
  return (
    <div className="px-24 py-16">
      <div className="flex flex-row gap-x-6">
        <div className="h-[90vh] w-[10%] grid grid-rows-4 gap-y-4 py-8">
          {productDetail.images.map((image) => (
            <img
              src={image}
              className="rounded-2xl w-full h-full object-cover"
            />
          ))}
        </div>
        <div className="w-[45%] h-[90vh]">
          <img
            src={productDetail.images[0]}
            className="rounded-2xl w-[100%] h-[100%] object-cover"
          />
        </div>
        <div className="flex flex-col py-8 w-[45%] gap-y-3 items-start ml-4">
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
            <p className="text-2xl xl:text-3xl font-bold">
              {productDetail.name}
            </p>
            <Heart className="ml-4" />
          </div>
          <p className="text-xl">{productDetail.description}</p>
          <div>
            <p className="flex flex-row text-lg mb-2">Хэмжээний заавар</p>

            <div className="flex flex-row gap-x-1">
              {size.map((size) => (
                <p
                  className={`text-base w-10 h-8 flex flex-row justify-center items-center border-2 rounded-full btn ${
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
          <div className="flex flex-row items-center text-2xl gap-x-4">
            <CiCircleMinus
              onClick={() => setQuantity(quantity - 1)}
              className="text-3xl"
            />
            {quantity}
            <CiCirclePlus
              onClick={() => setQuantity(quantity + 1)}
              className="text-3xl"
            />
          </div>
          <div className="text-3xl font-bold">
            {perTotalPrice(
              getDiscountedPrice(productDetail.price, productDetail.discount),
              quantity
            )}
            ₮
          </div>
          <Button
            className="bg-blue-600 rounded-3xl px-8 mt-3 text-lg"
            onClick={createAndAddtoCart}
          >
            Сагсанд нэмэх
          </Button>
          <div
            className="
          flex flex-row items-center w-full"
          >
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="w-4/5 space-y-2"
            >
              <div className="flex flex-row items-center space-x-8">
                <p>Үнэлгээ</p>

                {!getReviews ? (
                  <p className="flex flex-row items-center font-semibold space-x-3">
                    <Rate
                      disabled
                      allowHalf
                      value={starRating}
                      className="md:flex md:flex-row mr-2"
                    />
                    {starRating}
                    <p>({getReviews.length})</p>
                  </p>
                ) : null}

                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="flex flex-row">
                    <p className="text-blue-400 underline">дэлгэрэнгүй харах</p>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="">
                <Table className="md:w-full">
                  <TableBody className="md:w-full">
                    {getReviews?.map((oneReview: any) => (
                      <ReviewTable
                        rating={oneReview.reviewPoint}
                        name={oneReview.user.firstname}
                        comment={oneReview.comment}
                        key={oneReview._id}
                      />
                    ))}
                  </TableBody>
                </Table>

                <CreateReview />
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-extrabold text-6xl">Холбоотой бараа</h1>
        <div className="grid grid-cols-3 px-12 gap-x-8 gap-y-12 my-3">
          {relatedProducts.map((relatedProduct: any) => (
            <ProductCart
              name={relatedProduct.name}
              price={relatedProduct.price}
              image={relatedProduct.images[0]}
              id={relatedProduct._id}
              discount={relatedProduct.discount}
              priceWithDiscount={getDiscountedPrice(
                relatedProduct.price,
                relatedProduct.discount
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
