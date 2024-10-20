import { TableCell, TableRow } from "@/components/ui/table";
import { Rate } from "antd";

export default function ReviewTable({
  name,
  rating,
  comment,
}: {
  name: string;
  rating: number;
  comment: string;
}) {
  return (
    <TableRow className=" md:w-full flex flex-col ">
      <TableCell className="flex flex-row w-full justify-between">
        {name}
        <Rate disabled defaultValue={rating} />
      </TableCell>
      <TableCell className="md:w-full">{comment}</TableCell>
    </TableRow>
  );
}
