import { Box, Heading, Text } from "@chakra-ui/react";

const Notice = () => {
  return (
    <>
      <Box>
        <Box
          bgColor="yellow.50"
          h="50%"
          w="100%"
          boxShadow="xl"
          borderRadius="10px"
        >
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
            お知らせ
          </Heading>
          <Text w="100%" ml="2%">
            {/* お知らせAPIを介してNewsテーブルからデータ取得 */}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Notice;
