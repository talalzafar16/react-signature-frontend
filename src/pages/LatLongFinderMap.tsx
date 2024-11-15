import { useState } from "react";
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
import L from "leaflet";

const LatLongFinderMap = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [position, setPosition] = useState(null);
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
          <Marker
            // @ts-ignore
            icon={svgIcon}
            position={position}
          >
            <Popup>
              <b>Latitude:</b>
              {position[0]}
              <br />
              <b>Longitude:</b>
              {position[1]}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default LatLongFinderMap;
