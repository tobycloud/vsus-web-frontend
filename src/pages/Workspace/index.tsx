import { Avatar, Box, Button, Center, Container, Divider, Grid, Group, Text, Title } from "@mantine/core";
import { IconDeviceDesktopAnalytics, IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "preact/hooks";
import { Link } from "react-router-dom";
import CreateWorkspaceModal from "../../components/CreateWorkspaceModal";
import pocketbase, { getUserWorkspaces } from "../../database";
import { PBUser } from "../../database/models";
import { setDocumentTitle } from "../../utils";
import Loading from "../Loading";
import classes from "./index.module.css";

export default function WorkspaceHome() {
  const user = pocketbase.authStore.model as PBUser;

  const workspacesQuery = useQuery({
    queryKey: ["workspaces", user],
    queryFn: () => getUserWorkspaces(user, { sort: "-updated", perPage: 5 }),
  });

  useEffect(() => {
    setDocumentTitle("Your workspaces");
  }, []);

  if (!workspacesQuery.isFetched) return <Loading />;

  const workspaces = workspacesQuery.data!.items;

  const createWorkspace = CreateWorkspaceModal({ user });

  return (
    <Container size="xl">
      {createWorkspace.element}
      <Title order={2}>Your workspaces</Title>
      <Divider my="lg" />
      <Grid mt="md" mb="xl">
        {workspaces.map((item) => (
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Button
              p="lg"
              bg="dark"
              style={{ borderRadius: "var(--mantine-radius-md)" }}
              styles={{
                inner: { justifyContent: "space-between", width: "100%" },
                label: { width: "100%" },
              }}
              h="100%"
              w="100%"
              component={Link}
              to={`/workspace/${item.id}`}
            >
              <Group w="100%" justify="space-between">
                <Group>
                  <IconDeviceDesktopAnalytics size={30} />
                  <Title order={4} c="white" align="left">
                    {item.name}
                  </Title>
                </Group>
                <Avatar.Group>
                  {item.avatar.slice(0, 2).map((avatar: string) => (
                    <Avatar src={avatar} className={classes.avatar} />
                  ))}
                  {item.avatar.length > 2 && (
                    <Box style={{ position: "relative" }}>
                      <Avatar
                        style={{
                          background: `url(${item.avatar[2]})`,
                          backgroundSize: "cover",
                        }}
                        className={classes.avatar + " " + classes.andMore}
                      >
                        <Text c="white" style={{ position: "relative", zIndex: 2 }}>
                          +{item.avatar.length - 2}
                        </Text>
                      </Avatar>
                    </Box>
                  )}
                </Avatar.Group>
              </Group>
            </Button>
          </Grid.Col>
        ))}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Button variant="light" style={{ borderRadius: "var(--mantine-radius-md)" }} h="100%" w="100%" mih={68.09} onClick={createWorkspace.open}>
            <Center>
              <Group>
                <IconPlus size={24} />
                <Text size="xl" weight={700}>
                  New workspace
                </Text>
              </Group>
            </Center>
          </Button>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
