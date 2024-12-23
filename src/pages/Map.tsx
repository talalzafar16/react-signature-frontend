import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { FC, useState, useLayoutEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  ImageOverlay,
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
import { FaPhone } from "react-icons/fa6";
import { MdMarkEmailRead, MdOutlineSell } from "react-icons/md";
import EnquireyModal from "@/components/EnquireyModal";
import FilterModal from "@/components/FilterModal";
import SaleYourPlotModal from "@/components/SaleYourPlotModal";
import { SvgString } from "@/components/svg";

const svgIcon = L.divIcon({
  html: SvgString,
  className: "custom-svg-icon",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -36],
});

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

const Markerwhatever: FC<any> = ({ coords, setFunc, setShowEnquireyModal }) => {
  const map = useMap();

  if (coords["latitude"] == undefined || coords["longitude"] == undefined) {
    return;
  }

  map.flyTo([coords["latitude"], coords["longitude"]], 18);

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
const INITIAL_CENTER = [-74.0242,
  40.6941
]
const INITIAL_ZOOM = 12.12

const Map = () => {
  // const = [51.505, -0.09]
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [searchedPlot, setSearchedPlot] = useState<Models[] | []>([]);
  const [arratLATLONG, setArratLATLONG] = useState<Models[] | []>([]);
  const [center, setCenter] = useState(INITIAL_CENTER)
  const [zoom, setZoom] = useState(INITIAL_ZOOM)
  const [showSaleModal, setShowSaleModal] = useState<Boolean>(false);
  const [showEnquireyModal, setShowEnquireyModal] = useState<Boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState<Boolean>(false);
  const mapRef = useRef()
  const mapContainerRef = useRef()
  const draggableMarker = true;
 
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2lnbmF0dXJlbGFuZHMiLCJhIjoiY200d2J6Y29jMGQwczJxc2Y3MzBmeDhpZCJ9.CLBIlBACiro2UT8Cabo1OQ'
    // @ts-ignore
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
    // @ts-ignore
      center: center,
      zoom: zoom
    });
    // @ts-ignore
    mapRef.current.on('load', () => {
      // Define the coordinates for the image corners
      const bounds = [
        // Southwest corner (shifted further southwest)
        [-74.324, 40.1741],
        // Northeast corner (shifted further northeast)
        [-74.0030, 40.4141],
      ];
    
      // Add the image source
      // @ts-ignore
    mapRef.current.addSource('overlay-image', {
        type: 'image',
        url: MapUrl, // URL of the image
        coordinates: [
          [bounds[0][0], bounds[0][1]], // Bottom-left corner
          [bounds[1][0], bounds[0][1]], // Bottom-right corner
          [bounds[1][0], bounds[1][1]], // Top-right corner
          [bounds[0][0], bounds[1][1]], // Top-left corner (Corrected here)
      

        ],
      });
    
      // Add a raster layer to display the image
      // @ts-ignore
    mapRef.current.addLayer({
        id: 'overlay-layer',
        type: 'raster',
        source: 'overlay-image',
      });
    });

    return () => {
    // @ts-ignore
      mapRef.current.remove()
    }
  }, [])
  // useLayoutEffect(() => {
  //   axios
  //     .get(`${API_ENDPOINT}/users/get-plots`)
  //     .then((res: AxiosResponse<Response>) => {
  //       // @ts-ignore
  //       setArratLATLONG([...res.data]);
  //     });
  // }, []);
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
            <TbFilterSearch color="white" />
          </button>

          <button
            className="bg-yellow-600 h-8 flex justify-center items-center gap-2 p-2 rounded-lg text-white"
            onClick={() => {
              setShowSaleModal(true);
            }}
          >
            Sale Your Plot
            <MdOutlineSell color="white" />
          </button>
        </div>
      </div>

      {/* {isLoading && (
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
      )} */}
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
            } else {
              alert("data");
            }
          }}
        />
      )}
<div className='h-screen w-screen' id='map-container' ref={mapContainerRef}/>
      {/* <MapContainer
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
          zIndex={10}
        />

        {arratLATLONG.length > 0 &&
          searchedPlot.length == 0 &&
          arratLATLONG.map((item: any) => {
            if (item) {
              return (
                <Markerwhatever
                  coords={item}
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
                  coords={item}
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
      </MapContainer> */}
    </div>
  );
};

export default Map;






























































































// import { FC, useState, useLayoutEffect } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Popup,
//   Marker,
//   ImageOverlay,
// } from "react-leaflet";
// import { useMap } from "react-leaflet/hooks";
// import L from "leaflet";
// import Modal from "@/components/Modal";
// import "../App.css";
// import "leaflet/dist/leaflet.css";
// import MapUrl from "../assets/map/overlay10.png";
// import { API_ENDPOINT } from "../config/apiEndpoint";
// import axios, { AxiosResponse } from "axios";
// import { TbFilterSearch } from "react-icons/tb";
// import { FaPhone } from "react-icons/fa6";
// import { MdMarkEmailRead, MdOutlineSell } from "react-icons/md";
// import EnquireyModal from "@/components/EnquireyModal";
// import FilterModal from "@/components/FilterModal";
// import SaleYourPlotModal from "@/components/SaleYourPlotModal";
// import { SvgString } from "@/components/svg";

// const svgIcon = L.divIcon({
//   html: SvgString,
//   className: "custom-svg-icon",
//   iconSize: [24, 24],
//   iconAnchor: [12, 24],
//   popupAnchor: [0, -36],
// });

// type Models = {
//   plotNumber: string;
//   latitude: number;
//   longitude: number;
// };

// type newModels = Models | undefined | [];

// interface Response {
//   data: Models[];
//   message: string;
// }

// const Markerwhatever: FC<any> = ({ coords, setFunc, setShowEnquireyModal }) => {
//   const map = useMap();

//   if (coords["latitude"] == undefined || coords["longitude"] == undefined) {
//     return;
//   }

//   map.flyTo([coords["latitude"], coords["longitude"]], 18);

//   return (
//     <div>
//       <Marker
//         // @ts-ignore
//         icon={svgIcon}
//         position={[coords["latitude"], coords["longitude"]]}
//         eventHandlers={{
//           click: (e) => {
//             map.flyTo(e.latlng, 17);
//             setFunc({ latitude: e.latittude, longitude: e.longitude });
//           },
//         }}
//       >
//         <Popup>
//           <div className="text-center font-bold mb-2">Details</div>
//           Plot Number: {coords["PlotNumbers"]}
//           <br />
//           Block: {coords["Block"]}
//           <br />
//           Plot Location: {coords["PlotLocation"]}
//           <br />
//           Plot Type: {coords["PlotType"]}
//           <br />
//           Status: {coords["Status"]}
//           <br />
//           Transfer Status: {coords["TransferStatus"]}
//           <br />
//           Area in Marl: {coords["AreaInMarla"]} marla
//           <br />
//           Demand: {coords["DemandInLacs"]} lacs
//           <div className="w-full py-2 flex justify-center gap-2 flex-col">
//             <a
//               className="bg-blue-400 flex h-8 justify-center items-center p-2 gap-2 text-white rounded-lg"
//               href="https://wa.me/03111786929" // Replace 'yourphonenumber' with the actual phone number (in international format)
//               target="_blank" // Opens in a new tab
//               rel="noopener noreferrer"
//             >
//               <p className="text-white">Contact Us</p>
//               <FaPhone color="white" />
//             </a>

//             <button
//               className="bg-green-700 h-8 flex justify-center items-center gap-2 p-2 rounded-lg text-white"
//               onClick={() => {
//                 setShowEnquireyModal(true); // Replace 'youremail@example.com' with the actual email address
//               }}
//             >
//               <p className="text-white">Send Enquiry</p>
//               <MdMarkEmailRead color="white" />
//             </button>
//           </div>
//         </Popup>
//       </Marker>
//     </div>
//   );
// };

// const Map = () => {
//   // const = [51.505, -0.09]
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [isModal, setIsModal] = useState<boolean>(false);
//   const [latitude, setLatitude] = useState<number>(0);
//   const [longitude, setLongitude] = useState<number>(0);
//   const [searchedPlot, setSearchedPlot] = useState<Models[] | []>([]);
//   const [arratLATLONG, setArratLATLONG] = useState<Models[] | []>([]);
//   const [showSaleModal, setShowSaleModal] = useState<Boolean>(false);
//   const [showEnquireyModal, setShowEnquireyModal] = useState<Boolean>(false);
//   const [showFilterModal, setShowFilterModal] = useState<Boolean>(false);
//   const draggableMarker = true;
//   useLayoutEffect(() => {
//     axios
//       .get(`${API_ENDPOINT}/users/get-plots`)
//       .then((res: AxiosResponse<Response>) => {
//         // @ts-ignore
//         setArratLATLONG([...res.data]);
//       });
//   }, []);
//   return (
//     <div style={{ position: "relative" }}>
//       <div className="absolute top-8 right-8 z-[1000]">
//         <div className="flex w-full gap-3">
//           <button
//             className="bg-green-700 h-8 flex justify-center items-center gap-2 p-2 rounded-lg text-white"
//             onClick={() => {
//               setShowFilterModal(true);
//             }}
//           >
//             <TbFilterSearch color="white" />
//           </button>

//           <button
//             className="bg-yellow-600 h-8 flex justify-center items-center gap-2 p-2 rounded-lg text-white"
//             onClick={() => {
//               setShowSaleModal(true);
//             }}
//           >
//             Sale Your Plot
//             <MdOutlineSell color="white" />
//           </button>
//         </div>
//       </div>

//       {isLoading && (
//         <div
//           style={{
//             position: "absolute",
//             height: "100%",
//             width: "100%",
//             background: "rgba(156, 163, 175, .2)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 3294832847234,
//           }}
//         >
//           <h1 className="text-2xl text-primary">Loading ...</h1>
//         </div>
//       )}
//       {showEnquireyModal && <EnquireyModal closeModal={setShowEnquireyModal} />}
//       {showSaleModal && <SaleYourPlotModal closeModal={setShowSaleModal} />}
//       {showFilterModal && (
//         <FilterModal
//           data={arratLATLONG}
//           setSearchedPlot={setSearchedPlot}
//           closeModal={setShowFilterModal}
//         />
//       )}

//       {/* @ts-ignore */}
//       {isModal && (
//         <Modal
//           closeModal={() => setIsModal(false)}
//           toggle={(plot, blockName) => {
//             if (latitude && longitude && plot && blockName) {
//               // setIsLoading(true);
//               axios
//                 .post(`${API_ENDPOINT}/plots/add-plot`, {
//                   plotNumber: plot,
//                   latitude: latitude,
//                   longitude: longitude,
//                   blockName: blockName,
//                 })
//                 .then((res1) => {
//                   console.log(res1);
//                   setIsModal(false);
//                 });
//             } else {
//               alert("data");
//             }
//           }}
//         />
//       )}

//       <MapContainer
//         // @ts-ignore
//         center={[31.46081, 74.18806]}
//         dragging={draggableMarker}
//         whenReady={() => {
//           setTimeout(() => setIsLoading(false), 3000);
//         }}
//         zoom={17}
//         scrollWheelZoom={false}
//       >
//         <TileLayer
//           // @ts-ignore
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <ImageOverlay
//           url={MapUrl}
//           bounds={[
//             [31.48734, 74.170899],
//             [31.437555, 74.209462],
//           ]}
//           // @ts-ignore
//           zIndex={10}
//         />

//         {arratLATLONG.length > 0 &&
//           searchedPlot.length == 0 &&
//           arratLATLONG.map((item: any) => {
//             if (item) {
//               return (
//                 <Markerwhatever
//                   coords={item}
//                   addCoordinates={(value) => {
//                     setLatitude(value.latitude);
//                     setLongitude(value.longitude);
//                     setIsModal(true);
//                   }}
//                   setShowEnquireyModal={setShowEnquireyModal}
//                   setFunc={(value) => {
//                     setArratLATLONG((state: newModels[]) => {
//                       return [...state, value];
//                     });
//                   }}
//                 />
//               );
//             }
//           })}
//         {searchedPlot.length > 0 &&
//           searchedPlot.map((item: any) => {
//             if (item) {
//               return (
//                 <Markerwhatever
//                   coords={item}
//                   addCoordinates={(value) => {
//                     setLatitude(value.latitude);
//                     setLongitude(value.longitude);
//                     setIsModal(true);
//                   }}
//                   setShowEnquireyModal={setShowEnquireyModal}
//                   setFunc={(value) => {
//                     setArratLATLONG((state: newModels[]) => {
//                       return [...state, value];
//                     });
//                   }}
//                 />
//               );
//             }
//           })}
//       </MapContainer>
//     </div>
//   );
// };

// export default Map;
