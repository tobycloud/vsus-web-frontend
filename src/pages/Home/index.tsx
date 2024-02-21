import { Avatar, Box, Button, Container, Divider, Flex, Group, Image, Text, Title, UnstyledButton } from "@mantine/core";
import { IconAdjustments, IconMoodSmile } from "@tabler/icons-react";
import { useEffect } from "preact/hooks";
import { setDocumentTitle } from "../../utils";

export default function Home() {
  useEffect(() => {
    setDocumentTitle("Home");
  }, []);

  return (
    <Container>
      <Flex justify="space-between">
        <Title order={2}>Home</Title>
        <Button variant="outline" color="primary" radius="lg" leftSection={<IconAdjustments />}>
          Filter
        </Button>
      </Flex>
      <Divider my="lg" />
      <Box p="lg" bg="dark" style={{ borderRadius: "var(--mantine-radius-lg)" }} mb="lg">
        <Group>
          <Avatar src="https://avatars.githubusercontent.com/u/62174797" alt="Toby Cm" radius="xl" />
          <Box>
            <Text size="sm">Toby Cm</Text>
            <Text size="xs" c="dimmed">
              10 minutes ago
            </Text>
          </Box>
        </Group>
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
          <Button variant="outline" radius="xl">
            😭 26
          </Button>
          <Button variant="outline" radius="xl">
            😂 5
          </Button>
          <Button variant="outline" radius="xl">
            🤯 3
          </Button>
        </Group>
      </Box>
      <Box p="lg" bg="dark" style={{ borderRadius: "var(--mantine-radius-lg)" }} mb="lg">
        <Group>
          <Avatar src="https://avatars.githubusercontent.com/u/78996937" alt="pdt1806" radius="xl" />
          <Box>
            <Text size="sm">pdt1806</Text>
            <Text size="xs" c="dimmed">
              12 minutes ago
            </Text>
          </Box>
        </Group>
        <Text mt="lg">the posts here are hardcoded btw, but u guys got the idea</Text>
        <Image src="https://media1.tenor.com/m/NSqnTvyDe8wAAAAC/frieren-mimic.gif" w="100%" radius="md" mt="lg" />
        <Group mt="md" gap="xs">
          <UnstyledButton>
            <Avatar radius="xl">
              <IconMoodSmile />
            </Avatar>
          </UnstyledButton>
          <Button variant="outline" radius="xl">
            😮 10
          </Button>
          <Button variant="outline" radius="xl">
            😂 9
          </Button>
        </Group>
      </Box>
    </Container>
  );
}
