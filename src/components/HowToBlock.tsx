// 「使い方」表示
// ログアウト

import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";

const HowToBlock = () => {
  return (
    <>
      <Portal>
        <Box>
          <Popover>
            <PopoverTrigger>
              <Button position="fixed" top="10">使い方</Button>
            </PopoverTrigger>
            <PopoverContent ml="10px" bg="#E6FFFA">
              <PopoverArrow bg="#E6FFFA" />
              <PopoverCloseButton />
              <PopoverHeader>世界地図を使った投稿Webアプリ</PopoverHeader>
              <PopoverBody>
                ①好きな国や行ったことがある国の赤いピンをクリック
              </PopoverBody>
              <PopoverBody>
                ②国名のポップアップをクリックして、その国の地図が表示されたら、おすすめスポットや食べ物を投稿してみましょう
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Button position="fixed" bottom="5">
            ログアウト
          </Button>
        </Box>
      </Portal>
    </>
  );
};

export default HowToBlock;
