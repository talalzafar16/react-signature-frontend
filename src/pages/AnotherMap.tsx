import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useLayoutEffect } from "react";

import MapTile8 from "../assets/map/tiles/8.png";
import MapTile7 from "../assets/map/tiles/7.png";
import MapTile2 from "../assets/map/tiles/2.png";
import MapTile3 from "../assets/map/tiles/3.png";
import MapTile4 from "../assets/map/tiles/4.png";
import MapTile5 from "../assets/map/tiles/5.png";
import MapTile9 from "../assets/map/9.png";
import MapTile6 from "../assets/map/tiles/6.png";
import Modal from "@/components/Modal";
import "../App.css";
import "leaflet/dist/leaflet.css";
import MapUrl from "../assets/map/overlay10.png";
import { API_ENDPOINT } from "../config/apiEndpoint";
import axios, { AxiosResponse } from "axios";

type Models = {
  plotNumber: string;
  latitude: number;
  longitude: number;
};

interface Response {
  data: Models[];
  message: string;
}

const AnotherMap = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [arratLATLONG, setArratLATLONG] = useState<Models[] | []>([]);
  const [refetch, setRefetch] = useState<boolean>(false);

  const INITIAL_CENTER = [74.1936, 31.456];
  const INITIAL_ZOOM = 16.5;
  const mapRef = useRef();
  const mapContainerRef = useRef();

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}/plots/get-plot`)
      .then((res: AxiosResponse<Response>) => {
        // @ts-ignore
        setArratLATLONG([...res.data.data]);
      });
  }, [refetch]);
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
      const Tile9Coordinates = [
        [74.1964, 31.454134], // Bottom-left (Southwest) (increased longitude)
        [74.20628, 31.454134], // Bottom-right (Southeast) (unchanged)
        [74.20598, 31.4483], // Top-right (Northeast) (unchanged)
        [74.1961, 31.4483], // Top-left (Northwest) (increased longitude)
      ];
      const Tile6Coordinates = [
        [74.19562, 31.4628], // Bottom-left (Southwest) (unchanged)
        [74.20553, 31.4628], // Bottom-right (Southeast) (reduced longitude)
        [74.205507, 31.454136], // Top-right (Northeast) (reduced longitude)
        [74.19563, 31.454132], // Top-left (Northwest) (unchanged)
      ];

      const Tile5Coordinates = [
        [74.1833, 31.47291], // Bottom-left (Southwest) (longitude increased)
        [74.1958, 31.47291], // Bottom-right (Southeast) (unchanged)
        [74.19563, 31.45406], // Top-right (Northeast) (unchanged)
        [74.183, 31.45406], // Top-left (Northwest) (longitude increased)
      ];
      const Tile4Coordinates = [
        [74.1708, 31.47294], // Bottom-left (Southwest)
        [74.1833, 31.47294], // Bottom-right (Southeast) (aligned with Tile5's bottom-left)
        [74.183, 31.45406], // Top-right (Northeast) (aligned with Tile5's top-left)
        [74.1705, 31.45406], // Top-left (Northwest)
      ];

      const Tile3Coordinates = [
        [74.19574, 31.46886], // Bottom-left (moved slightly left)
        [74.1986, 31.46886], // Bottom-right (moved slightly left)
        [74.1986, 31.462754], // Top-right (moved slightly left)
        [74.19574, 31.462754], // Top-left (moved slightly left)
      ];

      const Tile8Coordinates = [
        [74.183, 31.4541], // Bottom-left (Southwest) (longitude decreased)
        [74.19563, 31.4541], // Bottom-right (Southeast) (longitude decreased)
        [74.19546, 31.433298], // Top-right (Northeast) (longitude decreased)
        [74.1829, 31.433298], // Top-left (Northwest) (longitude decreased)
      ];
      const Tile7Coordinates = [
        [74.1703, 31.45409], // Bottom-left (Southwest) (longitude decreased)
        [74.183, 31.45409], // Bottom-right (Southeast) (matches Tile8's bottom-left longitude)
        [74.1829, 31.43393], // Top-right (Northeast) (matches Tile8's top-left longitude)
        [74.1702, 31.43393], // Top-left (Northwest) (longitude decreased)
      ];

      const Tile2Coordinates = [
        [74.18439, 31.48302], // Bottom-left (moved slightly right)
        [74.20125, 31.48292], // Bottom-right (moved slightly right)
        [74.20073, 31.46981], // Top-right (moved slightly right)
        [74.184162, 31.469853], // Top-left (moved slightly right)
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
        Tile2Coordinates.reduce((sum, [x]) => sum + x, 0) /
          Tile2Coordinates.length,
        Tile2Coordinates.reduce((sum, [, y]) => sum + y, 0) /
          Tile2Coordinates.length,
      ];

      // Apply rotation
      const rotatedCoordinates = rotateCoordinates(
        Tile2Coordinates,
        -19.8,
        center
      );

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
      // @ts-ignore
      mapRef.current.on("click", (e) => {
        const lngLat = e.lngLat;
        setLatitude(lngLat.lat);
        setLongitude(lngLat.lng);
        setIsModal(true);
        console.log("lol", {
          lat: lngLat.lat,
          lng: lngLat.lng,
        });
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
    if (arratLATLONG.length > 0) {
      const markers = arratLATLONG.map((plot) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [plot.longitude, plot.latitude],
        },
        properties: {
          plotNumber: plot.plotNumber,
          // Additional properties as needed
        },
      }));

      const map = mapRef.current;
      // Check if the layers already exist and remove them if necessary
      if (
        // @ts-ignore
        map.getLayer("clusters")
      ) {
        // @ts-ignore
        map.removeLayer("clusters");
      }
      if (
        // @ts-ignore
        map.getLayer("cluster-count")
      ) {
        // @ts-ignore
        map.removeLayer("cluster-count");
      }
      if (
        // @ts-ignore
        map.getLayer("unclustered-point")
      ) {
        // @ts-ignore
        map.removeLayer("unclustered-point");
      }
      // Check if the source already exists and remove it if necessary
      // @ts-ignore
      if (map.getSource("markers")) {
        // @ts-ignore
        map.removeSource("markers");
      }

      // Add the markers as a GeoJSON source with clustering
      // @ts-ignore
      map.addSource("markers", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: markers,
        },
        cluster: true,
        clusterMaxZoom: 14, // Max zoom for clustering
        clusterRadius: 50, // Cluster radius
      });

      // Add clusters layer
      // @ts-ignore
      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "markers",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#51bbd6",
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
            100,
            30,
            750,
            40,
          ],
        },
      });

      // Add cluster count layer
      // @ts-ignore
      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "markers",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
        paint: {
          "text-color": "#ffffff",
        },
      });

      // Add unclustered point layer
      // @ts-ignore
      map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "markers",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#11b4da",
          "circle-radius": 6,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });
    }
  }, [arratLATLONG]);

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
            } else {
              alert("data");
            }
          }}
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

export default AnotherMap;
