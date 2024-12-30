import { useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useLayoutEffect } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
// import MapUrl from "../assets/map/overlay10.png";

import MapTile8 from "../assets/map/tiles/8.png";
import MapTile7 from "../assets/map/tiles/7.png";
import MapTile2 from "../assets/map/tiles/2.png";
import MapTile3 from "../assets/map/tiles/3.png";
import MapTile4 from "../assets/map/tiles/4.png";
import MapTile5 from "../assets/map/tiles/5.png";
import MapTile6 from "../assets/map/tiles/6.png";
import MapTile9 from "../assets/map/9.png";
import { API_ENDPOINT } from "../config/apiEndpoint";
import axios, { AxiosResponse } from "axios";
import { TbFilterSearch } from "react-icons/tb";
import { MdOutlineSell } from "react-icons/md";
import EnquireyModal from "@/components/EnquireyModal";
import FilterModal from "@/components/FilterModal";
import SaleYourPlotModal from "@/components/SaleYourPlotModal";
import { CiMail } from "react-icons/ci";
type Models = {
  plotNumber: string;
  latitude: number;
  longitude: number;
};

interface Response {
  data: Models[];
  message: string;
}

const Map = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchedPlot, setSearchedPlot] = useState<Models[] | []>([]);
  const [arratLATLONG, setArratLATLONG] = useState<Models[] | []>([]);
  const INITIAL_CENTER = [74.1936, 31.456];
  const INITIAL_ZOOM = 13.5;
  const [showSaleModal, setShowSaleModal] = useState<Boolean>(false);
  const [showEnquireyModal, setShowEnquireyModal] = useState<Boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState<Boolean>(false);
  const mapRef = useRef();
  // const markersRef = useRef([]);
  const mapContainerRef = useRef();

  // const Popup = (coords: any) => {
  //   return `
  //     <div style="padding-left:14px">
  //       <div style="text-align: center; font-weight: bold; margin-bottom: 8px;">Details</div>
  //       Plot Number: ${coords["PlotNumbers"]}
  //       <br />
  //       Block: ${coords["Block"]}
  //       <br />
  //       Plot Location: ${coords["PlotLocation"]}
  //       <br />
  //       Plot Type: ${coords["PlotType"]}
  //       <br />
  //       Status: ${coords["Status"]}
  //       <br />
  //       Transfer Status: ${coords["TransferStatus"]}
  //       <br />
  //       Area in Marl: ${coords["AreaInMarla"]} marla
  //       <br />
  //       Demand: ${coords["DemandInLacs"]} lacs
  //       <div style="width: 100%; padding: 8px; display: flex; justify-content: center; gap: 8px; flex-direction: column;">
  //         <a
  //           style="background-color: #60A5FA; display: flex; height: 32px; justify-content: center; align-items: center; padding: 8px; gap: 8px; color: white; border-radius: 8px; text-decoration: none;"
  //           href="https://wa.me/03111786929"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           <p style="color: white;">Contact Us</p>
  //           <FaPhone color="white" />
  //         </a>
  //       </div>
  //     </div>
  //   `;
  // };
  // const handleFlyToMarker = (longitude, latitude) => {
  //   // Fly to the marker location
  //   if (mapRef.current) {
  //     // @ts-ignore
  //     mapRef.current.flyTo({
  //       center: [longitude, latitude],
  //       zoom: 18, // You can adjust the zoom level as needed
  //       speed: 0.5, // The speed of the flyTo (0.0 - 1.0)
  //       curve: 0.8, // The curve of the fly (1 = straight line, < 1 = curved)
  //     });
  //   }
  // };
  useLayoutEffect(() => {
    axios
      .get(`${API_ENDPOINT}/users/get-plots`)
      .then((res: AxiosResponse<Response>) => {
        // @ts-ignore
        setArratLATLONG([...res.data]);
      });
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2lnbmF0dXJlbGFuZHMiLCJhIjoiY200d2J6Y29jMGQwczJxc2Y3MzBmeDhpZCJ9.CLBIlBACiro2UT8Cabo1OQ";
    // @ts-ignore
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      // @ts-ignore
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      minZoom: 13,
      pitch: 0, // disable pitch
      bearing: 0, // disable rotation
    });
    // @ts-ignore
    mapRef.current.dragRotate.disable();
    // @ts-ignore
    mapRef.current.touchZoomRotate.disableRotation();
    // @ts-ignore
    mapRef.current.on("load", () => {
      // const bounds = [
      //   [74.168, 31.474], // Southwest corner
      //   [74.213, 31.4483], // Northeast corner
      // ];

      // Calculate the center of the image
      // const center = [
      //   (bounds[0][0] + bounds[1][0]) / 2, // Longitude (x)
      //   (bounds[0][1] + bounds[1][1]) / 2, // Latitude (y)
      // ];

      // Rotation angle in degrees
      // const rotationAngle = -17; // Rotate by 45 degrees
      // const radians = (rotationAngle * Math.PI) / 180;

      // Function to rotate a point around the center
      // const rotatePoint = (
      //   point: number[],
      //   center: number[],
      //   angle: number
      // ): number[] => {
      //   const [cx, cy] = center; // Center coordinates
      //   const [x, y] = point; // Point to rotate
      //   const cos = Math.cos(angle);
      //   const sin = Math.sin(angle);

      //   return [
      //     cos * (x - cx) - sin * (y - cy) + cx, // New x
      //     sin * (x - cx) + cos * (y - cy) + cy, // New y
      //   ];
      // };

      // Calculate the rotated coordinates
      // const coordinates = [
      //   [74.20374011939652, 31.455016879470384], //tl
      //   [74.21077383341484, 31.451860152757864], //tr
      //   [74.2065988060348, 31.441283120529616], //br
      //   [74.18522616658516, 31.4539847242136], //bl
      // ];
      // a,b
      // c and d
      const Tile9Coordinates = [
        [74.1964, 31.454134], // Bottom-left (Southwest) (increased longitude)
        [74.20628, 31.454134], // Bottom-right (Southeast) (unchanged)
        [74.20598, 31.4483], // Top-right (Northeast) (unchanged)
        [74.1961, 31.4483], // Top-left (Northwest) (increased longitude)
      ];
      // change b  and d to move map from top
      // change a  and c to move map toward right
      // const coordinates = [
      //   rotatePoint([bounds[0][0], bounds[0][1]], center, radians), // Bottom-left
      //   rotatePoint([bounds[1][0], bounds[0][1]], center, radians), // Bottom-right
      //   rotatePoint([bounds[1][0], bounds[1][1]], center, radians), // Top-right
      //   rotatePoint([bounds[0][0], bounds[1][1]], center, radians), // Top-left
      // ];
      
      const Tile6Coordinates = [
        [74.19562, 31.4628],  // Bottom-left (Southwest) (unchanged)
        [74.20553, 31.4628],  // Bottom-right (Southeast) (reduced longitude)
        [74.205507, 31.454136], // Top-right (Northeast) (reduced longitude)
        [74.19563, 31.454132], // Top-left (Northwest) (unchanged)
      ];
      
      const Tile5Coordinates = [
        [74.1833, 31.47291], // Bottom-left (Southwest) (longitude increased)
        [74.1958, 31.47291], // Bottom-right (Southeast) (unchanged)
        [74.19563, 31.45406], // Top-right (Northeast) (unchanged)
        [74.1830, 31.45406], // Top-left (Northwest) (longitude increased)
      ];
      const Tile4Coordinates = [
        [74.1708, 31.47291], // Bottom-left (Southwest)
        [74.1833, 31.47291], // Bottom-right (Southeast) (aligned with Tile5's bottom-left)
        [74.1830, 31.45406], // Top-right (Northeast) (aligned with Tile5's top-left)
        [74.1705, 31.45406], // Top-left (Northwest)
      ];
      
      const Tile3Coordinates = [
        [74.19574, 31.46886], // Bottom-left (moved slightly left)
        [74.19860, 31.46886], // Bottom-right (moved slightly left)
        [74.19860, 31.462754], // Top-right (moved slightly left)
        [74.19574, 31.462754], // Top-left (moved slightly left)
      ];
      
      const Tile8Coordinates = [
        [74.1830, 31.4541], // Bottom-left (Southwest) (longitude decreased)
        [74.19563, 31.4541], // Bottom-right (Southeast) (longitude decreased)
        [74.19546, 31.433298], // Top-right (Northeast) (longitude decreased)
        [74.1829, 31.433298], // Top-left (Northwest) (longitude decreased)
      ];
      const Tile7Coordinates = [
        [74.1703, 31.45409], // Bottom-left (Southwest) (longitude decreased)
        [74.1830, 31.45409], // Bottom-right (Southeast) (matches Tile8's bottom-left longitude)
        [74.1829, 31.43393], // Top-right (Northeast) (matches Tile8's top-left longitude)
        [74.1702, 31.43393], // Top-left (Northwest) (longitude decreased)
      ];
      
      const Tile2Coordinates = [
        [74.18434, 31.48302], // Bottom-left (moved slightly right)
        [74.201244, 31.48296], // Bottom-right (moved slightly right)
        [74.200724, 31.469879], // Top-right (moved slightly right)
        [74.18411, 31.469864], // Top-left (moved slightly right)
      ];
      
      const rotateCoordinates = (coords, angleDeg, center) => {
        const angleRad = (angleDeg * Math.PI) / 180; // Convert to radians
        const cosTheta = Math.cos(angleRad);
        const sinTheta = Math.sin(angleRad);
        
        return coords.map(([x, y]) => {
          const [cx, cy] = center; // Center of rotation
          const dx = x - cx; // Translate point to origin
          const dy = y - cy;
          
          // Apply rotation
          const nx = dx * cosTheta - dy * sinTheta + cx;
          const ny = dx * sinTheta + dy * cosTheta + cy;
          
          return [nx, ny];
        });
      };
      
      // Center of rotation (average of all coordinates)
      const center = [
        Tile2Coordinates.reduce((sum, [x]) => sum + x, 0) / Tile2Coordinates.length,
        Tile2Coordinates.reduce((sum, [, y]) => sum + y, 0) / Tile2Coordinates.length,
      ];
      
      // Apply rotation
      const rotatedCoordinates = rotateCoordinates(Tile2Coordinates, -19.8, center);
      
// @ts-ignore
mapRef.current.addSource("overlay-image-7", {
  type: "image",
  url: MapTile7,
  coordinates: Tile7Coordinates,
});
// @ts-ignore
mapRef.current.addSource("overlay-image-8", {
  type: "image",
  url: MapTile8,
  coordinates: Tile8Coordinates,
});
// @ts-ignore
mapRef.current.addSource("overlay-image-3", {
  type: "image",
  url: MapTile3,
  coordinates: Tile3Coordinates,
});
      // @ts-ignore
      mapRef.current.addSource("overlay-image-2", {
        type: "image",
        url: MapTile2,
        coordinates: rotatedCoordinates,
      });
      
      // @ts-ignore
      mapRef.current.addSource("overlay-image-4", {
        type: "image",
        url: MapTile4,
        coordinates: Tile4Coordinates,
      });
      // @ts-ignore
      mapRef.current.addSource("overlay-image-5", {
        type: "image",
        url: MapTile5,
        coordinates: Tile5Coordinates,
      });
      // @ts-ignore
      mapRef.current.addSource("overlay-image-9", {
        type: "image",
        url: MapTile9,
        coordinates: Tile9Coordinates,
      });
      // @ts-ignore
      mapRef.current.addSource("overlay-image-6", {
        type: "image",
        url: MapTile6,
        coordinates: Tile6Coordinates,
      });

  
      // @ts-ignore
      mapRef.current.addLayer({
        id: "overlay-layer-7",
        type: "raster",
        source: "overlay-image-7",
      });
      // @ts-ignore
      mapRef.current.addLayer({
        id: "overlay-layer-4",
        type: "raster",
        source: "overlay-image-4",
      });

      // @ts-ignore
      mapRef.current.addLayer({
        id: "overlay-layer-5",
        type: "raster",
        source: "overlay-image-5",
      });
      // @ts-ignore
      mapRef.current.addLayer({
        id: "overlay-layer-6",
        type: "raster",
        source: "overlay-image-6",
      });
      // @ts-ignore
      mapRef.current.addLayer({
        id: "overlay-layer-8",
        type: "raster",
        source: "overlay-image-8",
      });
      // @ts-ignore
      mapRef.current.addLayer({
        id: "overlay-layer-9",
        type: "raster",
        source: "overlay-image-9",
      });
         // @ts-ignore
         mapRef.current.addLayer({
          id: "overlay-layer-2",
          type: "raster",
          source: "overlay-image-2",
        });
         // @ts-ignore
 mapRef.current.addLayer({
  id: "overlay-layer-3",
  type: "raster",
  source: "overlay-image-3",
});
      // @ts-ignore
      // mapRef.current.addLayer({
      //   id: "overlay-layer-6",
      //   type: "raster",
      //   source: "overlay-image-6",
      // });
      setTimeout(() => {
        setIsLoading(false); // Hide the loading indicator
      }, 2000);
    });

    return () => {
      // @ts-ignorev
      mapRef?.current?.remove();
    };
  }, []);

  // useLayoutEffect(() => {
  //   if (arratLATLONG.length > 0 && searchedPlot.length === 0) {
  //     // Create a GeoJSON object for all markers
  //     const geoJsonData = {
  //       type: "FeatureCollection",
  //       features: arratLATLONG.map((plot) => ({
  //         type: "Feature",
  //         geometry: {
  //           type: "Point",
  //           coordinates: [plot.longitude, plot.latitude],
  //         },
  //         properties: {
  //           popupContent: Popup(plot),
  //           plot,
  //         },
  //       })),
  //     };

  //     // Add the GeoJSON source to the map
  //     // @ts-ignore
  //     if (mapRef.current.getSource("markers")) {
  //       // @ts-ignore
  //       mapRef.current.getSource("markers").setData(geoJsonData);
  //     } else {
  //       // @ts-ignore
  //       mapRef.current.addSource("markers", {
  //         type: "geojson",
  //         data: geoJsonData,
  //         cluster: true,
  //         clusterMaxZoom: 14,
  //         clusterRadius: 50,
  //       });

  //       // @ts-ignore
  //       mapRef.current.addLayer({
  //         id: "clusters",
  //         type: "circle",
  //         source: "markers",
  //         filter: ["has", "point_count"],
  //         paint: {
  //           "circle-color": "#51bbd6",
  //           "circle-radius": 18,
  //         },
  //       });

  //       // @ts-ignore
  //       mapRef.current.addLayer({
  //         id: "cluster-count",
  //         type: "symbol",
  //         source: "markers",
  //         filter: ["has", "point_count"],
  //         layout: {
  //           "text-field": "{point_count_abbreviated}",
  //           "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
  //           "text-size": 12,
  //         },
  //       });

  //       // @ts-ignore
  //       mapRef.current.addLayer({
  //         id: "unclustered-point",
  //         type: "circle",
  //         source: "markers",
  //         filter: ["!", ["has", "point_count"]],
  //         paint: {
  //           "circle-color": "#ff5200",
  //           "circle-radius": 8,
  //         },
  //       });
  //     }
  //   }
  //   // @ts-ignore
  //   if (searchedPlot.length > 0) {
  //     // Handle searched plot markers
  //     const geoJsonData = {
  //       type: "FeatureCollection",
  //       features: searchedPlot.map((plot) => ({
  //         type: "Feature",
  //         geometry: {
  //           type: "Point",
  //           coordinates: [plot.longitude, plot.latitude],
  //         },
  //         properties: {
  //           popupContent: Popup(plot),
  //           plot,
  //         },
  //       })),
  //     };

  //     // Add the GeoJSON source for searched plots
  //     // @ts-ignore

  //     if (mapRef.current.getSource("searched-markers")) {
  //       // @ts-ignore

  //       mapRef.current.getSource("searched-markers").setData(geoJsonData);
  //     } else {
  //       // @ts-ignore
  //       mapRef.current.addSource("searched-markers", {
  //         type: "geojson",
  //         data: geoJsonData,
  //       });
  //       // @ts-ignore
  //       mapRef.current.addLayer({
  //         id: "searched-markers",
  //         type: "circle",
  //         source: "searched-markers",
  //         paint: {
  //           "circle-color": "#FF0000", // Red for searched plot
  //           "circle-radius": 8,
  //         },
  //       });
  //     }

  //     // Fly to the first searched plot
  //     handleFlyToMarker(searchedPlot[0].longitude, searchedPlot[0].latitude);
  //   }

  //   // Cleanup markers on map update
  //   return () => {
  //     // @ts-ignore
  //     if (mapRef?.current) {
  //       // @ts-ignore
  //       // if (mapRef?.current?.getSource("markers")) {
  //       //   // @ts-ignore
  //       //   mapRef.current?.removeLayer("clusters");
  //       //   // @ts-ignore
  //       //   mapRef.current.removeLayer("cluster-count");
  //       //   // @ts-ignore
  //       //   mapRef.current.removeLayer("unclustered-point");
  //       //   // @ts-ignore
  //       //   mapRef.current.removeSource("markers");
  //       // }
  //       // @ts-ignore
  //       // if (mapRef.current.getSource("searched-markers")) {
  //       //   // @ts-ignore
  //       //   mapRef.current.removeLayer("searched-markers");
  //       //   // @ts-ignore
  //       //   mapRef.current.removeSource("searched-markers");
  //       // }
  //     }
  //   };
  // }, [arratLATLONG, searchedPlot]);
  return (
    <div style={{ position: "relative" }}>
      <div className="absolute top-8 right-8 z-[1000]">
        <div className="flex w-full ml-3 gap-3">
          <button
            className="bg-green-700 md:h-8 flex justify-center items-center gap-2 p-2 rounded-lg text-white"
            onClick={() => {
              setShowFilterModal(true);
            }}
          >
            <TbFilterSearch color="white" />
          </button>

          <button
            className="bg-yellow-600 md:h-8  flex justify-center items-center gap-2 p-2 rounded-lg text-white"
            onClick={() => {
              setShowSaleModal(true);
            }}
          >
            Sale Your Plot
            <MdOutlineSell color="white" />
          </button>
          <button
            className="bg-yellow-600 md:h-8 flex justify-center items-center gap-2 p-2 rounded-lg text-white"
            onClick={() => {
              setShowEnquireyModal(true);
            }}
          >
            Make an Enquiry
            <CiMail color="white" />
          </button>
        </div>
      </div>
      {isLoading && (
        <div
          className="backdrop-blur-md"
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
          <h1 className="text-2xl text-primary">Fetching Plots ...</h1>
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

      <div
        className="h-screen w-screen"
        id="map-container"
        ref={mapContainerRef}
      />
    </div>
  );
};

export default Map;
