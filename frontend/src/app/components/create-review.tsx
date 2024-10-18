import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Rate } from "antd";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function CreateReview() {
  const { toast } = useToast();
  const [comment, setComment] = useState("");
  const params = useParams();
  const [rating, setRating] = useState(0);
  const handleRating = (rate: number) => {
    setRating(rate);
  };
  // console.log("rating stariig harah:", rating);
  // console.log("commentiig harah:", comment);

  const addReview = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `http://localhost:9000/api/v1/review/create-review/${params.id}`,
        { reviewPoint: rating, comment: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        console.log("comment anjilttai");
        toast({
          description:
            "Тус бүтээгдэхүүн дээрх таны үлдээсэн сэтгэгдэлийг амжилттай хадгаллаа.",
        });
      }
    } catch (error) {
      console.error("сэтгэгдэл үлдээхэд ямар нэгэн алдаа гарлаа.", error);
      toast({
        variant: "destructive",
        description: "сэтгэгдэл үлдээхэд ямар нэгэн алдаа гарлаа.",
      });
    }
  };

  return (
    <div className="bg-zinc-50 rounded-2xl p-5">
      <div className="flex flex-col">
        Одоор үнэлэх:
        <div className="">
          <Rate onChange={handleRating} />
        </div>
      </div>
      <div>
        Сэтгэгдэл үлдээх:
        <Textarea
          placeholder="Энд бичнэ үү"
          value={comment}
          onChange={(e) => {
            setComment(e.currentTarget.value);
          }}
        ></Textarea>
      </div>
      <div>
        <Button
          className="h-7 bg-blue-600 rounded-3xl px-5 mt-3 text-base "
          onClick={addReview}
        >
          Үнэлгээ үлдээх
        </Button>
      </div>
    </div>
  );
}
