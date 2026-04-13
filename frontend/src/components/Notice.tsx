"use client";

import { InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
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
    },
  );

  const noticeData = await noticeRes.json();
  return noticeData.data;
}

const Notice = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <IconButton
          aria-label="お知らせボタン"
          onClick={onOpen}
          icon={<InfoIcon />}
          size="md"
          variant="ghost"
        />
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <ModalHeader>お知らせ</ModalHeader>
              {/* お知らせAPIを介してNewsテーブルからデータ取得 */}
              <Box height="3em" overflow="auto">
                {notices.length === 0 ? (
                  <Text mt="30px" ml="2%" color="gray.500">
                    ※お知らせはありません
                  </Text>
                ) : (
                  notices.map((notice) => (
                    <Text
                      display="flex"
                      w="100%"
                      ml="2%"
                      mt="30px"
                      key={notice.id}
                    >
                      {new Date(notice.createdAt).toLocaleDateString("ja-JP", {
                        timeZone: "UTC",
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
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default Notice;
