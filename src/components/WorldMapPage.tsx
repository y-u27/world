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

const googleMapsApiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;

const DEFAULT_OPTIONS = {
  disableDefaultUI: false, // デフォルトのUI（ズームコントロールなど）を無効化
  draggable: true, // ドラッグを無効化
  zoomControl: false, // ズーム操作を無効化
  scrollwheel: true, // スクロールホイールによるズームを無効化
  disableDoubleClickZoom: true, // ダブルクリックによるズームを無効化
};

const WorldMapPage = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 35.6762, lng: 155.6503 });
  const [zoom, setZoom] = useState(2.3);
  const [markedCountries, setMarkedCountries] = useState<
    {
      name: string;
      lat: number;
      lng: number;
    }[]
  >([]);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat() || 35.6762;
    const lng = e.latLng?.lng() || 155.6503;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results) {
        const country = results.find((result) =>
          result.types.includes("country")
        );
        if (country) {
          setSelectedCountry(country.formatted_address);
          setMapCenter({ lat, lng });
          setMarkedCountries((prevMarkedCountries) => {
            const isExist = prevMarkedCountries.some(
              (prevCountry) => prevCountry.name === country.formatted_address
            );
            if (isExist) return prevMarkedCountries;
            return [
              ...prevMarkedCountries,
              { name: country.formatted_address, lat, lng },
            ];
          });
        }
      } else {
        console.error("国情報の取得に失敗");
      }
    });
  };

  const InfoWindowOptions = {
    maxWidth: 100,
  };

  const mapContainerStyle = {
    width: "100vw",
    height: "95vh",
  };

  // 世界全体表示
  // const zoom = 2.3;

  // 各国のリスト
  // const countries = [
  //   {
  //     name: "Australia",
  //     lat: -33.8688,
  //     lng: 151.2093,
  //     flag: "🇦🇺",
  //   },
  //   {
  //     name: "China",
  //     lat: 34,
  //     lng: 117,
  //     flag: "🇨🇳",
  //   },
  //   {
  //     name: "America",
  //     lat: 38,
  //     lng: -85,
  //     flag: "🇺🇸",
  //   },
  //   {
  //     name: "Japan",
  //     lat: 35.6762,
  //     lng: 139.6503,
  //     flag: "🇯🇵",
  //   },
  //   {
  //     name: "the United Kingdom",
  //     lat: 51.5074,
  //     lng: -0.1278,
  //     flag: "🇬🇧",
  //   },
  //   {
  //     name: "French",
  //     lat: 48.8566,
  //     lng: 2.3522,
  //     flag: "🇫🇷",
  //   },
  //   {
  //     name: "German",
  //     lat: 52.52,
  //     lng: 13.405,
  //     flag: "🇩🇪",
  //   },
  //   {
  //     name: "Canada",
  //     lat: 45.4215,
  //     lng: -75.6972,
  //     flag: "🇨🇦",
  //   },
  //   {
  //     name: "Russia",
  //     lat: 55.7558,
  //     lng: 100.6173,
  //     flag: "🇷🇺",
  //   },
  //   {
  //     name: "India",
  //     lat: 28.6139,
  //     lng: 77.209,
  //     flag: "🇮🇳",
  //   },
  //   {
  //     name: "Brazil",
  //     lat: -15.8267,
  //     lng: -47.9218,
  //     flag: "🇧🇷",
  //   },
  //   {
  //     name: "South Africa",
  //     lat: -25.7479,
  //     lng: 28.2293,
  //     flag: "🇿🇦",
  //   },
  //   {
  //     name: "Italy",
  //     lat: 41.9028,
  //     lng: 12.4964,
  //     flag: "🇮🇹",
  //   },
  //   {
  //     name: "Korea",
  //     lat: 37.5665,
  //     lng: 126.978,
  //     flag: "🇰🇷",
  //   },
  //   {
  //     name: "Thailand",
  //     lat: 13.7563,
  //     lng: 100.5018,
  //     flag: "🇹🇭",
  //   },
  // ];

  const mapStyle = {
    background: "white",
    fontSize: 10,
  };

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
            center={mapCenter}
            zoom={zoom}
            options={options}
            onClick={(e) => {
              console.log(e);
              handleMapClick(e);
              setZoom(5);
              setOptions((prevoptions) => {
                return {
                  ...prevoptions,
                  draggable: false,
                  scrollwheel: false,
                  disableDefaultUI: false,
                };
              });
            }}
          >
            {markedCountries.map((country) => (
              <Marker
                key={country.name}
                position={{ lat: country.lat, lng: country.lng }}
                onClick={() => setSelectedCountry(country.name)}
              />
            ))}
            {markedCountries.map((country) =>
              selectedCountry === country.name ? (
                <InfoWindow
                  key={country.name}
                  position={{ lat: country.lat, lng: country.lng }}
                  options={InfoWindowOptions}
                  onCloseClick={() => {
                    setSelectedCountry(null);
                    setOptions(DEFAULT_OPTIONS);
                    setZoom(2.3)
                  }}
                >
                  <Link href="/world/1">
                    <Box style={mapStyle}>
                      {country.name}
                    </Box>
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
