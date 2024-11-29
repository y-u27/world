"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Input,
  Text,
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
        alert("ログイン失敗");
      }
    } else {
      const result = await signIn(provider, { redirect: false });

      if (result?.ok) {
        router.push("/world");
      } else {
        alert("Googleログイン失敗");
      }
    }
  };

  return (
    <Card
      width={["90%", "70%", "50%", "380px"]}
      height="480px"
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
            width="100px"
            maxWidth="500px"
            mx="auto"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Text mt="5%">パスワード</Text>
          <Input
            type="password"
            width="100px"
            maxWidth="500px"
            mx="auto"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            width="300px"
            _hover={{ background: "#FAF089", color: "#319795" }}
            mt="10%"
            mx="3%"
            onClick={handleLogin("credentials")}
          >
            ログイン
          </Button>
          <Box display="flex" justifyContent="center" mr="4%" mt="10px">
            <HStack spacing="2px">
              <Button
                w="146px"
                _hover={{ background: "#1e90ff", color: "#e0ffff" }}
                onClick={handleLogin("google")}
              >
                Google
              </Button>
              <Link href="/login/sign">
                <Button
                  ml="6%"
                  w="145px"
                  _hover={{ background: "#f08080", color: "white" }}
                >
                  新規登録
                </Button>
              </Link>
            </HStack>
          </Box>
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
