import { FC, useState, useLayoutEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  ImageOverlay,
  // useMapEvents,
} from "react-leaflet";
import { useMap } from "react-leaflet/hooks";
import L from "leaflet";
import Modal from "@/components/Modal";
import "../App.css";
import "leaflet/dist/leaflet.css";
import MapUrl from "../assets/map/overlay10.png";
import { API_ENDPOINT } from "../config/apiEndpoint";
import axios, { AxiosResponse } from "axios";
import { TbFilterSearch } from "react-icons/tb";
// import SellPropertyModal from "@/components/SellPropertyModal";
import { FaPhone } from "react-icons/fa6";
import { MdMarkEmailRead, MdOutlineSell } from "react-icons/md";
import EnquireyModal from "@/components/EnquireyModal";
import FilterModal from "@/components/FilterModal";
import SaleYourPlotModal from "@/components/SaleYourPlotModal";
const svgString = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" viewBox="0 0 512 512">
                    <image xlink:href="data:image/png;base64,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" x="0" y="0" width="512" height="512"/>
                  </svg>`;

const svgIcon = L.divIcon({
  html: svgString,
  className: "custom-svg-icon",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -36],
});

// type Coordinates = [number, number][] | [] | undefined;

type Models = {
  plotNumber: string;
  latitude: number;
  longitude: number;
};

type newModels = Models | undefined | [];

interface Response {
  data: Models[];
  message: string;
}

// const LocationMarker: FC<any> = ({ coords, setFunc, addCoordinates }) => {
//   const [coordinates, setCoordinates] = useState({});
//   const map = useMap();
//   useMapEvents({
//     // click(e) {
//     //   alert(`what's wrong`);
//     //   console.log("new_data", e.latlng);
//     // },
//     click(e) {
//       console.log(e.latlng, "new_data");
//       setCoordinates({ latitude: e.latlng.lat, longitude: e.latlng.lng });
//       alert(`latitude: ${e.latlng.lat}, longitude: ${e.latlng.lng}`);
//       // setFunc({latitude: e.latlng.lat, longitude: e.latlng.lng});
//       // addCoordinates({latitude: e.latlng.lat, longitude: e.latlng.lng});
//     },
//   });
//   console.log(typeof coords, "new_point", coords);
//   // const postionss: any =  [parseInt(coords['latitude']), parseInt(coords['longitude'])]
//   return (
//     <div>
//       <Marker
//         // @ts-ignore
//         icon={svgIcon}
//         position={[coords["latitude"], coords["longitude"]]}
//         eventHandlers={{
//           click: (e) => {
//             map.flyTo(e.latlng, 17);
//             console.log("target", e.latlng);
//             setFunc({ latitude: e.latlng.lat, longitude: e.latlng.lng });
//             addCoordinates({ latitude: e.latlng.lat, longitude: e.latlng.lng });

//             // setFunc((prevCoord) => prevCoord.filter((prevCoord) => prevCoord.filter((coord) => JSON.stringify(coord) !== JSON.stringify(e.latlng))
//             //   // or (coord) => coord.lat !== pos.lat && coord.lng !== pos.lng
//             // )
//             // )
//           },
//         }}
//       >
//         <Popup>
//           latitude: {coordinates["latitude"]}
//           <br />
//           longitude: {coordinates["longitude"]}
//         </Popup>
//       </Marker>
//     </div>
//   );
// };

const Markerwhatever: FC<any> = ({ coords, setFunc, setShowEnquireyModal }) => {
  const map = useMap();
  // const mapss = useMapEvents({
  //   click(e) {
  //     console.log(e.latlng, "new_data");
  //     setFunc({latitude: e.latlng.lat, longitude: e.latlng.lng});
  //     addCoordinates({latitude: e.latlng.lat, longitude: e.latlng.lng})
  //   },
  // });

  if (coords["latitude"] == undefined || coords["longitude"] == undefined) {
    return;
  }

  map.flyTo([coords["latitude"], coords["longitude"]], 17);

  return (
    <div>
      <Marker
        // @ts-ignore
        icon={svgIcon}
        position={[coords["latitude"], coords["longitude"]]}
        eventHandlers={{
          click: (e) => {
            map.flyTo(e.latlng, 17);
            setFunc({ latitude: e.latittude, longitude: e.longitude });

            // setFunc((prevCoord) => prevCoord.filter((prevCoord) => prevCoord.filter((coord) => JSON.stringify(coord) !== JSON.stringify(e.latlng))
            //   // or (coord) => coord.lat !== pos.lat && coord.lng !== pos.lng
            // )
            // )
          },
        }}
      >
        <Popup>
          <div className="text-center font-bold mb-2">Details</div>
          Plot Number: {coords["PlotNumbers"]}
          <br />
          Block: {coords["Block"]}
          <br />
          Plot Location: {coords["PlotLocation"]}
          <br />
          Plot Type: {coords["PlotType"]}
          <br />
          Status: {coords["Status"]}
          <br />
          Transfer Status: {coords["TransferStatus"]}
          <br />
          Area in Marl: {coords["AreaInMarla"]} marla
          <br />
          Demand: {coords["DemandInLacs"]} lacs
          {/* A pretty CSS3 popup. <br /> Easily customizable. */}
          <div className="w-full py-2 flex justify-center gap-2 flex-col">
            <a
              className="bg-blue-400 flex h-8 justify-center items-center p-2 gap-2 text-white rounded-lg"
              href="https://wa.me/03111786929" // Replace 'yourphonenumber' with the actual phone number (in international format)
              target="_blank" // Opens in a new tab
              rel="noopener noreferrer"
            >
              <p className="text-white">Contact Us</p>
              <FaPhone color="white" />
            </a>

            <button
              className="bg-green-700 h-8 flex justify-center items-center gap-2 p-2 rounded-lg text-white"
              onClick={() => {
                setShowEnquireyModal(true); // Replace 'youremail@example.com' with the actual email address
              }}
            >
              <p className="text-white">Send Enquiry</p>
              <MdMarkEmailRead color="white" />
            </button>
          </div>
        </Popup>
      </Marker>
    </div>
  );
};

const Map = () => {
  // const = [51.505, -0.09]
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [searchedPlot, setSearchedPlot] = useState<Models[] | []>([]);
  const [arratLATLONG, setArratLATLONG] = useState<Models[] | []>([
    // [31.462254, 74.196334],
    // {latitude: 31.462254, longitude: 74.196334, plotNumber: '2020' }
    // [31.463052, 74.194269],
    // [31.467729, 74.184702],
    // [31.47226, 74.189333],
    // [31.466812595250545, 74.18388783931734],
    // [31.46274027517365, 74.18595850467683],
    // [31.459541778257144, 74.1868168115616],
  ]);
  const [showSaleModal, setShowSaleModal] = useState<Boolean>(false);
  const [showEnquireyModal, setShowEnquireyModal] = useState<Boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState<Boolean>(false);
  const draggableMarker = true;
  useLayoutEffect(() => {
    axios
      .get(`${API_ENDPOINT}/users/get-plots`)
      .then((res: AxiosResponse<Response>) => {
        // @ts-ignore
        // @ts-ignore
        setArratLATLONG([...res.data]);
      });
  }, []);
  // const arratLATLONG: Coordinates  = [[31.462254,74.196334], [31.463052, 74.194269], [31.467729, 74.184702], [31.47226, 74.189333]]
  // const bounds = new LatLngBounds([31.48734, 74.170899], [31.437555, 74.209462])
  console.log(searchedPlot, "searchedPlot");
  return (
    <div style={{ position: "relative" }}>
      <div className="absolute top-8 right-8 z-[1000]">
        <div className="flex w-full gap-3">
          <button
            className="bg-green-700 h-8 flex justify-center items-center gap-2 p-2 rounded-lg text-white"
            onClick={() => {
              setShowFilterModal(true);
            }}
          >
            {/* <p className="text-white">Filters</p> */}
            <TbFilterSearch color="white" />
          </button>

          <button
            className="bg-yellow-600 h-8 flex justify-center items-center gap-2 p-2 rounded-lg text-white"
            onClick={() => {
              setShowSaleModal(true);
            }}
          >
            Sale Your Plot
            {/* <p className="text-white">Filters</p> */}
            <MdOutlineSell color="white" />
          </button>
        </div>

        {/* <SearchBar data={arratLATLONG} setSearchedPlot={setSearchedPlot} /> */}
        {/* {searchedPlot.length > 0 && (
          <div className="bg-white mt-4 rounded-lg p-4 ">
            <div className="text-center font-bold mb-2">Details</div>
            Plot Number:{" "}
            {searchedPlot.length > 0 && searchedPlot[0]["Plot Number"]}
            <br />
            Block: {searchedPlot.length > 0 && searchedPlot[0]["Block"]}
            <br />
            Status: {searchedPlot.length > 0 && searchedPlot[0]["Status"]}
            <br />
            Area in Marl:{" "}
            {searchedPlot.length > 0 && searchedPlot[0]["Area in Marl"]}
            <br />
            Demand: {searchedPlot.length > 0 && searchedPlot[0]["Demand"]} lacs
            <div className="w-full py-2 flex justify-center gap-2 flex-col">
              <a
                className="bg-blue-400 flex h-8 justify-center items-center p-2 gap-2 text-white rounded-lg"
                href="https://wa.me/03111786929" // Replace 'yourphonenumber' with the actual phone number (in international format)
                target="_blank" // Opens in a new tab
                rel="noopener noreferrer"
              >
                <p className="text-white">Contact Us</p>
                <FaPhone color="white" />
              </a>

              <button
                className="bg-green-700 h-8 flex justify-center items-center gap-2 p-2 rounded-lg text-white"
                onClick={() => {
                  setShowEnquireyModal(true); // Replace 'youremail@example.com' with the actual email address
                }}
              >
                <p className="text-white">Send Enquiry</p>
                <MdMarkEmailRead color="white" />
              </button>
            </div>
          </div>
        )} */}
      </div>

      {isLoading && (
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            background: "rgba(156, 163, 175, .2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 3294832847234,
          }}
        >
          <h1 className="text-2xl text-primary">Loading ...</h1>
        </div>
      )}
      {showEnquireyModal && <EnquireyModal closeModal={setShowEnquireyModal} />}
      {showSaleModal && <SaleYourPlotModal closeModal={setShowSaleModal} />}
      {showFilterModal && (
        <FilterModal
          data={arratLATLONG}
          setSearchedPlot={setSearchedPlot}
          closeModal={setShowFilterModal}
        />
      )}

      {/* @ts-ignore */}
      {isModal && (
        <Modal
          closeModal={() => setIsModal(false)}
          toggle={(plot, blockName) => {
            if (latitude && longitude && plot && blockName) {
              // setIsLoading(true);
              axios
                .post(`${API_ENDPOINT}/plots/add-plot`, {
                  plotNumber: plot,
                  latitude: latitude,
                  longitude: longitude,
                  blockName: blockName,
                })
                .then((res1) => {
                  console.log(res1);
                  setIsModal(false);
                });
              // fetch(`${API_ENDPOINT}/plots/add-plot`, {
              //   method: "POST",
              //   body: JSON.stringify({ plotNumber: plot, latitude: latitude, longitude: longitude })
              // }).then(res => res.json()).then(res1 => { console.log(res1); setIsModal(false); }).catch(err => { console.log(err) })
            } else {
              alert("data");
            }
          }}
        />
      )}
      {/* <span
        className="bg-yellow-400 h-12"
        onClick={() => {
          setDraggableMarker((state) => !state);
        }}>Toggle Draggable!</span> */}
      <MapContainer
        // @ts-ignore
        center={[31.46081, 74.18806]}
        dragging={draggableMarker}
        whenReady={() => {
          setTimeout(() => setIsLoading(false), 3000);
        }}
        zoom={17}
        scrollWheelZoom={false}
      >
        <TileLayer
          // @ts-ignore
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ImageOverlay
          url={MapUrl}
          bounds={[
            [31.48734, 74.170899],
            [31.437555, 74.209462],
          ]}
          // @ts-ignore
          // opacity={0.7}
          zIndex={10}
        />
        {/* <Marker position={item}
  eventHandlers={{
    click: (e) => {
      console.log('marker clicked', e)
      // map.setView([e.latlng.lat, e.latlng.lng], 16);
    },
  }}
  >
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker> */}
        {/* <LocationMarker
          coords={{
            latitude: 31.45001885385682,
            longitude: 74.20307636260988,
            plotNumber: "2020",
          }}
          // openModal={(lat, long) => {
          //   setIsModal(true);
          // }}
          addCoordinates={(value) => {
            setLatitude(value.latitude);
            setLongitude(value.longitude);
            setIsModal(true);
          }}
          setFunc={(value) => {
            setArratLATLONG((state: any[]) => {
              return [...state, value];
            });
          }}
        /> */}
        {arratLATLONG.length > 0 &&
          searchedPlot.length == 0 &&
          arratLATLONG.map((item: any) => {
            if (item) {
              return (
                <Markerwhatever
                  // key={item}
                  coords={item}
                  // openModal={(lat, long) => {
                  //   setIsModal(true);
                  // }}
                  addCoordinates={(value) => {
                    setLatitude(value.latitude);
                    setLongitude(value.longitude);
                    setIsModal(true);
                  }}
                  setShowEnquireyModal={setShowEnquireyModal}
                  setFunc={(value) => {
                    setArratLATLONG((state: newModels[]) => {
                      return [...state, value];
                    });
                  }}
                />
              );
            }
          })}
        {searchedPlot.length > 0 &&
          searchedPlot.map((item: any) => {
            if (item) {
              return (
                <Markerwhatever
                  // key={item}
                  coords={item}
                  // openModal={(lat, long) => {
                  //   setIsModal(true);
                  // }}
                  addCoordinates={(value) => {
                    setLatitude(value.latitude);
                    setLongitude(value.longitude);
                    setIsModal(true);
                  }}
                  setShowEnquireyModal={setShowEnquireyModal}
                  setFunc={(value) => {
                    setArratLATLONG((state: newModels[]) => {
                      return [...state, value];
                    });
                  }}
                />
              );
            }
          })}
      </MapContainer>
    </div>
  );
};

export default Map;
