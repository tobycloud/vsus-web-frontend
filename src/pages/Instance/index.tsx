import { ActionIcon, Avatar, Box, Button, Container, Divider, Flex, Grid, Group, rem, Text, Title } from "@mantine/core";
import { IconAdjustments, IconChevronLeft, IconCircleFilled, IconServer2, IconUserCode } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import UserHoverCard from "../../components/UserHoverCard";
import pocketbase from "../../database";
import { User } from "../../database/models";

export default function Instance() {
  const user = pocketbase.authStore.model as User;

  return (
    <Container size="xl">
      <Group mb="lg" gap="xs" component={Link} to="/workspace/" style={{ textDecoration: "none", color: "var(--mantine-color-primary-text)" }}>
        <IconChevronLeft size={20} />
        <Text>Workspace's Name</Text>
      </Group>

      <Flex justify="space-between">
        <Group w="100%" mr="lg">
          <IconServer2 size={40} />
          <Title order={2}>Name</Title>
        </Group>
        <ActionIcon variant="light" size="lg" radius="sm" aria-label="Workspace's Option">
          <IconAdjustments size={20} />
        </ActionIcon>
      </Flex>
      <Group mt="lg" gap="xs">
        <IconUserCode size={25} style={{ color: "var(--mantine-color-dimmed)" }} />
        <UserHoverCard profile={user} workspaceOwner>
          <Avatar src={user.avatar} component={Link} to={`/user/${user.username}`} />
        </UserHoverCard>
      </Group>
      <Divider my="lg" />
      <Grid mt="md" mb="xl">
        <Grid.Col span={{ base: 12, xs: 6 }}>
          <Box p="lg" bg="dark" style={{ borderRadius: "var(--mantine-radius-md)" }} h="100%">
            <Title order={3}>Status</Title>
            <Group gap="xs">
              <Text fz="xl">Offline</Text>
              <IconCircleFilled style={{ width: rem(32), color: "var(--mantine-color-dimmed)" }} />
            </Group>
          </Box>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6 }}>
          <Flex p="lg" bg="dark" style={{ borderRadius: "var(--mantine-radius-md)" }} h="100%" align="center" justify="space-between">
            <Title order={3}>SSH</Title>
            <Button variant="light" color="vsus-button" size="md">
              Connect
            </Button>
          </Flex>
        </Grid.Col>
      </Grid>
      <Box h={120} bg="black" style={{ borderRadius: "16px" }} p="xl">
        Console offline
      </Box>
    </Container>
  );
}
