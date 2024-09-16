"use client";

// 各国表示＋投稿一覧
import { Box } from "@chakra-ui/react";
import PostLists from "./PostLists";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const googleMapsApiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;

const CountryPostList = () => {
  const mapContainerStyle = {
    width: "100vw",
    height: "95vh",
  };

  // オーストラリアの緯度軽度
  const center = {
    lat: -33.8688,
    lng: 151.2093,
  };

  // 世界全体表示
  const zoom = 4;

  const options = {
    disableDefaultUI: true, // デフォルトのUI（ズームコントロールなど）を無効化
    draggable: true, // ドラッグを無効化
    zoomControl: true, // ズーム操作を無効化
    scrollwheel: false, // スクロールホイールによるズームを無効化
    disableDoubleClickZoom: true, // ダブルクリックによるズームを無効化
  };

  if (!googleMapsApiKey) {
    return <Box>Google Maps API キーが見つかりません。</Box>;
  }

  return (
    <>
      <Box>
        <PostLists />
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={zoom}
            options={options}
          ></GoogleMap>
        </LoadScript>
      </Box>
    </>
  );
};

export default CountryPostList;
