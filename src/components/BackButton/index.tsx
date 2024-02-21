import { Group, Text, UnstyledButton } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const BackButton = ({ to }: { to: string }) => {
  return (
    <UnstyledButton component={Link} to={to}>
      <Group gap={5} mb="lg">
        <IconArrowBack style={{ color: "var(--mantine-color-primary-text)" }} />
        <Text c="primary">Back</Text>
      </Group>
    </UnstyledButton>
  );
};

export default BackButton;
