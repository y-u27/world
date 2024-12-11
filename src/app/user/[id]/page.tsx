import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import UserInformation from "@/components/UserInformation";
import { Box } from "@chakra-ui/react";

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: {
        id: session.user.id,
        name: session.user.name || "ゲスト",
        image: session.user.image || "/default-avatar.png",
        email: session.user.email,
      },
    },
  };
}

const userPage = ({
  user,
}: {
  user: { id: string; name: string; image: string; email: string };
}) => {
  return (
    <Box>
      <UserInformation imagePath={user.image} userName={user.name} />
    </Box>
  );
};

export default userPage;
