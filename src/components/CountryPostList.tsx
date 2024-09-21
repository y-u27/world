// "use client";

// 各国表示＋投稿一覧
// import { Box } from "@chakra-ui/react";
// import PostLists from "./PostLists";
// import { GoogleMap, LoadScript } from "@react-google-maps/api";
// import { useState } from "react";

// Google map api
// const googleMapsApiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;

// オプションデフォルト値
// const DEFAULT_OPTIONS = {
  // disableDefaultUI: true, // デフォルトのUI（ズームコントロールなど）を無効化
  // draggable: true, // ドラッグを無効化
  // zoomControl: true, // ズーム操作を無効化
  // scrollwheel: true, // スクロールホイールによるズームを無効化
  // disableDoubleClickZoom: true, // ダブルクリックによるズームを無効化
// };

// const CountryPostList = () => {
  // ↓各国の緯度経度の初期値
  // const [mapCenter, setMapCenter] = useState({ lat: 35.6762, lng: 155.6503 });
  // ↓それぞれの国をズームの初期値
  // const [zoom, setZoom] = useState(4.5);
  // ↓マップのオプション
  // const [options, setOptions] = useState(DEFAULT_OPTIONS);
  
  // const mapContainerStyle = {
  //   width: "100vw",
  //   height: "95vh",
  // };

  // オーストラリアの緯度軽度
//   const center = {
//     lat: -33.8688,
//     lng: 151.2093,
//   };

//   if (!googleMapsApiKey) {
//     return <Box>Google Maps API キーが見つかりません。</Box>;
//   }

//   return (
//     <>
//       <Box>
//         <PostLists />
//         <LoadScript googleMapsApiKey={googleMapsApiKey}>
//           <GoogleMap
//             mapContainerStyle={mapContainerStyle}
//             center={center}
//             zoom={zoom}
//             options={options}
//           ></GoogleMap>
//         </LoadScript>
//       </Box>
//     </>
//   );
// };

// export default CountryPostList;
