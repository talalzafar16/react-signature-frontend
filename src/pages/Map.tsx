import { FC, useState } from 'react';
import { MapContainer, TileLayer, Popup, Marker, ImageOverlay } from 'react-leaflet'
import { useMap } from 'react-leaflet/hooks'
import '../App.css'
import 'leaflet/dist/leaflet.css';
import MapUrl from '../assets/map/overlay3.png'
import L from 'leaflet';

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
  className: 'custom-svg-icon',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -36]
});


type Coordinates = [number, number][];
const Markerwhatever: FC<any> = ({ coords, setFunc }) => {
  const map = useMap();

  return (
    <div>
      <Marker
      // @ts-ignore
        icon={svgIcon}
        position={coords}
        eventHandlers={{
          click: (e) => {
            map.flyTo(e.latlng, 17);
            setFunc((prevCoord) =>  prevCoord.filter( (prevCoord) => prevCoord.filter((coord) => JSON.stringify(coord) !== JSON.stringify(e.latlng))
                // or (coord) => coord.lat !== pos.lat && coord.lng !== pos.lng 
              )
           )
          },
        }}
      >
        <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
      </Marker>
    </div>
  );
}
const Map = () => {
  // const  = [51.505, -0.09]
  const [arratLATLONG, setArratLATLONG] = useState<Coordinates>([[31.462254, 74.196334], [31.463052, 74.194269], [31.467729, 74.184702], [31.47226, 74.189333]])
  // const arratLATLONG: Coordinates  = [[31.462254,74.196334], [31.463052, 74.194269], [31.467729, 74.184702], [31.47226, 74.189333]]
  // const bounds = new LatLngBounds([31.48734, 74.170899], [31.437555, 74.209462])
  return (
    // @ts-ignore
    <MapContainer center={[31.46081, 74.18806]} zoom={15} scrollWheelZoom={false}>
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ImageOverlay
        url={MapUrl}
        bounds={[[31.48734, 74.170899], [31.437555, 74.209462]]}
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
      {
        arratLATLONG.map((item: [number, number]) => (
          <Markerwhatever coords={item} setFunc={setArratLATLONG} />
        ))
      }
    </MapContainer>
  )
}

export default Map