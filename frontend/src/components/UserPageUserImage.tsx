import { Avatar, Box } from "@chakra-ui/react";

type UserPageUserImagesProp = {
  imagePath: string;
};

const UserPageUserImage: React.FC<UserPageUserImagesProp> = ({
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

export default UserPageUserImage;
