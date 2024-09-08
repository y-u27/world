// 世界地図表示
"use client";

import { Box } from "@chakra-ui/react";
import HowToBlock from "./HowToBlock";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const WorldMapPage = () => {
  const mapContainerStyle = {
    width: "80%",
    height: "530px",
  };

  // 東京の緯度軽度
  const center = {
    lat: 35.6762,
    lng: 139.6503,
  };

  // 世界全体表示
  const zoom = 2;

  const options = {
    disableDefaultUI: true, // デフォルトのUI（ズームコントロールなど）を無効化
    draggable: false, // ドラッグを無効化
    zoomControl: false, // ズーム操作を無効化
    scrollwheel: false, // スクロールホイールによるズームを無効化
    disableDoubleClickZoom: true, // ダブルクリックによるズームを無効化
  };

  const googleMapsApiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    return <Box>Google Maps API キーが見つかりません。</Box>;
  }

  return (
    <>
      <HowToBlock />
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={zoom}
          options={options}
        ></GoogleMap>
      </LoadScript>
    </>
  );
};

export default WorldMapPage;
