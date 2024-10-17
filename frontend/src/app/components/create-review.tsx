import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";

export default function CreateReview() {
  const [rating, setRating] = useState(0);
  const handleRating = (rate: number) => {
    setRating(rate);
  };
  // Optinal callback functio
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value: number, index: number) =>
    console.log(value, index);

  return (
    <div>
      <div className="flex flex-col">
        Одоор үнэлэх:
        <div className="">
          <Rating
            onClick={handleRating}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onPointerMove={onPointerMove}
            className="App flex flex-row"
          />
        </div>
      </div>
      <div>
        Сэтгэгдэл үлдээх:<Textarea placeholder="Энд бичнэ үү"></Textarea>
      </div>
      <div></div>
    </div>
  );
}
