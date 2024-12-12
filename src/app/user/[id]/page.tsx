"use client";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import UserInformation from "@/components/UserInformation";
import { Box } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export default async function UserPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = {
    id: session.user.id,
    name: session.user.name || "ゲスト",
    image: session.user.image || "/default-avatar.png",
    email: session.user.email,
  };

  if (user.id !== params.id) {
    redirect("/error");
  }

  return (
    <Box>
      <UserInformation imagePath={user.image} userName={user.name} />
    </Box>
  );
}
