import { Select } from "antd";
import { useEffect, useMemo, useState } from "react";

const SearchBar = ({ data, setSearchedPlot }: any) => {
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedPlot, setSelectedPlot] = useState("");
  const [PlotNumberData, setPlotNumberData] = useState([]);
  const [fetchPlotNumbers, setFetchPlotNumbers] = useState(false);
  const BlocksData = useMemo(() => {
    const BlockSet = [];
    data.forEach((e) => {
      if (!BlockSet.includes(e.Block?.toLowerCase())) {
        BlockSet.push(e.Block?.toLowerCase());
      }
    });
    return BlockSet.map((value, i) => ({
      value: value?.toLowerCase(),
      id: i,
      label: value,
    }));
  }, [data]);
  useEffect(() => {
    let distinctPlotArray = [];
    let check = [];
    data.map((property) => {
      if (property.Block?.toLowerCase() === selectedBlock?.toLowerCase()) {
        if (!check.includes(property["Plot Number"])) {
          distinctPlotArray.push(property);
          check.push(property["Plot Number"]);
        }
      }
    });
    // const uniquePlotEntries = new Set(filteredPlotDetails);
    // console.log(uniquePlotEntries, "lol");
    // const distinctPlotArray = [...uniquePlotEntries];

    const plotOptions = distinctPlotArray.map((plotDetail, index) => ({
      id: `${plotDetail["Plot Number"]?.toLowerCase()}-${index}`,
      value: plotDetail["Plot Number"]?.toLowerCase(),
      label: plotDetail["Plot Number"],
    }));

    setPlotNumberData(plotOptions);
  }, [selectedBlock]);
  const onChangeBlock = (value: string) => {
    setSelectedBlock(value);
    setFetchPlotNumbers(!fetchPlotNumbers);
  };
  const onChangePlot = (value: string) => {
    setSelectedPlot(value);
    setFetchPlotNumbers(!fetchPlotNumbers);
  };
  useEffect(() => {
    setSearchedPlot(
      data.filter(
        (e) =>
          e.Block?.toLowerCase() === selectedBlock?.toLowerCase() &&
          e["Plot Number"]?.toLowerCase() == selectedPlot
      )
    );
  }, [selectedPlot]);
  return (
    <div className="flex flex-col gap-4">
      <Select
        showSearch
        className="w-64 "
        placeholder="Select Block"
        optionFilterProp="label"
        onChange={onChangeBlock}
        options={BlocksData}
      />
      {selectedBlock != "" && (
        <Select
          showSearch
          className="w-64"
          placeholder="Select Plot Number"
          optionFilterProp="label"
          onChange={onChangePlot}
          options={PlotNumberData}
        />
      )}
    </div>
  );
};

export default SearchBar;
