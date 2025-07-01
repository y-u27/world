// 世界地図表示
"use client";

import { Box, Button, Spinner, useMediaQuery } from "@chakra-ui/react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { useState } from "react";
import PostLists from "./PostLists";
import SearchBar from "./SearchBar";

type Props = {
  userId: number;
};

// google map api
const googleMapsApiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY!;

// オプションのデフォルト値
const DEFAULT_OPTIONS = {
  disableDefaultUI: false, // デフォルトのUI（ズームコントロールなど）を無効化
  draggable: true, // ドラッグを無効化
  zoomControl: false, // ズーム操作を無効化
  scrollwheel: false, // スクロールホイールによるズームを無効化
  disableDoubleClickZoom: true, // ダブルクリックによるズームを無効化
};

const WorldMapPage = ({ userId }: Props) => {
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey,
    libraries: ["geometry", "drawing"],
  });
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
  // const router = useRouter();

  // メディアクエリ（レスポンシブ対応）
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  // 地図をクリックした時の中心座標と国名を取得
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat() || 35.6762;
    const lng = e.latLng?.lng() || 155.6503;

    // Geocoder は、緯度経度から住所を取得するためのクラス
    const geocoder = new window.google.maps.Geocoder();
    // 第一引数のlocationにlat(緯度)とlng(経度)、第二引数にresultsとstatusを渡す
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      // if文 ①statusがOKかつresultsの場合、resultsからcountryを含むresultを抽出
      if (status === "OK" && results) {
        const country = results.find((result) =>
          result.types.includes("country")
        );
        // ②さらにcountryの場合、国の住所・緯度経度が条件に一つでも合う国にマーカーと上部に国名を表示させる
        if (country) {
          setSelectedCountry(country.formatted_address);
          setMapCenter({ lat, lng });
          // ↓以前にマーカーを表示した国が以前の国名と国の住所と一致しているかを判定している
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

  // 国名を検索窓に入力することで緯度・経度を取得して地図に反映
  const handleSearchCountry = (countryName: string) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: countryName }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const location = results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        const address = results[0].formatted_address;

        setSelectedCountry(address);
        setMapCenter({ lat, lng });
        setZoom(5);
        setOptions((prev) => ({
          ...prev,
          draggable: false,
          scrollwheel: false,
          disableDefaultUI: false,
        }));

        setMarkedCountries((prev) => {
          const exists = prev.some((c) => c.name === address);
          if (exists) return prev;
          return [...prev, { name: address, lat, lng }];
        });
      } else {
        console.error("国の検索に失敗しました");
      }
    });
  };

  const InfoWindowOptions = {
    maxWidth: 100,
  };

  const mapContainerStyle = {
    width: "100vw",
    height: "93vh",
  };

  const mapStyle = {
    background: "white",
    fontSize: isLargerThan768 ? "14px" : "10px",
  };

  // 投稿一覧ボタンの出しわけ
  // 1. 地図上の任意の場所をクリックする
  // 2. 任意の場所の国にzoomする
  // 3. 画面右上に投稿一覧ボタンが表示される
  // →トリガーは、GoogleMapコンポーネントのonClickかonZoomChangedを使う
  // →stateを使ってボタンを表示する
  const [zoomPostList, setZoomPostList] = useState(false);

  const handleZoom = () => {
    setZoomPostList(!zoomPostList);
  };

  if (!isLoaded) {
    return (
      <Box>
        <Spinner
          my="20%"
          mx="48%"
          thickness="4px"
          speed="0.8s"
          emptyColor="gray.200"
          color="teal.200"
          size="lg"
        />
      </Box>
    );
  }

  return (
    <>
      <Box>
        {zoomPostList && selectedCountry && (
          <PostLists countryName={selectedCountry} userId={userId} />
        )}
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={zoom}
            options={options}
            onClick={(e) => {
              console.log(e);
              handleMapClick(e);
              setZoom(5);
              setOptions((prevOptions) => {
                return {
                  ...prevOptions,
                  draggable: false,
                  scrollwheel: false,
                  disableDefaultUI: false,
                };
              });
            }}
            onZoomChanged={handleZoom}
          >
            <SearchBar onSearch={handleSearchCountry} />
            {markedCountries.map((country) => (
              <Marker
                key={country.name}
                position={{ lat: country.lat, lng: country.lng }}
                onClick={() => setSelectedCountry(country.name)}
              />
            ))}
            {markedCountries.map((country) =>
              selectedCountry === country.name ? (
                // 4. ウィンドウを閉じた時に投稿一覧ボタンを非表示する
                // →トリガーは、InfoWindowコンポーネントのonCloseClickを使う
                // →stateを使ってボタンを非表示する
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
                  <Box style={mapStyle}>{country.name}</Box>
                </InfoWindow>
              ) : null
            )}
          </GoogleMap>
        )}
      </Box>
    </>
  );
};

export default WorldMapPage;
