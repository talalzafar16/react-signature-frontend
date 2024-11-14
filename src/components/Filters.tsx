import { Select } from "antd";
import { useEffect, useMemo, useState } from "react";

const Filters = ({ data, setSearchedPlot, closeModal }: any) => {
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedPlot, setSelectedPlot] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [TransferStatus, setTransferStatus] = useState("");
  const [selectedPlotType, setSelectedPlotType] = useState("");
  const [selectedPlotLocation, setSelectedPlotLocation] = useState("");
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
  const PlotTypeData = useMemo(() => {
    const PlotSet = [];
    data.forEach((e) => {
      if (!PlotSet.includes(e.PlotType?.toLowerCase())) {
        PlotSet.push(e.PlotType?.toLowerCase());
      }
    });
    return PlotSet.map((value, i) => ({
      value: value?.toLowerCase(),
      id: i,
      label: value,
    }));
  }, [data]);
  const paymentStatusData = useMemo(() => {
    const statusSet = [];
    data.forEach((e) => {
      if (!statusSet.includes(e.Status?.toLowerCase())) {
        statusSet.push(e.Status?.toLowerCase());
      }
    });
    return statusSet.map((value, i) => ({
      value: value?.toLowerCase(),
      id: i,
      label: value,
    }));
  }, [data]);
  const plotLocationData = useMemo(() => {
    const plotLocationSet = [];
    data.forEach((e) => {
      if (!plotLocationSet.includes(e.PlotLocation?.toLowerCase())) {
        plotLocationSet.push(e.PlotLocation?.toLowerCase());
      }
    });
    return plotLocationSet.map((value, i) => ({
      value: value?.toLowerCase(),
      id: i,
      label: value,
    }));
  }, [data]);
  const TransferStatusData = useMemo(() => {
    const TransferStatusSet = [];
    data.forEach((e) => {
      if (!TransferStatusSet.includes(e.TransferStatus?.toLowerCase())) {
        TransferStatusSet.push(e.TransferStatus?.toLowerCase());
      }
    });
    return TransferStatusSet.map((value, i) => ({
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
        if (!check.includes(property["PlotNumbers"])) {
          distinctPlotArray.push(property);
          check.push(property["PlotNumbers"]);
        }
      }
    });

    const plotOptions = distinctPlotArray.map((plotDetail, index) => ({
      id: `${plotDetail["PlotNumbers"]?.toLowerCase()}-${index}`,
      value: plotDetail["PlotNumbers"]?.toLowerCase(),
      label: plotDetail["PlotNumbers"],
    }));

    setPlotNumberData(plotOptions);
  }, [selectedBlock]);
  const onChangeBlock = (value: string) => {
    setSelectedBlock(value);
    setFetchPlotNumbers(!fetchPlotNumbers);
  };
  const onChangePlotType = (value: string) => {
    setSelectedPlotType(value);
  };
  const onChangeStatus = (value: string) => {
    setSelectedStatus(value);
    // setFetchPlotNumbers(!fetchPlotNumbers);
  };
  const onChangePLotLocation = (value: string) => {
    setSelectedPlotLocation(value);
    // setFetchPlotNumbers(!fetchPlotNumbers);
  };
  const onChangeTransferStatus = (value: string) => {
    setTransferStatus(value);
  };
  const onChangePlotNumber = (value: string) => {
    setSelectedPlot(value);
  };
  const Search = () => {
    let filtered = data.filter(
      (e) =>
        (!selectedBlock ||
          e.Block?.toLowerCase() === selectedBlock?.toLowerCase()) &&
        (!selectedPlot ||
          e["PlotNumbers"]?.toLowerCase() === selectedPlot.toLowerCase()) &&
        (!selectedPlotType ||
          e["PlotType"]?.toLowerCase() === selectedPlotType.toLowerCase()) &&
        (!selectedStatus ||
          e["Status"]?.toLowerCase() === selectedStatus.toLowerCase()) &&
        (!selectedPlotLocation ||
          e["PlotLocation"]?.toLowerCase() ===
            selectedPlotLocation.toLowerCase()) &&
        (!TransferStatus ||
          e["TransferStatus"]?.toLowerCase() === TransferStatus.toLowerCase())
    );
    if (!filtered.length) {
      alert("No Search for these filter");
      return;
    }
    setSearchedPlot(filtered);
    closeModal(false);
  };
  // setSearchedPlot(
  //   data.filter(
  //     (e) =>
  //       e.Block?.toLowerCase() === selectedBlock?.toLowerCase() &&
  //       e["Plot Number"]?.toLowerCase() == selectedPlot
  //   )
  // );
  return (
    <div className="flex flex-col py1-1 gap-2">
      <div>
        <p className="text-gray-600 text-sm mb-1">Select Block</p>
        <Select
          showSearch
          className="w-64 "
          allowClear
          placeholder="Select Block"
          optionFilterProp="label"
          onChange={onChangeBlock}
          options={BlocksData}
        />
      </div>
      {selectedBlock != "" && (
        <div>
          <p className="text-gray-600 text-sm mb-1"> Select Plot Number</p>

          <Select
            showSearch
            allowClear
            className="w-64"
            placeholder="Select Plot Number"
            optionFilterProp="label"
            onChange={onChangePlotNumber}
            options={PlotNumberData}
          />
        </div>
      )}

      <div>
        <p className="text-gray-600 text-sm mb-1">Select Plot Type</p>

        <Select
          showSearch
          allowClear
          className="w-64 "
          placeholder="Select Plot Type"
          optionFilterProp="label"
          onChange={onChangePlotType}
          options={PlotTypeData}
        />
      </div>
      <div>
        <p className="text-gray-600 text-sm mb-1">Payment Status</p>

        <Select
          showSearch
          allowClear
          className="w-64 "
          placeholder="Select Payment Status"
          optionFilterProp="label"
          onChange={onChangeStatus}
          options={paymentStatusData}
        />
      </div>
      <div>
        <p className="text-gray-600 text-sm mb-1">Plot Location</p>
        <Select
          showSearch
          allowClear
          className="w-64"
          placeholder="Select Plot Location"
          optionFilterProp="label"
          onChange={onChangePLotLocation}
          options={plotLocationData}
        />
      </div>
      <div>
        <p className="text-gray-600 text-sm mb-1">Transfer Fees</p>
        <Select
          showSearch
          allowClear
          className="w-64"
          placeholder="Select Plot Location"
          optionFilterProp="label"
          onChange={onChangeTransferStatus}
          options={TransferStatusData}
        />
      </div>

      <button
        className="bg-green-700 mt-6 h-8 flex justify-center items-center gap-2 p-2 rounded-lg text-white"
        onClick={() => Search()}
      >
        Search
      </button>
    </div>
  );
};

export default Filters;
