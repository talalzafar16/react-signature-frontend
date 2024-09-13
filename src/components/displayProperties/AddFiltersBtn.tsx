import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export type Property = {
  blockName: string;
  plotNumber: number;
  possessionChargesStatus: string;
  plotType: string;
  size: string;
  category: string;
};

type AddFiltersBtnProps = {
  intitialFilters: Property;
  filters: Property;
  setFilters: React.Dispatch<React.SetStateAction<Property>>;
};

const chargesStatusOptions = [
  "All",
  "Half paid",
  "Non Paid",
  "Full paid",
  "Transfer Free",
];
const plotTypeOptions = ["All", "Corner", "General", "Park facing"];
const sizeOptions = ["All", "5 Marla", "10 Marla", "20 Marla"];
const categoryOptions = ["All", "Residential", "Commercial"];

const AddFiltersBtn = ({
  intitialFilters,
  filters,
  setFilters,
}: AddFiltersBtnProps) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (field: string, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setLocalFilters(intitialFilters);
    setFilters(intitialFilters);
  };

  const saveFilters = () => {
    setFilters(localFilters);
  };

  const handleDialogClose = () => {
    setLocalFilters(filters); 
  };


  console.log(filters);

  return (
    <Dialog onOpenChange={handleDialogClose}>
      <DialogTrigger className="bg-[#BC9128] text-white rounded-full py-1 px-5">
        Add Filters
      </DialogTrigger>
      <DialogContent className="min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add Filters</DialogTitle>
          <DialogDescription>
            <div className="grid grid-cols-3 gap-4 gap-y-10 my-6 text-black">
              <div>
                <Label htmlFor="blockName">Block Name*</Label>
                <Input
                  id="blockName"
                  value={localFilters.blockName}
                  onChange={(e) =>
                    handleFilterChange("blockName", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="plotNumber">Plot Number*</Label>
                <Input
                  id="plotNumber"
                  value={localFilters.plotNumber}
                  onChange={(e) =>
                    handleFilterChange("plotNumber", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="chargesStatus">Charges Status</Label>
                <Select
                  value={localFilters.possessionChargesStatus}
                  onValueChange={(value) =>
                    handleFilterChange("possessionChargesStatus", value)
                  }
                  defaultValue="All"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
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
              <div>
                <Label htmlFor="plotType">Plot Type</Label>
                <Select
                  value={localFilters.plotType}
                  onValueChange={(value) =>
                    handleFilterChange("plotType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
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
              <div>
                <Label htmlFor="size">Size</Label>
                <Select
                  value={localFilters.size}
                  onValueChange={(value) => handleFilterChange("size", value)}
                  defaultValue="All"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
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
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={localFilters.category}
                  onValueChange={(value) =>
                    handleFilterChange("category", value)
                  }
                  defaultValue="All"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
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
              <button
                className="border-none rounded bg-black text-white font-bold  py-2"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
            <div className="w-full flex justify-center">
              <DialogTrigger asChild>
                <button
                  className="border-none rounded-full bg-black text-white font-bold  py-2 px-10"
                  onClick={saveFilters}
                >
                  Save
                </button>
              </DialogTrigger>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddFiltersBtn;
