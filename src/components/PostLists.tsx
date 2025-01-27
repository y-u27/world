"use client";

import { PostResponse } from "@/app/types/postType";
import {
  CloseIcon,
  DeleteIcon,
  EditIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Box,
  Card,
  CardBody,
  Text,
  Stack,
  Heading,
  CardHeader,
  Flex,
  Divider,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import UserImage from "./UserImage";
import Likes from "./Likes";

interface ApiResponse {
  data: PostResponse[];
}

type CountryProps = {
  id: number;
  countryName: string;
};

// ↓全投稿データ取得
async function fetchAllWorldPost(country: string): Promise<PostResponse[]> {
  const res = await fetch(
    `https://world-map-sns.vercel.app/api/world-posts?country-name=${country}`,
    {
      cache: "no-store",
    }
  );

  const postData: ApiResponse = await res.json();
  return postData.data;
}

const PostLists: React.FC<CountryProps> = ({
  id,
  countryName,
}: CountryProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [mapPostCards, setMapPostCards] = useState<PostResponse[]>([]);
  const toast = useToast();

  const drawerSize = useBreakpointValue({
    base: { left: "80%", top: "5%" },
    md: { left: "90%", top: "8%" },
  });

  const handleDeletePost = async (id: number) => {
    try {
      const response = await fetch(
        `https://world-map-sns.vercel.app/api/world-posts/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast({
          title: "投稿削除",
          description: "投稿を削除しました",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // 削除された投稿を除いた新しいリストに更新
        setMapPostCards((prevPostCards) =>
          prevPostCards.filter((post) => post.id !== id)
        );
      } else {
        toast({
          title: "投稿削除失敗",
          description: "投稿を削除できませんでした",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "エラー発生",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const getPostData = async () => {
      try {
        const postDatas: PostResponse[] = await fetchAllWorldPost(countryName);
        setMapPostCards(postDatas || []);
      } catch (error) {
        console.error("データ取得エラー", error);
        setMapPostCards([]);
      }
    };
    getPostData();
  }, [countryName]);

  return (
    <>
      <Box position="fixed" left="90%" top="8%" zIndex={1000}>
        <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
          投稿一覧
        </Button>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={drawerSize}
      >
        <DrawerOverlay />
        <DrawerContent
          maxWidth={{ base: "100%", md: "45%" }}
          marginLeft={{ base: "0", md: "auto" }}
        >
          <DrawerCloseButton />
          <DrawerHeader>{countryName}</DrawerHeader>
          <DrawerBody>
            {mapPostCards.map((mapPost) => (
              <Card
                mb="4%"
                key={mapPost.id}
                width={{ base: "100%", md: "90%" }}
                mx="auto"
              >
                <CardHeader>
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <UserImage
                      imagePath={mapPost.user.image}
                      userName={mapPost.user.name}
                    />
                    <Box>
                      <Heading size="sm">{mapPost.user.name}</Heading>
                    </Box>
                    <Spacer />
                    <Box>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label="Options"
                          icon={<HamburgerIcon />}
                          variant="outline"
                        />
                        <MenuList>
                          <Link href={`/world/edit/${mapPost.id}`}>
                            <MenuItem icon={<EditIcon />}>編集</MenuItem>
                          </Link>
                          <MenuItem
                            icon={<DeleteIcon />}
                            onClick={() => handleDeletePost(mapPost.id)}
                          >
                            削除
                          </MenuItem>
                          <MenuItem icon={<CloseIcon />}>閉じる</MenuItem>
                        </MenuList>
                      </Menu>
                    </Box>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Stack>
                    <Box>
                      <Heading size="md">{mapPost.title}</Heading>
                      <Divider />
                      <br />
                      <Text>{mapPost.content}</Text>
                      <br />
                      <Divider />
                    </Box>
                    <Box>
                      <Likes />
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </DrawerBody>
          <DrawerFooter>
            <Link href={`/world/create?country=${countryName}`}>
              <Button
                mr={{ base: "auto", md: "176px" }}
                onClick={onClose}
                _hover={{ background: "#FAF089", color: "#319795" }}
              >
                投稿
              </Button>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PostLists;
