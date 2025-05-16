import {
  Avatar,
  Button,
  Flex,
  Paper,
  PaperProps,
  Stack,
  Text,
} from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import userData from "../data/User.json";

const UserCard = ({ ...others }: any) => {
  const { name, email, image } = others;
  return (
    <Paper {...others}>
      <Flex gap="lg" align="center">
        <Avatar src={image} size={120} radius={120} />
        <Stack spacing="xs" align="flex-start">
          <Text ta="center" fz="lg" weight={500}>
            {name}
          </Text>
          <Text ta="center" c="dimmed" fz="sm">
            {email}
          </Text>

          <Button variant="light" leftIcon={<IconSend size={18} />} fullWidth>
            Send message
          </Button>
        </Stack>
      </Flex>
    </Paper>
  );
};

export default UserCard;
