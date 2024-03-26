import { Avatar, Box, Button, Center, Divider, Grid, Group, Overlay, Text, Title } from "@mantine/core";
import { IconDeviceDesktopAnalytics, IconPlus } from "@tabler/icons-react";
import { RecordModel } from "pocketbase";
import { useEffect, useState } from "preact/hooks";
import { Link } from "react-router-dom";
import CreateWorkspaceModal from "../../components/CreateWorkspaceModal";
import pocketbase, { getAvatar, getLimitWorkspaces, getUser } from "../../database";
import { User } from "../../database/models";
import Loading from "../Loading";

export default function WorkspaceHome() {
  const user = pocketbase.authStore.model as User;

  const [workspaces, setWorkspaces] = useState<RecordModel[]>([]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      const workspaces = await getLimitWorkspaces(user, 0, 5);
      for (const workspace of workspaces) {
        const ownerAvatar = await getAvatar(await getUser(workspace.owner));
        const collaboratorsAvatars = await Promise.all(
          workspace.collaborators.map(async (collaborator: string) => await getAvatar(await getUser(collaborator)))
        );
        workspace.avatar = [ownerAvatar, ...collaboratorsAvatars];
      }
      setWorkspaces(workspaces);
    };

    fetchWorkspaces();
  }, []);

  if (workspaces.length === 0) return <Loading />;

  const createWorkspace = CreateWorkspaceModal({ user });

  return (
    <Box>
      {createWorkspace.element}
      <Title order={2}>Your workspaces</Title>
      <Divider my="lg" />
      <Grid mt="md" mb="xl">
        {workspaces.map((item: RecordModel) => (
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Button
              p="lg"
              bg="dark"
              style={{ borderRadius: "var(--mantine-radius-md)" }}
              styles={{
                inner: { justifyContent: "space-between" },
              }}
              h="100%"
              w="100%"
              component={Link}
              to={`/workspace/${item.id}`}
              leftSection={
                <Group>
                  <IconDeviceDesktopAnalytics size={30} />
                  <Title order={4} c="white" align="left">
                    {item.name}
                  </Title>
                </Group>
              }
              rightSection={
                <Group gap={5}>
                  {item.avatar.slice(0, 2).map((avatar: string) => (
                    <Avatar src={avatar} />
                  ))}
                  {item.avatar.length > 2 && (
                    <Box style={{ position: "relative" }}>
                      <Overlay radius="50%">
                        <Center h="100%">+{item.avatar.length - 2}</Center>
                      </Overlay>
                      <Avatar src={item.avatar[2]} />
                    </Box>
                  )}
                </Group>
              }
            />
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
    </Box>
  );
}