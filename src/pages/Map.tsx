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
import SearchBar from "@/components/SearchBar";
// import SellPropertyModal from "@/components/SellPropertyModal";
import { FaPhone } from "react-icons/fa6";
import { MdMarkEmailRead } from "react-icons/md";
import EnquireyModal from "@/components/EnquireyModal";
const svgString = `<svg width="25px" height="25px" viewBox="-4 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <title>map-marker</title>
    <desc>Created with Sketch.</desc>
    <defs>

</defs>
    <g id="Vivid.JS" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Vivid-Icons" transform="translate(-125.000000, -643.000000)">
            <g id="Icons" transform="translate(37.000000, 169.000000)">
                <g id="map-marker" transform="translate(78.000000, 468.000000)">
                    <g transform="translate(10.000000, 6.000000)">
                        <path d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z" id="Shape" fill="#FF6E6E">

</path>
                        <circle id="Oval" fill="#0C0058" fill-rule="nonzero" cx="14" cy="14" r="7">

</circle>
                    </g>
                </g>
            </g>
        </g>
    </g>
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

const Markerwhatever: FC<any> = ({ coords, setFunc,setShowEnquireyModal }) => {
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
  // console.log(typeof coords ,'lol', [parseFloat(coords['latitude'].toFixed(4)), parseFloat(coords['longitude'].toFixed(4))]);
  // const postionss: any =  [parseInt(coords['latitude']), parseInt(coords['longitude'])]
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
            console.log("target", e.latlng);
            setFunc({ latitude: e.latlng.lat, longitude: e.latlng.lng });

            // setFunc((prevCoord) => prevCoord.filter((prevCoord) => prevCoord.filter((coord) => JSON.stringify(coord) !== JSON.stringify(e.latlng))
            //   // or (coord) => coord.lat !== pos.lat && coord.lng !== pos.lng
            // )
            // )
          },
        }}
      >
        <Popup>
          <div className="text-center font-bold mb-2">Details</div>
          Plot Number: {coords["Plot Number"]}
          <br />
          Block: {coords["Block"]}
          <br />
          Status: {coords["Status"]}
          <br />
          Area in Marl: {coords["Area in Marl"]}
          <br />
          Demand: {coords["Demand"]} lacs
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
  ])   
  const [showEnquireyModal, setShowEnquireyModal] = useState<Boolean>(false)
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
  return (
    <div style={{ position: "relative" }}>
      <div className="absolute top-8 right-8 z-[1000]">
        <SearchBar data={arratLATLONG} setSearchedPlot={setSearchedPlot} />
        {searchedPlot.length > 0 && (
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
                setShowEnquireyModal(true) // Replace 'youremail@example.com' with the actual email address
              }}
            >
              <p className="text-white">Send Enquiry</p>
              <MdMarkEmailRead color="white" />
            </button>
          </div>
          </div>
        )}
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
      {showEnquireyModal&&<EnquireyModal closeModal={setShowEnquireyModal}/>}

      {/* @ts-ignore */}
      {isModal && (
        <Modal
          closeModal={() => setIsModal(false)}
          toggle={(plot, blockName) => {
            console.log("check_", latitude, longitude, plot, blockName);
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
