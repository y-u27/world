import { Avatar, Box, Text } from "@chakra-ui/react";

type UserImagesProp = {
  imagePath: string;
  userName: string;
  comment: string;
};

const UserImage2: React.FC<UserImagesProp> = ({
  imagePath,
  userName,
  comment,
}: {
  imagePath: string;
  userName: string;
  comment: string;
}) => {
  return (
    <Box>
      <Avatar
        name={userName || "User Icon"}
        src={imagePath || "/default-avatar.jpeg"}
        bg="blue.300"
        size="md"
      />
      <Text fontSize="lg" fontWeight="bold">
        {userName}
      </Text>
      <Text textAlign="center">{comment}</Text>
    </Box>
  );
};

export default UserImage2;
