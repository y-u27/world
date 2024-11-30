import { Box, Card, CardBody } from "@chakra-ui/react";
import React from "react";

const MyPage = () => {
  return (
    <Box>
      <Card
        width={["90%", "70%", "50%", "380px"]}
        mx="auto"
        mt="3%"
        boxShadow="2xl"
      >
        <CardBody></CardBody>
      </Card>
    </Box>
  );
};

export default MyPage;
