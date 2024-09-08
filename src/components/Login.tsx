"use client";

import { Box, Button, Card, CardBody, Input, Text } from "@chakra-ui/react";
import Link from "next/link";

const Login = () => {
  return (
    <Card width="400px" height="450px" mx="36%" mt="5%" boxShadow="2xl">
      <CardBody>
        <Text pt="5%" textAlign="center" fontFamily="revert" fontSize="3xl">
          ログイン
        </Text>
        <Box
          p="5%"
          display="flex"
          justifyContent="center"
          flexDirection="column"
        >
          <Text>メールアドレス</Text>
          <Input type="text" width="300px" mx="10px" />
          <Text mt="5%">パスワード</Text>
          <Input type="text" width="300px" mx="10px" />
          <Button
            width="300px"
            _hover={{ background: "#FAF089", color: "#319795" }}
            mt="10%"
            mx="3%"
          >
            ログイン
          </Button>
          <Box display="flex" justifyContent="center" mr="4%" mt="10px">
            <Button
              w="146px"
              _hover={{ background: "#1e90ff", color: "#e0ffff" }}
            >
              Google
            </Button>
            <Link href="/sign">
              <Button
                ml="6%"
                w="145px"
                _hover={{ background: "#f08080", color: "white" }}
              >
                新規登録
              </Button>
            </Link>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
};

export default Login;
