"use client";
import { Box, Button, Card, CardBody, Flex, Input, Text } from "@chakra-ui/react";
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
            <Flex justifyContent="center" m="5px">
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
            </Flex>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
};

export default Login;
