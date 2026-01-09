import { Avatar, Box, Text } from "@chakra-ui/react";

type UserImagesProp = {
  imagePath: string;
};

const UserImage2: React.FC<UserImagesProp> = ({
  imagePath,
}: {
  imagePath: string;
}) => {
  return (
    <Box>
      <Avatar
        name="User Icon"
        src={imagePath || "/default-avatar.jpeg"}
        bg="blue.300"
        size="md"
      />
    </Box>
  );
};

export default UserImage2;
