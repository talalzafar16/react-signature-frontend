import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useLayoutEffect } from "react";

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
      .get(`${API_ENDPOINT}/plots/get-plot`)
      .then((res: AxiosResponse<Response>) => {
        // @ts-ignore
        setArratLATLONG([...res.data.data]);
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
      minZoom: 12,
    });

    // @ts-ignore
    mapRef.current.on("load", () => {
      const bounds = [
        [74.168, 31.474], // Southwest corner
        [74.213, 31.4483], // Northeast corner
      ];

      // Calculate the center of the image
      const center = [
        (bounds[0][0] + bounds[1][0]) / 2,
        (bounds[0][1] + bounds[1][1]) / 2,
      ];

      // Rotation angle in degrees
      const rotationAngle = -17;
      const radians = (rotationAngle * Math.PI) / 180;

      // Function to rotate a point around the center
      const rotatePoint = (
        point: number[],
        center: number[],
        angle: number
      ): number[] => {
        const [cx, cy] = center;
        const [x, y] = point;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        return [
          cos * (x - cx) - sin * (y - cy) + cx, // New x
          sin * (x - cx) + cos * (y - cy) + cy, // New y
        ];
      };

      const coordinates = [
        rotatePoint([bounds[0][0], bounds[0][1]], center, radians), // Bottom-left
        rotatePoint([bounds[1][0], bounds[0][1]], center, radians), // Bottom-right
        rotatePoint([bounds[1][0], bounds[1][1]], center, radians), // Top-right
        rotatePoint([bounds[0][0], bounds[1][1]], center, radians), // Top-left
      ];

      // @ts-ignore
      mapRef.current.addSource("overlay-image", {
        type: "image",
        url: MapUrl,
        coordinates: coordinates,
      });

      // @ts-ignore
      mapRef.current.addLayer({
        id: "overlay-layer",
        type: "raster",
        source: "overlay-image",
      });
      setIsLoading(false);
    });

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
    return () => {
      // @ts-ignore
      mapRef.current.remove();
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
