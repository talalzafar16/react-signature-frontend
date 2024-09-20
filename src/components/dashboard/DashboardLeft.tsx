import { useState } from "react";
import SelectOptions from "./SelectOptions";
import { SaleBarChart } from "./SaleBarChart";
import EarningsAndExpenses from "./EarningsAndExpenses";
import DisplayProperty from "./DisplayProperty";
import houseImg from "@/assets/house.jpg";
import Header from "../Header";

const sortGraphOptions = ["Weekly", "Monthly", "Yearly"];
const sortPropertiesOptions = [
  "Newest",
  "Oldest",
  "Most Expensive",
  "Least Expensive",
];

const properties = [
  {
    name: "B Ocean Resort",
    location: "Northwest, Washington D.C.",
    beds: 3,
    baths: 2,
    parking: 1,
    price: 2000000,
    investement: 500000,
    img: houseImg,
  },
  {
    name: "B Ocean Resort",
    location: "Northwest, Washington D.C.",
    beds: 3,
    baths: 2,
    parking: 1,
    price: 2000000,
    investement: 500000,
    img: houseImg,
  },
  {
    name: "B Ocean Resort",
    location: "Northwest, Washington D.C.",
    beds: 3,
    baths: 2,
    parking: 1,
    price: 2000000,
    investement: 500000,
    img: houseImg,
  },
];

const DashboardLeft = () => {
  const [search, setSearch] = useState("");
  const [sortGraph, setSortGraph] = useState(sortGraphOptions[0]);
  const [sortProperties, setSortProperties] = useState(
    sortPropertiesOptions[0]
  );
  return (
    <div className="w-full min-h-screen bg-gray-100 p-5">
      {/* <!-- Heading & Search --> */}
      <Header search={search} setSearch={setSearch} />

      {/* <!-- Graph, Earning, Expenses --> */}
      <div className="pt-5 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg">Overview</h1>
          <SelectOptions
            option={sortGraph}
            setOptions={setSortGraph}
            optionsList={sortGraphOptions}
          />
        </div>
        <div className="flex justify-between gap-5 max-sm:flex-col">
          <div className="flex-1">
            <SaleBarChart sortParam={sortGraph} />
          </div>
          <div className="flex-1">
            <EarningsAndExpenses />
          </div>
        </div>
      </div>

      {/* <!-- Properties --> */}
      <div className="pt-5 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg">Most Popular</h1>
          <SelectOptions
            option={sortProperties}
            setOptions={setSortProperties}
            optionsList={sortPropertiesOptions}
          />
        </div>
        <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
          {properties.map((property, index) => (
            <DisplayProperty property={property} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLeft;
