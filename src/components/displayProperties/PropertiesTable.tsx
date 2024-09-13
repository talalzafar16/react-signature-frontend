import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Property } from "./AddFiltersBtn";
import { BsThreeDotsVertical } from "react-icons/bs";

type PropertyTableProps = {
  filteredData: Property[];
};

const PropertiesTable = ({ filteredData }: PropertyTableProps) => {
  return (
    <Card className="mt-10">
      <CardContent className="pt-5">
        <Table>
          <TableHeader className="bg-black text-white">
            <TableRow className="font-normal">
              <TableHead className="rounded-l-md">Block Name</TableHead>
              <TableHead>Plot Number</TableHead>
              <TableHead>Charges Status</TableHead>
              <TableHead>Plot Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Property Type</TableHead>
              <TableHead className="rounded-r-md">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.blockName}</TableCell>
                <TableCell>{item.plotNumber}</TableCell>
                <TableCell>{item.possessionChargesStatus}</TableCell>
                <TableCell>{item.plotType}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-center">
                  <BsThreeDotsVertical className="text-grayText" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PropertiesTable;
