"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import UserImage from "./UserImage";
import { TiArrowBackOutline } from "react-icons/ti";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PostResponse } from "../app/types/postType";
import { useSession } from "next-auth/react";

type UserInformationProps = {
  imagePath: string;
  userName: string;
  comment: string;
  email: string;
};

interface ApiResponse {
  data: PostResponse[];
}

async function fetchUserPost(userId: string): Promise<PostResponse[]> {
  const userPostResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/world-posts/userId/${userId}`,
    {
      cache: "no-store",
    }
  );

  const userPostData: ApiResponse = await userPostResponse.json();
  console.log("APIレスポンス:", userPostData);
  return userPostData.data;
}

const UserInformation: React.FC<UserInformationProps> = ({
  imagePath,
  userName,
  comment,
  email,
}) => {
  const { data: session, status } = useSession();
  const [comments, setComment] = useState(comment);
  const [isEditing, setIsEditing] = useState(false);
  const [tempComment, setTempComment] = useState(comment);
  const [userPosts, setUserPosts] = useState<PostResponse[]>([]);
  const toast = useToast();

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserPost(session.user.id).then((data) => setUserPosts(data));
    }
  }, [session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //入力中の値を更新
    setTempComment(e.target.value);
  };

  const handleEditClick = () => {
    //通常モードに戻す
    setIsEditing(true);
  };

  //コメントを編集後、保存→画面遷移後も編集したコメント保持
  const handleSaveClick = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: tempComment, email: email }),
      });
      if (res.ok) {
        setComment(tempComment);
        setIsEditing(false);
      }
    } catch (error) {
      toast({
        title: "コメントが保存できませんでした",
        description: "もう一度お試しください",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (status === "loading") return <Text>Loading...</Text>;
  if (!session) return <Text>ログインしてください</Text>;

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
          <Flex>
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
            {/* コメント編集 */}
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
                  <Button onClick={handleSaveClick}>保存</Button>
                ) : (
                  <Button onClick={handleEditClick}>編集</Button>
                )}
              </Box>
            </Box>
          </Flex>
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
      {/* 投稿一覧取得・表示 */}
      <Box mt="30px">
        <Text fontSize="2xl" mb="10px">
          あなたの投稿
        </Text>
        {!userPosts || userPosts.length === 0 ? (
          <Text>投稿はまだありません</Text>
        ) : (
          userPosts.map((userPost) => (
            <Box
              key={userPost.id}
              border="1px solid #ccc"
              borderRadius="md"
              p="10px"
              mb="10px"
            >
              <Text>{userPost.content}</Text>
            </Box>
          ))
        )}
      </Box>
    </>
  );
};

export default UserInformation;
