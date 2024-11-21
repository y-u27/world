import { Avatar, Box } from "@chakra-ui/react";

type UserImageProps = {
  imagePath: string;
};

const UserImage: React.FC<UserImageProps> = ({
  imagePath,
}: {
  imagePath: string;
}) => {
  if (!imagePath) return <Box>Loading...</Box>;

  return (
    <Box>
      <Avatar name="User Icon" src={imagePath} bg="blue.300" size="md" />
    </Box>
  );
};

export default UserImage;
