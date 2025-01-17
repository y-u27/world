"use client";

import { Box, Card, CardBody, Input, Text } from "@chakra-ui/react";
import UserImage from "./UserImage";
import { TiArrowBackOutline } from "react-icons/ti";
import Link from "next/link";

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
            Profile
          </Text>
          <Box
            position="relative"
            top="5px"
            left="30%"
            pt="20px"
            textAlign="center"
            fontFamily="revert"
          >
            <Text>{userName}</Text>
          </Box>
          <Box
            position="relative"
            top="5px"
            left="20%"
            pt="20px"
            boxSize="sm"
          >
            <UserImage imagePath={imagePath} userName={userName} />
          </Box>
          <Box mt="5%">
            <Text>コメント欄</Text>
          </Box>
          <Box display="flex" justifyContent="right" mt={5}>
            <Input />
          </Box>
          <Box mt={3}>
            <TiArrowBackOutline />
            <Link href="/world">
              <Text>地図へに戻る</Text>
            </Link>
          </Box>
        </CardBody>
      </Card>
    </>
  );
};

export default UserInformation;
