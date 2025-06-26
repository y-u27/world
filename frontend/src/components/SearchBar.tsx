"use client";

import { Box, Collapse, IconButton, Input } from "@chakra-ui/react";
import { useState } from "react";
import { TbMapSearch } from "react-icons/tb";

const SearchBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearchIcon = () => {
    setIsSearchOpen((prev) => !prev);
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
          mr="2"
        />
      </Collapse>
    </Box>
  );
};

export default SearchBar;
