import { Box, Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Header = () => {
  
  return (
    <>
      <Box>
        <Heading
          color="#000080"
          bgColor="#b0c4de"
          textAlign="center"
          h={10}
          size="md"
          textShadow="1px 1px #ffffff"
          p={2}
        >
          World Map SNS
        </Heading>
        
      </Box>
    </>
  );
};

export default Header;
