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
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearchIcon = () => {
    // ①検索バー開く
    if (!isSearchOpen) {
      setIsSearchOpen(true);
      // ②すでに検索バーが開いているなら、検索実行
    } else {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (query.trim() !== "") {
      onSearch(query.trim());
    }
  };

  return (
    <Box position="relative" display="flex" alignItems="center">
      {/* 検索アイコン */}
      <IconButton
        aria-label="検索"
        icon={<TbMapSearch />}
        onClick={toggleSearchIcon}
        size="md"
        variant="ghost"
      />

      {/* 検索窓（開閉） */}
      <Collapse in={isSearchOpen} animateOpacity>
        <Input
          placeholder="国名を入力"
          background="white"
          size="sm"
          width="180px"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton aria-label="閉じる" icon={<CloseIcon />} />
      </Collapse>
    </Box>
  );
};

export default SearchBar;
