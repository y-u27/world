"use client"

import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WorldMapPage from "../components/WorldMapPage";

export default function Home() {
  const [searchCountry, setSearchCountry] = useState("");

  return (
    <>
      <SearchBar onSearch={setSearchCountry} />
      <WorldMapPage />
    </>
  );
}
