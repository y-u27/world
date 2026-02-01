"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { TiArrowBackOutline } from "react-icons/ti";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PostResponse } from "../app/types/postType";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../utils/supabase/supabase";
import UserPageUserImage from "./UserPageUserImage";

type UserInformationProps = {
  imagePath: string;
  userName: string;
  comment: string;
  email: string;
};

type ApiResponse = {
  data: PostResponse[];
};

// ユーザー情報取得
async function fetchUserPost(userId: string): Promise<PostResponse[]> {
  const userPostResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/world-posts/userId/${userId}`,
    {
      cache: "no-store",
    },
  );

  const userPostData: ApiResponse = await userPostResponse.json();
  console.log("APIレスポンス:", userPostData);
  return userPostData.data;
}

// 国名取得
async function fetchCountryName(country: string) {
  const countryNameResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/world-posts?country-name=${country}`,
    {
      cache: "no-store",
    },
  );
  const countryData = await countryNameResponse.json();
  return countryData.data;
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
  const [countryName, setCountryName] = useState<
    { postId: number; name: string }[]
  >([]);
  const [updataImage, setUpdataImage] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserPost(session.user.id).then(async (datas) => {
        setUserPosts(datas);
        //各投稿に対応する国名取得
        const countryNames = await Promise.all(
          datas.map(async (data) => {
            const name = await fetchCountryName(data.countryName);
            return { postId: data.id, name };
          }),
        );
        setCountryName(countryNames);
      });
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

  //プロフィール画像変更処理
  const handleUpdateImage = async (file: File) => {
    try {
      const ext = file.name.split(".").pop();
      const filePath = `public/${uuidv4()}.${ext}`;

      //Storageにアップロード
      const { error } = await supabase.storage
        .from("user-image-buket")
        .upload(filePath, file);

      if (error) throw error;

      //公開URL取得
      const { data } = supabase.storage
        .from("user-image-buket")
        .getPublicUrl(filePath);

      if (!data?.publicUrl) {
        throw new Error("画像URL取得失敗");
      }

      //DB更新
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/image`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            image: data.publicUrl,
          }),
        },
      );

      if (!res.ok) throw new Error("DB更新失敗");

      //画面即時反映
      setUpdataImage(data.publicUrl);

      toast({
        title: "プロフィール画像を更新しました",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "画像更新に失敗しました",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Flex
        justify="center"
        align="start"
        gap={["30px", "50px", "80px"]}
        mt={["30px", "40px", "50px"]}
        flexDirection={["column", "column", "row"]}
        flexWrap="wrap"
      >
        {/* プロフィール */}
        <Card
          width={["90%", "70%", "380px"]}
          boxShadow="2xl"
          borderRadius="lg"
          padding={["10px", "15px", "20px"]}
        >
          <CardBody>
            <Heading
              position="absolute"
              top="-20px"
              left="20px"
              bg="white"
              px={[2, 4, 6]}
              transform="rotate(-3deg)"
              bgColor="teal.100"
              borderRadius={10}
              size={["md", "lg", "xl"]}
              bgGradient="linear(to-r, teal.300, blue.200,gray.100)"
              fontWeight="none"
            >
              プロフィール
            </Heading>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt={["15px", "20px", "20px"]}
            >
              <UserPageUserImage imagePath={imagePath} />
              {/* プロフィール画像変更処理 */}
              <Box>
                画像変更：
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const selectedUpdataFiles = e.target.files?.[0] || null;
                    if (selectedUpdataFiles) {
                      handleUpdateImage(selectedUpdataFiles);
                    }
                  }}
                />
              </Box>
              <Text mt="10px" fontSize={["lg", "xl", "xl"]} fontWeight="bold">
                {userName}
              </Text>
            </Box>
            {/* コメント編集 */}
            <Box mt={["20px", "30px", "30px"]}>
              <Box display="flex" justifyContent="center">
                <Input
                  value={tempComment}
                  onChange={handleInputChange}
                  width={["90%", "85%", "80%"]}
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
            <Box display="flex" alignItems="center" mt="30px" fontWeight="bold">
              <TiArrowBackOutline />
              <Link href="/world">
                <Text ml="5px">地図へに戻る</Text>
              </Link>
            </Box>
          </CardBody>
        </Card>
        {/* 投稿記事 */}
        <Card
          width={["90%", "70%", "380px"]}
          boxShadow="2xl"
          borderRadius="lg"
          padding={["10px", "15px", "20px"]}
        >
          <CardBody>
            <Box>
              <Heading
                position="absolute"
                top="-20px"
                left="20px"
                bg="white"
                px={[2, 4, 6]}
                transform="rotate(-3deg)"
                bgColor="teal.100"
                borderRadius={10}
                size={["md", "lg", "xl"]}
                bgGradient="linear(to-r, teal.300, blue.200,gray.100)"
                fontWeight="none"
              >
                投稿記事
              </Heading>
              <Box height="3em" overflow="auto">
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
                      <Text>{userPost.countryName}</Text>
                      <Text>{userPost.content}</Text>
                    </Box>
                  ))
                )}
              </Box>
            </Box>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};

export default UserInformation;
