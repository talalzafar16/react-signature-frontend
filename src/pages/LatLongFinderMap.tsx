import {  useState } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  ImageOverlay,
  useMapEvents,
} from "react-leaflet";
import "../App.css";
import "leaflet/dist/leaflet.css";
import MapUrl from "../assets/map/overlay10.png";



const LatLongFinderMap = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [position, setPosition] = useState(null);

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
      },
    });
    return null;
  };
  const draggableMarker = true;

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
        {position && (
        <Marker position={position}>
          <Popup>
            <b>Latitude:</b>{position[0]}
            <br/>
             <b>
                Longitude: 
                </b>
                {position[1]}
          </Popup>
        </Marker>
      )}

     
      </MapContainer>
    </div>
  );
};

export default LatLongFinderMap;
