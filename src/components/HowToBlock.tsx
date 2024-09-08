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
} from "@chakra-ui/react";

const HowToBlock = () => {
  return (
    <>
      {/* <Box m="10px"> */}
        <Popover>
          <PopoverTrigger>
            <Button>使い方</Button>
          </PopoverTrigger>
          <PopoverContent ml="10px" bg="#E6FFFA">
            <PopoverArrow bg="#E6FFFA" />
            <PopoverCloseButton />
            <PopoverHeader>世界地図を使った投稿Webアプリ</PopoverHeader>
            <PopoverBody>
              ①好きな国や行ったことがある国の地図をクリック
            </PopoverBody>
            <PopoverBody>
              ②国が表示されるので、おすすめスポットや食べ物を投稿してみましょう
            </PopoverBody>
          </PopoverContent>
        </Popover>
      {/* </Box> */}
      {/* <Box m="10px" position="fixed" bottom="0"> */}
        <Button position="fixed" bottom="0">ログアウト</Button>
      {/* </Box> */}
    </>
  );
};

export default HowToBlock;
