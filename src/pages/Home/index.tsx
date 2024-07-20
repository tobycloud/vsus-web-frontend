import { Container, Divider, Flex, Title } from "@mantine/core";
import { useEffect } from "preact/hooks";
import { User } from "../../database/models";
import { setDocumentTitle } from "../../utils";
import Loading from "../Loading";

export default function Home() {
  useEffect(() => {
    setDocumentTitle("Home");
  }, []);

  // const tobyPostReactions = {
  //   "😭": 26,
  //   "😂": 5,
  //   "🤯": 3,
  // };

  // Things to note:
  // - Eggu is not sure if multiple reactions is a good idea, and how to implement it in PB
  // - Eggu wants these posts to be the same as those on GitHub, not those on X => Displaying activities instead of self-posted posts
  // - Eggu wants to display the activities in a timeline (that is, chronological order)

  // @ts-ignore for now
  const user: User | undefined = {};

  if (!user) return <Loading />;

  return (
    <Container>
      <Flex justify="space-between">
        <Title order={2}>Home</Title>
        {/* <Button variant="light" color="primary" radius="md" leftSection={<IconAdjustments size={20} />} fw={500}>
          Filter
        </Button> */}
      </Flex>
      <Divider my="lg" />
      {/* <Box p="lg" bg="dark" style={{ borderRadius: "var(--mantine-radius-lg)" }} mb="lg">
        <Flex justify="space-between" align="center">
          <Group gap="sm">
            <UserHoverCard profile={user}>
              <Avatar src={user.avatar} alt={user.username} radius="xl" component={Link} to={`/user/${user.username}`} />
            </UserHoverCard>
            <Box>
              <Text c="dimmed" size="sm">
                <UserHoverCard profile={user}>
                  <Text size="sm" c="white" component={Link} to={`/user/${user.username}`}>
                    {user.username}
                  </Text>
                </UserHoverCard>{" "}
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
            <Menu.Dropdown bg="dark">
              <Menu.Item leftSection={<IconMessageOff style={{ width: rem(14), height: rem(14) }} />}>
                Show less activities from {user.name}
              </Menu.Item>
              <Menu.Item leftSection={<IconUserMinus style={{ width: rem(14), height: rem(14) }} />}>Unfollow {user.name}</Menu.Item>
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
      </Box> */}
    </Container>
  );
}
