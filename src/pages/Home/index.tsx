import { Avatar, Box, Button, Container, Divider, Flex, Group, Menu, Text, Title, UnstyledButton, rem } from "@mantine/core";
import { IconAdjustments, IconDots, IconMessageExclamation, IconMessageOff, IconMoodSmile, IconUserMinus } from "@tabler/icons-react";
import { useEffect } from "preact/hooks";
import { Link } from "react-router-dom";
import { setDocumentTitle } from "../../utils";

export default function Home() {
  useEffect(() => {
    setDocumentTitle("Home");
  }, []);

  const tobyPostReactions = {
    "😭": 26,
    "😂": 5,
    "🤯": 3,
  };

  // Things to note:
  // - Eggu is not sure if multiple reactions is a good idea, and how to implement it in PB
  // - Eggu wants these posts to be the same as those on GitHub, not those on X => Displaying activities instead of self-posted posts
  // - Eggu wants to display the activities in a timeline (that is, chronological order)

  return (
    <Container>
      <Flex justify="space-between">
        <Title order={2}>Home</Title>
        <Button variant="light" color="primary" radius="md" leftSection={<IconAdjustments size={20} />} fw={500}>
          Filter
        </Button>
      </Flex>
      <Divider my="lg" />
      <Box p="lg" bg="dark" style={{ borderRadius: "var(--mantine-radius-lg)" }} mb="lg">
        <Flex justify="space-between" align="center">
          <Group gap="sm">
            <Avatar
              src="https://avatars.githubusercontent.com/u/62174797"
              alt="Toby Cm"
              radius="xl"
              component={Link}
              to="https://github.com/tobycm"
            />
            <Box>
              <Text c="dimmed" size="sm">
                <Text c="white" span size="sm" component={Link} to="https://github.com/tobycm">
                  Toby Cm{" "}
                </Text>
                announced a sophisticated statement regarding one of his greatest computer innovations
              </Text>
              <Text size="xs" c="dimmed">
                10 minutes ago
              </Text>
            </Box>
          </Group>
          <Menu shadow="md">
            <Menu.Target>
              <UnstyledButton>
                <IconDots size={20} />
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<IconMessageOff style={{ width: rem(14), height: rem(14) }} />}>Show less activities from Toby Cm</Menu.Item>
              <Menu.Item leftSection={<IconUserMinus style={{ width: rem(14), height: rem(14) }} />}>Unfollow Toby Cm</Menu.Item>
              <Menu.Item color="red" leftSection={<IconMessageExclamation style={{ width: rem(14), height: rem(14) }} />}>
                Report
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
        <Text mt="lg">no vsus until 2025 🤯</Text>
        <video
          src="/videos/vsus.mp4"
          controls
          style={{ width: "100%", borderRadius: "var(--mantine-radius-md)", marginTop: "var(--mantine-spacing-lg)" }}
        />
        <Group mt="md" gap="xs">
          <UnstyledButton>
            <Avatar radius="xl">
              <IconMoodSmile />
            </Avatar>
          </UnstyledButton>
          {Object.entries(tobyPostReactions).map(([emoji, count]) => (
            <Button key={emoji} variant="light" radius="xl" size="compact-lg" fw={400}>
              <Group gap="xs">
                <Text size="sm">{emoji}</Text>
                <Text size="sm">{count}</Text>
              </Group>
            </Button>
          ))}
        </Group>
      </Box>
    </Container>
  );
}
