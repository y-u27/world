// 投稿フォーム
"use client";

import { Box, Button, Input, Text } from "@chakra-ui/react";

const PostCreate = () => {
  return (
    <>
      <Text pt={20} textAlign="center" fontFamily="revert" fontSize="3xl">
        投稿フォーム
      </Text>
      <Box display="flex" justifyContent="center">
        <Box flexDirection="column">
          <Text>タイトル</Text>
          <Input type="text" width="320px" />
          <Text>投稿内容</Text>
          <Input type="text" height={200} width="320px" />
          <Text>日時</Text>
          <Input type="date" width="320px" />
          <Box mt="5%" px="43%">
            <Button _hover={{background:"#FAF089",color:"#319795"}}>投稿</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PostCreate;
