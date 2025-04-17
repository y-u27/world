"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { TiArrowBackOutline } from "react-icons/ti";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/world");
    }
  }, [router, session, status]);

  const handleLogin = (provider: string) => async (event: React.MouseEvent) => {
    event.preventDefault();
    if (provider === "credentials") {
      const result = await signIn(provider, {
        redirect: false,
        email,
        password,
      });

      if (result?.ok) {
        router.push("/world");
      } else {
        toast({
          title: "ログイン失敗",
          description: "メールアドレスまたはパスワードが間違っています",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      await signIn(provider, { redirect: false });
    }
  };

  return (
    <Card
      width={["90%", "70%", "50%", "380px"]}
      mx="auto"
      mt="5%"
      boxShadow="2xl"
    >
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
          <Input
            type="text"
            width="100%"
            maxWidth="500px"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Text mt="5%">パスワード</Text>
          <Input
            type="password"
            width="100%"
            maxWidth="500px"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box pb="5%">
            <Button
              width="100%"
              maxWidth="500px"
              _hover={{ background: "#FAF089", color: "#319795" }}
              mt="10%"
              mx="auto"
              onClick={handleLogin("credentials")}
            >
              ログイン
            </Button>
          </Box>
          <Box pb="5%">
            <Button
              w="100%"
              maxWidth="500px"
              _hover={{ background: "#1e90ff", color: "#e0ffff" }}
              onClick={handleLogin("google")}
            >
              Google
            </Button>
          </Box>
          <Link href="/login/sign">
            <Button
              w="100%"
              maxWidth="500px"
              _hover={{ background: "#f08080", color: "white" }}
            >
              新規登録
            </Button>
          </Link>
          <Box mt="24px">
            <TiArrowBackOutline />
            <Link href="/">
              <Text>トップページへ戻る</Text>
            </Link>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
};

export default Login;
