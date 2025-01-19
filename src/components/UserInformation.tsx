"use client";

import { Box, Button, Card, CardBody, Input, Text } from "@chakra-ui/react";
import UserImage from "./UserImage";
import { TiArrowBackOutline } from "react-icons/ti";
import Link from "next/link";
import { useState } from "react";

type UserInformationProps = {
  imagePath: string;
  userName: string;
};

const UserInformation: React.FC<UserInformationProps> = ({
  imagePath,
  userName,
}) => {
  const [comment, setComment] = useState("ここにコメントを入力");
  const [isEditing, setIsEditing] = useState(false);
  const [tempComment, setTempComment] = useState(comment);

  const handleEditClick = () => {
    //現在のコメントを一時保存
    setTempComment(comment);
    //通常モードに戻す
    setIsEditing(true);
  };

  const handleSavaClick = () => {
    //編集内容を保存
    setComment(tempComment);
    //通常モードに戻す
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //入力中の値を更新
    setTempComment(e.target.value);
  };

  return (
    <>
      <Card
        width={["90%", "70%", "50%", "380px"]}
        mx="auto"
        mt={["30px", "40px", "50px"]}
        boxShadow="2xl"
        borderRadius="lg"
        padding={["10px", "15px", "20px"]}
      >
        <CardBody>
          <Text pt="20px" textAlign="center" fontFamily="revert" fontSize="3xl">
            Profile
          </Text>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={["15px", "20px", "20px"]}
          >
            <UserImage imagePath={imagePath} userName={userName} />
            <Text
              mt={["5px", "10px", "10px"]}
              fontSize={["lg", "xl", "xl"]}
              fontWeight="bold"
            >
              {userName}
            </Text>
          </Box>
          <Box mt={["20px", "30px", "30px"]}>
            {isEditing ? (
              <>
                <Input
                  value={tempComment}
                  onChange={handleInputChange}
                  placeholder="コメント入力"
                />
                <Button ml="10%" onClick={handleSavaClick}>保存</Button>
              </>
            ) : (
              <>
                <Text fontSize="lg" mt="10px">{comment}</Text>
                <Button ml="10%" onClick={handleEditClick}>
                  編集
                </Button>
              </>
            )}
          </Box>
          <Box
            display="flex"
            alignItems="center"
            mt={["20px", "30px", "30px"]}
            fontWeight="bold"
          >
            <TiArrowBackOutline />
            <Link href="/world">
              <Text ml="5px">地図へに戻る</Text>
            </Link>
          </Box>
        </CardBody>
      </Card>
    </>
  );
};

export default UserInformation;
