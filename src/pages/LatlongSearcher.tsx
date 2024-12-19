import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import axios from "axios";
import { API_ENDPOINT } from "@/config/apiEndpoint";

const LatlongSearcher = () => {
  const [loading, setLoading] = useState(false);
  const [blockName, setBlockName] = useState<any>();
  const [plotNumber, setPlotNumber] = useState<any>();
  const [data, setData] = useState<any>(null);
  const blockList: any = [
    "Tulip Extension Block",
    "Diamond Block",
    "Jade Extension Block",
    "Platinum Block",
    "Silver Block",
    "Tulip Block",
    "Broadway Commercial",
    "Executive Block",
    "Jasmine Block",
    "Rose Block",
    "Topaz Block",
    "Tulip Overseas",
    "Crystal Block",
    "Jade Block",
    "Overseas Block",
    "Sapphire Block",
    "Topaz Extension Block",
  ];
  const onSubmit = async () => {
    setData(null);
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_ENDPOINT}/plots/get-plot-by-filter?plotNumber=${plotNumber}&blockName=${blockName}`
      );
      console.log(res.data.data);
      setData(res.data.data[0]);
    } catch (error) {
      alert(error.response.data.message);

      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 bg-slate-100 min-h-screen">
      <Card className="mt-10">
        <CardHeader className="font-semibold text-lg">
          Find Latitude and Longitude{" "}
        </CardHeader>
        <CardContent className="">
          <div className="w-full flex items-center gap-4   justify-center">
            <div className="flex flex-col gap-2">
              <Label htmlFor="blockName">Block Name*</Label>

              <select
                className="border-2 p-1 rounded-lg"
                onChange={(e) => setBlockName(e.target.value)}
              >
                {blockList.map((item) => (
                  <option value={item}>{item}</option>
                ))}
                {/* <option value="someOption">Some option</option>
  <option value="otherOption">Other option</option> */}
              </select>
            </div>
            <div>
              <Label htmlFor="plotNumber">Plot Number*</Label>
              <Input
                id="plotNumber"
                type="number"
                name="plotNumber"
                value={plotNumber}
                onChange={(e) => setPlotNumber(e.target.value)}
              />
            </div>
            <button
              onClick={onSubmit}
              className="bg-primary w-32 mt-4 text-white px-6 py-2 rounded-xl"
            >
              Search
            </button>
          </div>
        </CardContent>
        {data && (
          <CardContent className="">
            <div className="w-full flex items-center gap-4   justify-center">
              <div className="flex justify-center items-center gap-4">
                <h1 className="font-bold">Plot Number : </h1>
                <p>{data.plotNumber}</p>
              </div>
              <div className="flex justify-center items-center gap-4">
                <h1 className="font-bold">Block Name : </h1>
                <p>{data.blockName}</p>
              </div>
              <div className="flex justify-center items-center gap-4">
                <h1 className="font-bold">Latitude : </h1>
                <p>{data.latitude}</p>
              </div>
              <div className="flex justify-center items-center gap-4">
                <h1 className="font-bold">Longitude : </h1>
                <p>{data.longitude}</p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
      {loading && (
        <div className="absolute top-0 w-screen h-screen backdrop-blur-sm flex justify-center items-center overflow-hidden">
          <div className="text-black text-2xl ">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default LatlongSearcher;
