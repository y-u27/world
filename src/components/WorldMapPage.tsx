// 世界地図表示
'use client';

import { Box } from '@chakra-ui/react';
import HowToBlock from './HowToBlock';
import { GoogleMap, LoadScript, InfoWindow, Marker } from '@react-google-maps/api';
import { useState } from 'react';
import Link from 'next/link';

const googleMapsApiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;

const WorldMapPage = () => {
  // const [size, setSize] = useState<undefined | google.maps.Size>(undefined);
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

  /** 特定の国をクリックしたときの処理 */
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat() || 35.6762;
    const lng = e.latLng?.lng() || 155.6503;

    // クリックした地点の中心座標と国名を取得
    // TIPS: Geocoder は、緯度経度から住所を取得するためのクラス
    // TIPS: LoadScript読み込むことで、windowオブジェクトからGoogle Map APIが利用できる
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results) {
        const country = results.find((result) => result.types.includes('country'));
        if (country) {
          setSelectedCountry(country.formatted_address);
          setMapCenter({ lat, lng });
          setMarkedCountries((prevMarkedCountries) => {
            const isExist = prevMarkedCountries.some((prevCountry) => prevCountry.name === country.formatted_address);
            if (isExist) return prevMarkedCountries;
            return [...prevMarkedCountries, { name: country.formatted_address, lat, lng }];
          });
        }
      } else {
        console.error('国情報の取得に失敗しました', status);
      }
    });
  };

  const InfoWindowOptions = {
    pixelOffset: undefined,
  };

  // const createOffsetSize = () => {
  //   return setSize(new window.google.maps.Size(0, -45));
  // };

  const mapContainerStyle = {
    width: '100vw',
    height: '95vh',
  };

  const mapStyle = {
    background: 'white',
    fontSize: 10,
  };

  const options = {
    disableDefaultUI: false, // デフォルトのUI（ズームコントロールなど）を無効化
    draggable: true, // ドラッグを無効化
    zoomControl: false, // ズーム操作を無効化
    scrollwheel: true, // スクロールホイールによるズームを無効化
    disableDoubleClickZoom: true, // ダブルクリックによるズームを無効化
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
            }}
          >
            {markedCountries.map((country) => (
              <Marker key={country.name} position={{ lat: country.lat, lng: country.lng }} />
            ))}
            {markedCountries.map((country) =>
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
