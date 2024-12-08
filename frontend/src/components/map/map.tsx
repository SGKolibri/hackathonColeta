import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { HiMiniMapPin } from "react-icons/hi2";

const containerStyle = {
  width: "100%",
  height: "450px",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
};

// 16°19'46.3"S 48°56'49.3"W
const position = {
  lat: -16.329527,
  lng: -48.947028,
};

export default function MapComponent() {
  const { isLoaded } = useJsApiLoader({
    id: import.meta.env.VITE_GOOGLE_MAPS_ID,
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const location = navigator.geolocation;
  console.log(location);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={15}>
      <>
        <Marker position={position} />
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}
