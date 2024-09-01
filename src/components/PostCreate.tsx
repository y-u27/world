import { Box, Button, Input, Text } from "@chakra-ui/react";
import React from "react";

const PostCreate = () => {
  return (
    <>
      <Text pt={20} textAlign="center" fontFamily="revert" fontSize="3xl">
        投稿フォーム
      </Text>
      <Box display="flex" justifyContent="center">
        <Box flexDirection="column">
          <Text>タイトル</Text>
          <Input type="text" width={500} />
          <Text>投稿内容</Text>
          <Input type="text" height={200} width={500} />
          <Text>日時</Text>
          <Input type="date" width={500} />
          <Box mt='5%' px='45%'>
            <Button>投稿</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PostCreate;
