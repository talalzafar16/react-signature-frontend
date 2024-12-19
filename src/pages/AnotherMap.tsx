import { FC, useState, useLayoutEffect, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  ImageOverlay,
  // useMapEvents,
} from "react-leaflet";
import { useMap, useMapEvents } from "react-leaflet/hooks";
import L from "leaflet";
import Modal from "@/components/Modal";
import "../App.css";
import "leaflet/dist/leaflet.css";
import MapUrl from "../assets/map/overlay10.png";
import { API_ENDPOINT } from "../config/apiEndpoint";
import axios, { AxiosResponse } from "axios";
import { SvgString } from "@/components/svg";

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

const Markerwhatever: FC<any> = ({ coords, setFunc }) => {
  const map = useMap();

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
          },
        }}
      >
        <Popup>
          <div className="text-center font-bold mb-2">Details</div>
          Plot Number: {coords["plotNumber"]}
          <br />
          Lat: {coords["latitude"]}
          <br />
          Long: {coords["longitude"]}
          <br />
          Block Name: {coords["blockName"]}
          <br />
        </Popup>
      </Marker>
    </div>
  );
};

const AnotherMap = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [arratLATLONG, setArratLATLONG] = useState<Models[] | []>([]);
  const draggableMarker = true;
  useLayoutEffect(() => {
    axios
      .get(`${API_ENDPOINT}/plots/get-plot`)
      .then((res: AxiosResponse<Response>) => {
        // @ts-ignore
        setArratLATLONG([...res.data.data]);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}/plots/get-plot`)
      .then((res: AxiosResponse<Response>) => {
        // @ts-ignore
        setArratLATLONG([...res.data.data]);
      });
  }, [refetch]);
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setLatitude(lat);
        setLongitude(lng);
        setIsModal(true);
      },
    });
    return null;
  };
  return (
    <div style={{ position: "relative" }}>
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

      {/* @ts-ignore */}
      {isModal && (
        <Modal
          closeModal={() => setIsModal(false)}
          toggle={(plot, blockName) => {
            if (latitude && longitude && plot && blockName) {
              setIsLoading(true);
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
                  setRefetch(!refetch);
                })
                .finally(() => {
                  setIsLoading(false);
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
        <MapClickHandler />
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

export default AnotherMap;
