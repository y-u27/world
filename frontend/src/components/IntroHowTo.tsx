import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  ListItem,
  OrderedList,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const IntroHowTo = () => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        w="100%"
        mt="30px"
        mr="5px"
      >
        <Box
          display="flex"
          flexDirection={["column", "row"]}
          justifyContent="center"
          alignItems="stretch"
          w={["90%", "80%", "70%"]}
          mt="60px"
          gap="20px"
        >
          <Box flex="1" minH="400px">
            <Box bgColor="yellow.50" p={[4, 6, 8]} h="100%" position="relative">
              <Heading
                position="absolute"
                top="-20px"
                left="20px"
                bg="white"
                px={[2, 4, 6]}
                transform="rotate(-3deg)"
                bgColor="teal.100"
                borderRadius={10}
                bgGradient="linear(to-r, teal.300, blue.200,gray.100)"
                fontWeight="none"
                size={["md", "lg", "xl"]}
              >
                サイト説明
              </Heading>
              <Text w="100%" ml="2%">
                <br />
                世界地図を使ったSNS風webサイト
                <br />
                国ごとのおすすめスポットや食べ物、その国に実際に行って感動したこと、「行ってみたい！」などの投稿をすることができます
              </Text>
            </Box>
          </Box>
          <Box flex="1" minH="400px">
            <Box p={[4, 6, 8]} h="100%" position="relative" bgColor="yellow.50">
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
                使い方
              </Heading>
              <VStack>
                <Accordion defaultIndex={[0]} allowMultiple>
                  <AccordionItem>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        好きな国や行ったことがある国をクリック
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Box px={[0, "10%", "240px"]}>
                        <Image
                          src="/sample/screenshot-20240930-202838.jpeg"
                          alt="Top Image"
                          width={900}
                          height={600}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        1で選択した国の地図が表示されたら、右上にある「投稿一覧」ボタンをクリック
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Box px={[0, "10%", "240px"]}>
                        <Image
                          src="/sample/スクリーンショット 2024-09-30 20.28.54.jpeg"
                          alt="Top Image"
                          width={900}
                          height={600}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        「投稿一覧」が表示されたら、実際に投稿してみましょう！
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Box px={[0, "10%", "240px"]}>
                        <Image
                          src="/sample/スクリーンショット 2024-11-22 21.51.17.jpeg"
                          alt="Top Image"
                          width={900}
                          height={600}
                          style={{ width: "100%", height: "auto" }}
                        />
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </VStack>
            </Box>
          </Box>
        </Box>
        <Box mt="40px" textAlign="center">
          <Link href="/login">
            <Button
              w={["90%", "90%", "300px"]}
              h="50px"
              bg="#b0c4de"
              boxShadow="xl"
              position="relative"
              overflow="hidden"
              color="#000080"
              textShadow="1px 1px #ffffff"
              zIndex={1}
              _before={{
                content: `""`,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#9bb8de",
                transition: "0.7s",
                transform: "translateX(-100%)",
                zIndex: 0,
              }}
              _after={{
                content: `">>>"`,
                position: "absolute",
                left: "45%",
                top: "50%",
                transform: "translateY(-50%) translateX(10px)",
                fontSize: "20px",
                color: "#000080",
                opacity: 0,
                transition: "0.7s",
                zIndex: 2,
              }}
              _hover={{
                _before: { transform: "translateX(0)" },
                _after: {
                  opacity: 1,
                  transform: "translateY(-50%)translateX(0)",
                },
              }}
            >
              ログインして投稿してみる
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default IntroHowTo;
