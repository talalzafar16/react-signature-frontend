import { useState } from "react";
import AddFiltersBtn from "@/components/displayProperties/AddFiltersBtn";
import PropertiesTable from "@/components/displayProperties/PropertiesTable";
import TablePagination from "@/components/displayProperties/TablePagination";
import Header from "@/components/Header";

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
    blockName: "A",
    plotNumber: 101,
    possessionChargesStatus: "Half paid",
    plotType: "Corner",
    size: "10 Marla",
    category: "Residential",
  },
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
    plotNumber: 607,
    possessionChargesStatus: "Half Paid",
    plotType: "Park Facing",
    size: "20 Marla",
    category: "Residential",
  },
];

const intitialFilters = {
  blockName: "",
  plotNumber: 0,
  possessionChargesStatus: "All",
  plotType: "All",
  size: "All",
  category: "All",
};

const DisplayProperties = () => {
  const [filters, setFilters] = useState(intitialFilters);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 5;

  const filteredData = data.filter(
    (item) =>
      (filters.blockName === "" ||
        item.blockName
          .toLowerCase()
          .includes(filters.blockName.toLowerCase())) &&
      (filters.plotNumber === 0 ||
        item.plotNumber.toString().includes(filters.plotNumber.toString())) &&
      (filters.possessionChargesStatus === "All" ||
        item.possessionChargesStatus.toLowerCase() ===
          filters.possessionChargesStatus.toLowerCase()) &&
      (filters.plotType === "All" ||
        item.plotType.toLowerCase() === filters.plotType.toLowerCase()) &&
      (filters.size === "All" || item.size === filters.size) &&
      (filters.category === "All" ||
        item.category.toLowerCase() === filters.category.toLowerCase())
  );

  // Calculate the current properties to display
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredData.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-5 bg-slate-100 min-h-screen">
      {/* <!-- Header --> */}
      <Header search={search} setSearch={setSearch} heading="My Properties"/>
     

      {/* <!-- Add filters --> */}
      <div className="flex items-center justify-between mt-16">
        <div>
          <p className="text-grayText max-sm:text-sm">
            Showing <span className="text-black font-semibold">{indexOfFirstProperty+1}-{indexOfLastProperty}</span> of{" "}
            <span className="text-black font-semibold">{filteredData.length}</span> results
          </p>
        </div>
        <AddFiltersBtn
          intitialFilters={intitialFilters}
          filters={filters}
          setFilters={setFilters}
        />
      </div>

      {/* <!-- Properties Table --> */}
      <PropertiesTable filteredData={currentProperties} />
      <div className="mt-5">
        <TablePagination
          propertiesPerPage={propertiesPerPage}
          totalProperties={filteredData.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default DisplayProperties;
