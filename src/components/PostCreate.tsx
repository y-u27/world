// 投稿フォーム
"use client";

import { Box, Button, Card, CardBody, Input, Text } from "@chakra-ui/react";
import Link from "next/link";

const PostCreate = () => {
  return (
    <>
      <Card width="500px" mx="460px" mt="50px" boxShadow="2xl">
        <CardBody>
          <Text pt="20px" textAlign="center" fontFamily="revert" fontSize="3xl">
            投稿フォーム
          </Text>
          <Box display="flex" justifyContent="center">
            <Box flexDirection="column">
              <Text>タイトル</Text>
              <Input type="text" width="420px" />
              <Text>投稿内容</Text>
              <Input type="text" height="200px" width="420px" />
              <Text>日時</Text>
              <Input type="date" width="420px" />
              <Box m="20px" px="38%">
                <Link href="/world/1">
                <Button _hover={{ background: "#FAF089", color: "#319795" }}>
                  投稿
                </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </CardBody>
      </Card>
    </>
  );
};

export default PostCreate;
