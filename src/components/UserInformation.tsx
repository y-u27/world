"use client";

import { Box, Card, CardBody, Text } from "@chakra-ui/react";
import UserImage from "./UserImage";

type UserInformationProps = {
  imagePath: string;
  userName: string;
};

const UserInformation: React.FC<UserInformationProps> = ({
  imagePath,
  userName,
}) => {
  return (
    <>
      <Card
        width={["90%", "70%", "50%", "380px"]}
        mx="auto"
        mt="50px"
        boxShadow="2xl"
      >
        <CardBody>
          <Text pt="20px" textAlign="center" fontFamily="revert" fontSize="3xl">
            登録情報
          </Text>
          <Box pt="20px" textAlign="center" fontFamily="revert">
            <Text>名前</Text>
          </Box>
          <Box display="flex" justifyContent="center" mt={4}>
            <UserImage imagePath={imagePath} userName={userName} />
          </Box>
        </CardBody>
      </Card>
    </>
  );
};

export default UserInformation;
