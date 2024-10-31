import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const LoginUser = () => {
  const [loginUser, setLoginUser] = useState("");
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.name) {
      setLoginUser(session.user.name);
    }
  }, [status, session]);
  return (
    <Box>
      <Box px={10}>
      {loginUser && (
            <Box textAlign="center" px={10} color="gray.600" fontSize="sm">
              ログイン中：{loginUser}
            </Box>
          )}
        </Box>
    </Box>
  )
}

export default LoginUser
