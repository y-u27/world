// 世界地図表示
"use client";

import { Box } from "@chakra-ui/react";
import HowToBlock from "./HowToBlock";
import {
  GoogleMap,
  LoadScript,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import { useState } from "react";
import Link from "next/link";

const WorldMapPage = () => {
  const [size, setSize] = useState<undefined | google.maps.Size>(undefined);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const InfoWindowOptions = {
    pixelOffset: size,
  };

  // const createOffsetSize = () => {
  //   return setSize(new window.google.maps.Size(0, -45));
  // };

  //
  const mapContainerStyle = {
    width: "100vw",
    height: "95vh",
  };

  // 東京の緯度軽度
  const center = {
    lat: 35.6762,
    lng: 155.6503,
  };

  // 世界全体表示
  const zoom = 2.3;

  // 各国のリスト
  const countries = [
    {
      name: "Australia",
      lat: -33.8688,
      lng: 151.2093,
    },
    {
      name: "China",
      lat: 34,
      lng: 117,
    },
    {
      name:"America",
      lat:38,
      lng:-77
    }
  ];

  const mapStyle = {
    background: "white",
    fontSize: 10,
  };

  const options = {
    disableDefaultUI: false, // デフォルトのUI（ズームコントロールなど）を無効化
    draggable: true, // ドラッグを無効化
    zoomControl: false, // ズーム操作を無効化
    scrollwheel: true, // スクロールホイールによるズームを無効化
    disableDoubleClickZoom: true, // ダブルクリックによるズームを無効化
  };

  const googleMapsApiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    return <Box>Google Maps API キーが見つかりません。</Box>;
  }

  return (
    <>
      <Box>
        <HowToBlock />
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={zoom}
            options={options}
          >
            {countries.map((country) => (
              <Marker
                key={country.name}
                position={{ lat: country.lat, lng: country.lng }}
                onClick={() => setSelectedCountry(country.name)}
              />
            ))}
            {countries.map((country) =>
              selectedCountry === country.name ? (
                <InfoWindow
                  key={country.name}
                  position={{ lat: country.lat, lng: country.lng }}
                  options={InfoWindowOptions}
                  onCloseClick={() => setSelectedCountry(null)}
                >
                  <Link href="/world/1">
                    <Box style={mapStyle}>{country.name}</Box>
                  </Link>
                </InfoWindow>
              ) : null
            )}
          </GoogleMap>
        </LoadScript>
      </Box>
    </>
  );
};

export default WorldMapPage;
