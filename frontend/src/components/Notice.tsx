"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Notice = {
  id: number;
  content: string;
  createdAt: string;
};

async function fetchAllNotice() {
  const noticeRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/notice`,
    {
      cache: "no-cache",
    }
  );

  const noticeData = await noticeRes.json();
  return noticeData.data;
}

const Notice = () => {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const getNoticeData = async () => {
      try {
        const noticesData = await fetchAllNotice();
        setNotices(noticesData);
      } catch (error) {
        console.error("データ取得エラー");
      }
    };
    getNoticeData();
  }, []);

  return (
    <>
      <Box w="100%">
        <Box
          bgColor="yellow.50"
          p={[4, 6, 8]}
          h="95%"
          position="relative"
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
          {/* お知らせAPIを介してNewsテーブルからデータ取得 */}
          <Box height="3em" overflow="auto">
            {notices.length === 0 ? (
              <Text mt="30px" ml="2%" color="gray.500">
                ※お知らせはありません
              </Text>
            ) : (
              notices.map((notice) => (
                <Text display="flex" w="100%" ml="2%" mt="30px" key={notice.id}>
                  {new Date(notice.createdAt).toLocaleDateString("ja-JP", {
                    timeZone: "Asia/Tokyo",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {notice.content}
                </Text>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Notice;
