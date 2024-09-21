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
import { useRef, useState } from "react";
import Link from "next/link";
import PostLists from "./PostLists";

// google map api
const googleMapsApiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;

// オプションのデフォルト値
const DEFAULT_OPTIONS = {
  disableDefaultUI: false, // デフォルトのUI（ズームコントロールなど）を無効化
  draggable: true, // ドラッグを無効化
  zoomControl: false, // ズーム操作を無効化
  scrollwheel: true, // スクロールホイールによるズームを無効化
  disableDoubleClickZoom: true, // ダブルクリックによるズームを無効化
};

const WorldMapPage = () => {
  // 国を選択するuseState
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  // ↓各国の緯度経度の初期値
  const [mapCenter, setMapCenter] = useState({ lat: 35.6762, lng: 155.6503 });
  // ↓それぞれの国をズームの初期値
  const [zoom, setZoom] = useState(2.3);
  // ↓各国のマップの名前・緯度経度の型の初期値?
  const [markedCountries, setMarkedCountries] = useState<
    {
      name: string;
      lat: number;
      lng: number;
    }[]
  >([]);
  // ↓マップのオプション
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  // クリックした地点の中心座標と国名を取得
  // TIPS: LoadScript読み込むことで、windowオブジェクトからGoogle Map APIが利用できる
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat() || 35.6762;
    const lng = e.latLng?.lng() || 155.6503;

    // TIPS: Geocoder は、緯度経度から住所を取得するためのクラス
    const geocoder = new window.google.maps.Geocoder();
    // 第一引数のlocationにlat(緯度)とlng(経度)、第二引数にresultsとstatusを渡す
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      // if文 ①statusがOKかつresultsの場合、resultsからcountryを含むresultを見つける
      if (status === "OK" && results) {
        const country = results.find((result) =>
          result.types.includes("country")
        );
        // ②さらにcountryの場合、国の住所・緯度経度・条件に一つでも合う国にマーカーを表示させる
        if (country) {
          setSelectedCountry(country.formatted_address);
          setMapCenter({ lat, lng });
          // ↓以前にマーカーを表示した国が以前の国名と国の住所と一致しているかを判定している?
          setMarkedCountries((prevMarkedCountries) => {
            const isExist = prevMarkedCountries.some(
              (prevCountry) => prevCountry.name === country.formatted_address
            );
            // ③①と②がどちらも存在する場合、マーカーを表示し、マーカー＋国の住所＋緯度経度を表示させる
            if (isExist) return prevMarkedCountries;
            return [
              ...prevMarkedCountries,
              { name: country.formatted_address, lat, lng },
            ];
          });
        }
        // 上記以外の場合、「国情報の取得に失敗」のメッセージをconsoleに出力する
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
        <PostLists />
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
                    setZoom(2.3);
                  }}
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
