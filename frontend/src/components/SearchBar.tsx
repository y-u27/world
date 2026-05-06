"use client";

import { CloseIcon } from "@chakra-ui/icons";
import { Box, Collapse, IconButton, Input } from "@chakra-ui/react";
import { useState } from "react";
import { TbMapSearch } from "react-icons/tb";

type Props = {
  onSearch: (countryName: string) => void;
};

const SearchBar = ({ onSearch }: Props) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() !== "") {
      //国ズーム
      onSearch(query.trim());
      //入力クリア
      setQuery("");
    }
  };

  return (
    <Box position="relative" display="flex" alignItems="center">
      {/* 検索アイコン */}
      <IconButton
        aria-label="検索"
        icon={<TbMapSearch />}
        onClick={handleSearch}
        size="md"
        variant="ghost"
      />

      {/* 検索窓 */}
      <Input
        placeholder="国名を入力"
        background="white"
        size="sm"
        width="180px"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </Box>
  );
};

export default SearchBar;
