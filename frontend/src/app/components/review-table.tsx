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
    <TableRow className="flex flex-col">
      <TableCell className="flex flex-row w-3/5 justify-between">
        {name}
        <Rate disabled defaultValue={rating} />
      </TableCell>
      <TableCell>{comment}</TableCell>
    </TableRow>
  );
}
