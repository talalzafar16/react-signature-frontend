import { useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useLayoutEffect } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import MapUrl from "../assets/map/overlay10.png";
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
  const INITIAL_ZOOM = 16.5;
  const [showSaleModal, setShowSaleModal] = useState<Boolean>(false);
  const [showEnquireyModal, setShowEnquireyModal] = useState<Boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState<Boolean>(false);
  const mapRef = useRef();
  const markersRef = useRef([]);
  const mapContainerRef = useRef();

  const Popup = (coords: any) => {
    return `
      <div style="padding-left:14px">
        <div style="text-align: center; font-weight: bold; margin-bottom: 8px;">Details</div>
        Plot Number: ${coords["PlotNumbers"]}
        <br />
        Block: ${coords["Block"]}
        <br />
        Plot Location: ${coords["PlotLocation"]}
        <br />
        Plot Type: ${coords["PlotType"]}
        <br />
        Status: ${coords["Status"]}
        <br />
        Transfer Status: ${coords["TransferStatus"]}
        <br />
        Area in Marl: ${coords["AreaInMarla"]} marla
        <br />
        Demand: ${coords["DemandInLacs"]} lacs
        <div style="width: 100%; padding: 8px; display: flex; justify-content: center; gap: 8px; flex-direction: column;">
          <a
            style="background-color: #60A5FA; display: flex; height: 32px; justify-content: center; align-items: center; padding: 8px; gap: 8px; color: white; border-radius: 8px; text-decoration: none;"
            href="https://wa.me/03111786929"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p style="color: white;">Contact Us</p>
            <FaPhone color="white" />
          </a>
        </div>
      </div>
    `;
  };
  const handleFlyToMarker = (longitude, latitude) => {
    // Fly to the marker location
    if (mapRef.current) {
      // @ts-ignore
      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 18, // You can adjust the zoom level as needed
        speed: 0.5, // The speed of the flyTo (0.0 - 1.0)
        curve: 0.8, // The curve of the fly (1 = straight line, < 1 = curved)
      });
    }
  };
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
      // style: "mapbox://styles/mapbox/streets-v11",
      // @ts-ignore
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
      minZoom: 14,
    });

    // @ts-ignore
    mapRef.current.on("load", () => {
      const bounds = [
        [74.168, 31.474], // Southwest corner
        [74.213, 31.4483], // Northeast corner
      ];

      // Calculate the center of the image
      const center = [
        (bounds[0][0] + bounds[1][0]) / 2, // Longitude (x)
        (bounds[0][1] + bounds[1][1]) / 2, // Latitude (y)
      ];

      // Rotation angle in degrees
      const rotationAngle = -17; // Rotate by 45 degrees
      const radians = (rotationAngle * Math.PI) / 180;

      // Function to rotate a point around the center
      const rotatePoint = (
        point: number[],
        center: number[],
        angle: number
      ): number[] => {
        const [cx, cy] = center; // Center coordinates
        const [x, y] = point; // Point to rotate
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        return [
          cos * (x - cx) - sin * (y - cy) + cx, // New x
          sin * (x - cx) + cos * (y - cy) + cy, // New y
        ];
      };

      // Calculate the rotated coordinates
      const coordinates = [
        rotatePoint([bounds[0][0], bounds[0][1]], center, radians), // Bottom-left
        rotatePoint([bounds[1][0], bounds[0][1]], center, radians), // Bottom-right
        rotatePoint([bounds[1][0], bounds[1][1]], center, radians), // Top-right
        rotatePoint([bounds[0][0], bounds[1][1]], center, radians), // Top-left
      ];
      // @ts-ignore
      mapRef.current.addSource("overlay-image", {
        type: "raster",
        url: MapUrl,
        coordinates: coordinates,
      });

      // @ts-ignore
      mapRef.current.addLayer({
        id: "overlay-layer",
        type: "raster",
        // source: {
        //   type: "raster",
        //   tiles: MapUrl ,
        //   // bounds: coordinates, // [westLng, southLat, eastLng, northLat]
        //   tileSize: 256, // Tile size in pixels (usually 256 or 512)
        // },
        source: "overlay-image",
        tileSize: 256, 
        paint: {
          "raster-opacity": 1.0, // Ensure full opacity
        },
      });
      setTimeout(() => {
        setIsLoading(false); // Hide the loading indicator
      }, 2000);
    });

    return () => {
      // @ts-ignorev
      mapRef?.current?.remove();
    };
  }, []);

  useLayoutEffect(() => {
    if (markersRef.current.length > 0) {
      markersRef.current.forEach((marker) => {
        marker.remove();
      });
      markersRef.current = []; // Reset markers
    }
    if (arratLATLONG.length > 0 && searchedPlot.length == 0) {
      arratLATLONG.forEach((plot) => {
        const marker = new mapboxgl.Marker()
          // @ts-ignore
          .setLngLat([plot.longitude, plot.latitude])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(Popup(plot))) // @ts-ignore
          .addTo(mapRef.current);
        markersRef.current.push(marker);
        // @ts-ignore
        marker.getElement().addEventListener("click", () => {
          // @ts-ignore

          handleFlyToMarker(plot.longitude, plot.latitude);
        });
      });
    }

    if (searchedPlot.length > 0) {
      searchedPlot.forEach((plot) => {
        const marker = new mapboxgl.Marker()
          // @ts-ignore
          .setLngLat([plot.longitude, plot.latitude])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(Popup(plot))) // @ts-ignore
          .addTo(mapRef.current);
        markersRef.current.push(marker);
        // @ts-ignore
        marker.getElement().addEventListener("click", () => {
          // @ts-ignore
        });
      });
      handleFlyToMarker(searchedPlot[0].longitude, searchedPlot[0].latitude);
    }
  }, [arratLATLONG, searchedPlot]);

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
