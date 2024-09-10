import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Sample data
const data = [
  {
    blockName: "A",
    plotNumber: 101,
    possessionChargesStatus: "Half paid",
    plotType: "Corner",
    size: "10 Marla",
    category: "Residential",
  },
  {
    blockName: "B",
    plotNumber: 205,
    possessionChargesStatus: "Non Paid",
    plotType: "General",
    size: "5 Marla",
    category: "Commercial",
  },
  {
    blockName: "C",
    plotNumber: 307,
    possessionChargesStatus: "Full Paid",
    plotType: "Park Facing",
    size: "20 Marla",
    category: "Residential",
  },
  {
    blockName: "D",
    plotNumber: 408,
    possessionChargesStatus: "Transfer Free",
    plotType: "General",
    size: "10 Marla",
    category: "Residential",
  },
  {
    blockName: "E",
    plotNumber: 512,
    possessionChargesStatus: "Non Paid",
    plotType: "Corner",
    size: "5 Marla",
    category: "Commercial",
  },
  {
    blockName: "F",
    plotNumber: 601,
    possessionChargesStatus: "Half Paid",
    plotType: "Park Facing",
    size: "20 Marla",
    category: "Residential",
  },
];

const intitialFilters = {
  blockName: "",
  plotNumber: "",
  possessionChargesStatus: "All",
  plotType: "All",
  size: "All",
  category: "All",
};

const DisplayProperties = () => {
  const [filters, setFilters] = useState(intitialFilters);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredData = data.filter(
    (item) =>
      (filters.blockName === "" ||
        item.blockName
          .toLowerCase()
          .includes(filters.blockName.toLowerCase())) &&
      (filters.plotNumber === "" ||
        item.plotNumber.toString().includes(filters.plotNumber)) &&
      (filters.possessionChargesStatus === "All" ||
        item.possessionChargesStatus.toLowerCase() === filters.possessionChargesStatus.toLowerCase() ) &&
      (filters.plotType === "All" || item.plotType.toLowerCase() === filters.plotType.toLowerCase()) &&
      (filters.size === "All" || item.size === filters.size) &&
      (filters.category === "All" || item.category.toLowerCase() === filters.category.toLowerCase())
  );

  const clearFilters = () => {
    setFilters(intitialFilters);
  };

  return (
    <div className="container mx-auto py-10 px-10 bg-slate-200 min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Property Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="blockName">Block Name</Label>
              <Input
                id="blockName"
                value={filters.blockName}
                onChange={(e) =>
                  handleFilterChange("blockName", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="plotNumber">Plot Number</Label>
              <Input
                id="plotNumber"
                value={filters.plotNumber}
                onChange={(e) =>
                  handleFilterChange("plotNumber", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="chargesStatus">Charges Status</Label>
              <Select
                value={filters.possessionChargesStatus}
                onValueChange={(value) =>
                  handleFilterChange("possessionChargesStatus", value)
                }
                defaultValue="All"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Half paid">Half paid</SelectItem>
                  <SelectItem value="Non Paid">Non Paid</SelectItem>
                  <SelectItem value="Full paid">Full paid</SelectItem>
                  <SelectItem value="Transfer Free">Transfer Free</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="plotType">Plot Type</Label>
              <Select
                value={filters.plotType}
                onValueChange={(value) => handleFilterChange("plotType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Corner">Corner</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Park facing">Park facing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="size">Size</Label>
              <Select
                value={filters.size}
                onValueChange={(value) => handleFilterChange("size", value)}
                defaultValue="All"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="5 Marla">5 Marla</SelectItem>
                  <SelectItem value="10 Marla">10 Marla</SelectItem>
                  <SelectItem value="20 Marla">20 Marla</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="propertyType">Property Type</Label>
              <Select
                value={filters.category}
                onValueChange={(value) => handleFilterChange("category", value)}
                defaultValue="All"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Residential">Residential</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <button
              className="border border-gray-200 rounded py-1 bg-slate-500 text-white font-bold hover:bg-slate-400"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Block Name</TableHead>
                <TableHead>Plot Number</TableHead>
                <TableHead>Charges Status</TableHead>
                <TableHead>Plot Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Property Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item,index) => (
                <TableRow key={index}>
                  <TableCell>{item.blockName}</TableCell>
                  <TableCell>{item.plotNumber}</TableCell>
                  <TableCell>{item.possessionChargesStatus}</TableCell>
                  <TableCell>{item.plotType}</TableCell>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DisplayProperties;
