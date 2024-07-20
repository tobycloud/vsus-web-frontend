import { ActionIcon, Avatar, Box, Button, Container, Divider, Flex, Grid, Group, rem, Text, Title } from "@mantine/core";
import { IconAdjustments, IconChevronLeft, IconCircleFilled, IconServer2, IconUserCode } from "@tabler/icons-react";
import { useEffect } from "preact/hooks";
import { Link, useLoaderData } from "react-router-dom";
import UserHoverCard from "../../components/UserHoverCard";
import type { Instance } from "../../database/models";
import { setDocumentTitle } from "../../utils";
import Error404 from "../Error/404";

export default function Instance() {
  const { instance } = useLoaderData() as { instance: Instance };

  if (!instance) return <Error404 />;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setDocumentTitle(`${instance.name} | Instance`);
  }, [instance]);

  return (
    <Container size="xl">
      <Group
        mb="lg"
        gap="xs"
        component={Link}
        to={`/workspace/${instance.workspace}`}
        style={{ textDecoration: "none", color: "var(--mantine-color-primary-text)" }}
      >
        <IconChevronLeft size={20} />
        <Text>{instance.workspace_name}</Text>
      </Group>

      <Flex justify="space-between">
        <Group w="100%" mr="lg">
          <IconServer2 size={40} />
          <Title order={2}>{instance.name}</Title>
        </Group>
        <ActionIcon variant="light" size="lg" radius="sm" aria-label="Workspace's Option">
          <IconAdjustments size={20} />
        </ActionIcon>
      </Flex>
      <Group mt="lg" gap="xs">
        <IconUserCode size={25} style={{ color: "var(--mantine-color-dimmed)" }} />
        <UserHoverCard profile={instance.owner} workspaceOwner>
          <Avatar src={instance.owner.avatar} component={Link} to={`/user/${instance.owner.username}`} />
        </UserHoverCard>
      </Group>
      <Divider my="lg" />
      <Grid mt="md" mb="xl">
        <Grid.Col span={{ base: 12, xs: 6 }}>
          <Box p="lg" bg="dark" style={{ borderRadius: "var(--mantine-radius-md)" }} h="100%">
            <Title order={3}>Status</Title>
            <Group gap="xs" mt="xs">
              <Text fz="xl">{instance.on_off ? "Online" : "Offline"}</Text>
              <IconCircleFilled
                style={{ width: rem(16), color: instance.on_off ? "var(--mantine-color-green-text)" : "var(--mantine-color-dimmed)" }}
              />
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
