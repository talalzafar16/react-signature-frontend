import { useState } from "react";
import { Input } from "../ui/input";
import { CiSearch } from "react-icons/ci";
import SelectOptions from "./SelectOptions";
import { SaleBarChart } from "./SaleBarChart";
import EarningsAndExpenses from "./EarningsAndExpenses";
import DisplayProperty from "./DisplayProperty";
import houseImg from "@/assets/house.jpg";

const sortGraphOptions = ["Weekly", "Monthly", "Yearly"];
const sortPropertiesOptions = [
  "Newest",
  "Oldest",
  "Most Expensive",
  "Least Expensive",
];

const properties =[
    {
        name:"B Ocean Resort",
        location:"Northwest, Washington D.C.",
        beds:3,
        baths:2,
        parking:1,
        price: 2000000,
        investement: 500000,
        img:houseImg
    },
    {
        name:"B Ocean Resort",
        location:"Northwest, Washington D.C.",
        beds:3,
        baths:2,
        parking:1,
        price: 2000000,
        investement: 500000,
        img:houseImg
    },
    {
        name:"B Ocean Resort",
        location:"Northwest, Washington D.C.",
        beds:3,
        baths:2,
        parking:1,
        price: 2000000,
        investement: 500000,
        img:houseImg
    },
]

const DashboardLeft = () => {
  const [search, setSearch] = useState("");
  const [sortGraph, setSortGraph] = useState(sortGraphOptions[0]);
  const [sortProperties, setSortProperties] = useState(
    sortPropertiesOptions[0]
  );
  return (
    <div className="w-full min-h-screen bg-gray-100 p-5">
      {/* <!-- Heading & Search --> */}
      <div className="flex items-center justify-between border-b-2 pb-10">
        <div>
          <h1 className="text-xl">
            Hello! <span className="font-bold">Asad</span>
          </h1>
          <p className="text-sm text-grayText">
            Amet minim mollit non deserunt ullamco est sit aliqua.
          </p>
        </div>
        <Input
          id="search"
          type="text"
          placeholder="Search..."
          className="border-none outline-none py-3  bg-white"
          icon={<CiSearch />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

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
        <div className="flex justify-between gap-5">
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
        <div className="grid grid-cols-3 gap-3">
            {properties.map((property, index) => (
                <DisplayProperty property={property} key={index}/>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLeft;
