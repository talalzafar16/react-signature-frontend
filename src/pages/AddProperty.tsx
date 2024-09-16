import Header from "@/components/Header";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryOptions, chargesStatusOptions, plotTypeOptions, sizeOptions } from "@/contants";

const initialListingDetails = {
  blockName: "",
  plotNumber: 0,
  possessionChargesStatus: "",
  plotType: "",
  size: "",
  category: "",
};

const AddProperty = () => {
  const [search, setSearch] = useState("");
  const [listingDetails, setListingDetails] = useState(initialListingDetails);

  const handleListingDetailsChange = (e) => {
    const { name, value } = e.target;
    setListingDetails((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="p-5 bg-slate-100 min-h-screen">
      {/* <!-- Header --> */}
      <Header
        search={search}
        setSearch={setSearch}
        heading="Add New Property"
      />
      <Card className="mt-10">
        <CardHeader className="font-semibold text-lg">
          Listing Details
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          {/* <!-- Block Name and Plot Number --> */}
          <div className="flex gap-x-5">
            <div className="flex-1">
              <Label htmlFor="blockName">Block Name*</Label>
              <Input
                id="blockName"
                name="blockName"
                value={listingDetails.blockName}
                onChange={handleListingDetailsChange}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="plotNumber">Plot Number*</Label>
              <Input
                id="plotNumber"
                type="number"
                name="plotNumber"
                value={listingDetails.plotNumber}
                onChange={handleListingDetailsChange}
              />
            </div>
          </div>

          {/* <!-- Possession Charges Status and Plot Type --> */}
          <div className="flex gap-x-5">
            <div className="flex-1">
              <Label>Charges Status</Label>
              <Select
                value={listingDetails.possessionChargesStatus}
                name="possessionChargesStatus"
                onValueChange={handleListingDetailsChange}
                defaultValue="All"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {chargesStatusOptions.map((option, index) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label>Plot Type</Label>

              <Select
                value={listingDetails.plotType}
                name="plotType"
                onValueChange={handleListingDetailsChange}
                defaultValue="All"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  {plotTypeOptions.map((option, index) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
           
          </div>

          {/* <!-- Size and Category --> */}
          <div className="flex gap-x-5">
            <div className="flex-1">
              <Label>Size</Label>
              <Select
                value={listingDetails.size}
                name="size"
                onValueChange={handleListingDetailsChange}
                defaultValue="All"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Size" />
                </SelectTrigger>
                <SelectContent>
                  {sizeOptions.map((option, index) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label>Category</Label>

              <Select
                value={listingDetails.category}
                name="category"
                onValueChange={handleListingDetailsChange}
                defaultValue="All"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option, index) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
           
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default AddProperty;
