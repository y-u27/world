"use client";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import Link from "next/link";

const Login = () => {
  return (
    <Box>
      <Text pt="5%" textAlign="center" fontFamily="revert" fontSize="3xl">
        ログイン
      </Text>
      <Box pt="2%" display="flex" justifyContent="center">
        <Box flexDirection="column">
          <Text>メールアドレス</Text>
          <Input type="text" width="300px" />
          <Text mt="5%">パスワード</Text>
          <Input type="text" width="300px" />
          <Box mt="12%">
            <Button
              width="300px"
              _hover={{ background: "#FAF089", color: "#319795" }}
            >
              ログイン
            </Button>
            <Box display="flex" justifyContent="center" pt="5%">
              <Button
                w="150px"
                _hover={{ background: "#1e90ff", color: "#e0ffff" }}
              >
                Google
              </Button>
              <Link href="/sign">
                <Button
                  ml="5%"
                  w="150px"
                  _hover={{ background: "#f08080", color: "white" }}
                >
                  新規登録
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
