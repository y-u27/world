import { Box, Button } from "@chakra-ui/react";
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
        mb="8px"
        mr="5px"
      >
        <Box mt="3px" textAlign="center">
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
