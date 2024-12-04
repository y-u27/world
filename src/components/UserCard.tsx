import { Box, Modal, useDisclosure } from "@chakra-ui/react";
import React from "react";

const UserCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
  <Box>
    {/* <Modal isOpen={isOpen} onClose={onClose}></Modal> */}
  </Box>
  );
};

export default UserCard;
