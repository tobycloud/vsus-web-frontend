/* eslint-disable react-hooks/rules-of-hooks */
import { Avatar, Box, Button, Center, Container, Divider, Grid, Group, Text, Title } from "@mantine/core";
import { IconDeviceDesktopAnalytics, IconPlus, IconServer2 } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "preact/hooks";
import { Link } from "react-router-dom";
import CreateInstanceModal from "../../components/CreateInstanceModal";
import pocketbase, { getUserInstances, getWorkspace } from "../../database";
import { PBInstance, PBUser, PBWorkspace } from "../../database/models";
import { setDocumentTitle } from "../../utils";
import Loading from "../Loading";
import classes from "./index.module.css";

export default function InstanceHome() {
  const user = pocketbase.authStore.model as PBUser;

  const instancesQuery = useQuery({
    queryKey: ["instances", user],
    queryFn: () => getUserInstances(user, { sort: "-updated", perPage: 20 }),
  });

  useEffect(() => {
    setDocumentTitle("Your instances");
  }, []);

  if (!instancesQuery.isFetched) return <Loading />;

  const instances = instancesQuery.data!.items;

  const [workspaces, setWorkspaces] = useState<PBWorkspace[]>([]);

  useEffect(() => {
    instances.forEach(async (instance) => {
      const workspace = await getWorkspace(instance.workspace);
      setWorkspaces((workspaces) => [...(workspaces ?? []), workspace]);
    });
  }, [instances]);

  return (
    <Container size="xl">
      <Title order={2}>Your instances</Title>
      <Divider my="lg" />
      {workspaces.map((workspace) => (
        <InstancesOfEachWorkspace workspace={workspace} instances={instances} user={user} />
      ))}
    </Container>
  );
}

function InstancesOfEachWorkspace({ workspace, instances, user }: { workspace: PBWorkspace; instances: PBInstance[]; user: PBUser }) {
  const createInstance = CreateInstanceModal({ user, workspace });
  return (
    <Box py="sm">
      {createInstance.element}
      <Group gap="xs">
        <IconDeviceDesktopAnalytics size={25} />
        <Title order={3} fw={500}>
          {workspace.name}
        </Title>
      </Group>
      <Grid mt="md" mb="xl">
        {instances
          .filter((instance) => instance.workspace === workspace.id)
          .map((item) => (
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
                to={`/instance/${item.id}`}
              >
                <Group w="100%" justify="space-between">
                  <Group>
                    <IconServer2 size={30} />
                    <Title order={4} c="white" align="left">
                      {item.name}
                    </Title>
                  </Group>
                  <Avatar.Group>
                    {/* {[item.expand.owner]
            .concat(item.expand.collaborators ?? [])
            .slice(0, 2)
            .map((person) => (
              <Avatar src={pocketbase.getFileUrl(person, person.avatar)} className={classes.avatar} />
            ))} */}
                    <Avatar src={pocketbase.getFileUrl(item.expand.owner, item.expand.owner.avatar)} className={classes.avatar} />
                    {/* {[item.expand.owner].concat(item.expand.collaborators ?? []).length > 2 && (
            <Box style={{ position: "relative" }}>
              <Avatar
                style={{
                  background: `url(${pocketbase.getFileUrl(item.expand.collaborators![1], item.expand.collaborators![1].avatar)})`,
                  backgroundSize: "cover",
                }}
                className={classes.avatar + " " + classes.andMore}
              >
                <Text c="white" style={{ position: "relative", zIndex: 2 }}>
                  +{[item.expand.owner].concat(item.expand.collaborators!).length - 2}
                </Text>
              </Avatar>
            </Box>
          )} */}
                  </Avatar.Group>
                </Group>
              </Button>
            </Grid.Col>
          ))}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Button variant="light" style={{ borderRadius: "var(--mantine-radius-md)" }} h="100%" w="100%" mih={68.09} onClick={createInstance.open}>
            <Center>
              <Group>
                <IconPlus size={24} />
                <Text size="xl" weight={700}>
                  New instance
                </Text>
              </Group>
            </Center>
          </Button>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
