import { FC, useState } from 'react';
import { MapContainer, TileLayer, Popup, Marker, ImageOverlay } from 'react-leaflet'
import { useMap } from 'react-leaflet/hooks'
import '../App.css'
import 'leaflet/dist/leaflet.css';
import MapUrl from '../assets/map/overlay3.png'

type Coordinates = [number, number][];
const Markerwhatever: FC<any> = ({ coords, setFunc }) => {
  const map = useMap();

  return (
    <div>
      <Marker
        // icon={props.icon}
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