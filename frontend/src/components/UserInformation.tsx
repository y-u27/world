"use client";

import { Box, Button, Card, CardBody, Input, Text } from "@chakra-ui/react";
import UserImage from "./UserImage";
import { TiArrowBackOutline } from "react-icons/ti";
import Link from "next/link";
import { useEffect, useState } from "react";

type UserInformationProps = {
  id: number;
  imagePath: string;
  userName: string;
  comment: string;
  email: string;
};

const UserInformation: React.FC<UserInformationProps> = ({
  imagePath,
  userName,
  comment,
  email,
  id,
}) => {
  const [comments, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tempComment, setTempComment] = useState("");

  //ユーザー情報取得
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`);
        const data = await res.json();
        if (res.ok) {
          setComment(data.data.comment || "");
          setTempComment(data.data.comment || "");
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("ユーザーデータ取得に失敗", error);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //入力中の値を更新
    setTempComment(e.target.value);
  };

  const handleEditClick = () => {
    //通常モードに戻す
    setIsEditing(true);
  };

  //コメントを編集後、保存→画面遷移後も編集したコメント保持
  const handleSaveClick = async (id: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comment: tempComment, email: email }),
        }
      );
      if (res.ok) {
        setComment(tempComment);
        setIsEditing(false);
      } else {
        console.error("コメントの保存失敗");
      }
    } catch (error) {
      console.error("コメント保存失敗", error);
    }
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
            プロフィール
          </Text>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={["15px", "20px", "20px"]}
          >
            <UserImage
              imagePath={imagePath}
              userName={userName}
              comment={comments}
            />
            <Text
              mt={["5px", "10px", "10px"]}
              fontSize={["lg", "xl", "xl"]}
              fontWeight="bold"
            >
              {userName}
            </Text>
          </Box>
          <Box mt={["20px", "30px", "30px"]}>
            <Box display="flex" justifyContent="center">
              <Input
                value={tempComment}
                onChange={handleInputChange}
                width="80%"
                placeholder="コメントを入力"
              />
            </Box>
            <Box display="flex" justifyContent="center" mt="10px">
              {isEditing ? (
                <Button onClick={() => handleSaveClick(id)}>保存</Button>
              ) : (
                <Button onClick={handleEditClick}>編集</Button>
              )}
            </Box>
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
