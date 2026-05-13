import { QuestionOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";

const CtaButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Box>
        <IconButton
          aria-label="CTAボタン"
          onClick={onOpen}
          icon={<QuestionOutlineIcon bgSize={1} />}
          size="md"
          variant="ghost"
        />

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>サイト説明</ModalHeader>
            <ModalBody>
              <Text w="100%" ml="2%">
                <br />
                世界地図を使ったSNS風webサイト
                <br />
                国ごとのおすすめスポットや食べ物、その国に実際に行って感動したこと、「行ってみたい！」などの投稿をすることができます
              </Text>
            </ModalBody>
            <ModalHeader>使い方</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text w="100%" ml="2%">
                <br />
                1.好きな国や行ったことがある国をクリック
                <Image
                  src="/sample/screenshot-20240930-202838.jpeg"
                  alt="操作画面1"
                  width={900}
                  height={600}
                  style={{ width: "100%", height: "auto" }}
                />
                <br />
                2.選択した国の地図が表示されたら、右上にある「投稿一覧」ボタンをクリック
                <Image
                  src="/sample/screenshot-20240930-202854.jpeg"
                  alt="操作画面2"
                  width={900}
                  height={550}
                  style={{ width: "100%", height: "auto" }}
                />
                <br />
                3.「投稿一覧」が表示されたら、実際に投稿してみましょう！
                <Image
                  src="/sample/screenshot-20241122-215117.jpeg"
                  alt="操作画面3"
                  width={900}
                  height={600}
                  style={{ width: "100%", height: "auto" }}
                />
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default CtaButton;
