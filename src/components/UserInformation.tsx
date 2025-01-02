"use client";

import { Box, Button, Card, CardBody, Input, Text } from "@chakra-ui/react";
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
            マイプロフィール
          </Text>
          <Box pt="20px" textAlign="center" fontFamily="revert">
            <Text>{userName}</Text>
          </Box>
          <Box display="flex" justifyContent="center" mt={4}>
            <UserImage imagePath={imagePath} userName={userName} />
          </Box>
          <Text>コメント欄</Text>
          <Box display="flex" justifyContent="center" mt={4}>
            <Input/>
          </Box>
          <Box>
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
