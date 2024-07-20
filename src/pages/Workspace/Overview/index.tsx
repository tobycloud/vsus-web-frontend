import { ActionIcon, Avatar, Box, Button, Center, Container, Divider, Flex, Grid, Group, Text, Title, Tooltip, rem } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconAdjustments, IconCircleFilled, IconDeviceDesktopAnalytics, IconPlus, IconUserCode } from "@tabler/icons-react";
import { useEffect } from "preact/hooks";
import { Link, useLoaderData } from "react-router-dom";
import CreateInstanceModal from "../../../components/CreateInstanceModal";
import UserHoverCard from "../../../components/UserHoverCard";
import pocketbase from "../../../database";
import { PBUser, PBWorkspace } from "../../../database/models";
import { setDocumentTitle } from "../../../utils";
import Error404 from "../../Error/404";
import classes from "./index.module.css";

export default function WorkspaceOverview() {
  const isMobile = useMediaQuery(`(max-width: 36em)`);
  const workspace = useLoaderData() as PBWorkspace;

  const user = pocketbase.authStore.model as PBUser;

  if (!workspace) return <Error404 />;

  const data: Record<string, any> = {
    Instances: workspace.instances.length,
    Blocks: 0,
    Deployments: 0,
    "CI/CD Jobs": 0,
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setDocumentTitle(`${workspace.name} | Workspace`);
  }, [workspace]);

  const createInstance = CreateInstanceModal({ user, workspace });

  return (
    <>
      {createInstance.element}
      <Container size="xl">
        <Flex justify="space-between">
          <Group w="100%" mr="lg">
            <IconDeviceDesktopAnalytics size={40} />
            <Title order={2}>{workspace.name}</Title>
          </Group>
          <ActionIcon variant="light" size="lg" radius="sm" aria-label="Workspace's Option">
            <IconAdjustments size={20} />
          </ActionIcon>
        </Flex>
        <Group mt="lg" gap="xs">
          <IconUserCode size={25} style={{ color: "var(--mantine-color-dimmed)" }} />
          {[workspace.expand.owner].concat(workspace.expand.collaborators ?? []).map((user, index) => (
            <UserHoverCard profile={user} workspaceOwner={index == 0} key={user.id}>
              <Avatar src={pocketbase.getFileUrl(user, user.avatar)} component={Link} to={`/user/${user.username}`} />
            </UserHoverCard>
          ))}
        </Group>
        <Divider my="lg" />
        <Title order={3}>Overview</Title>
        <Grid mt="md" mb="xl">
          {Object.entries(data).map(([key, value]) => (
            <Grid.Col span={{ base: 12, xs: 6, md: 3 }} key={key}>
              <Box p="lg" bg="dark" style={{ borderRadius: "var(--mantine-radius-md)" }}>
                <Title order={3}>{key}</Title>
                <Text style={{ fontSize: "calc(1.5*var(--mantine-font-size-xl))" }}>{value}</Text>
              </Box>
            </Grid.Col>
          ))}
        </Grid>
        <Title order={3} mt="xl">
          Instances
        </Title>
        <Grid mt="md" mb="xl">
          {(workspace.expand.instances ?? []).map((item) => (
            <Grid.Col span={{ base: 12, md: 6 }} key={item.id}>
              <Box p="lg" bg="dark" style={{ borderRadius: "var(--mantine-radius-md)" }}>
                <Flex justify="space-between" direction={isMobile ? "column" : "row"}>
                  <Flex direction="column" justify="space-between" mr={isMobile ? "0" : "sm"} mb={isMobile ? "sm" : "0"}>
                    <Group>
                      <Title order={4} className={classes.link} component={Link} c="white" to={`/instance/${item.id}`}>
                        {item.name}
                      </Title>
                      {item.on_off && (
                        <Tooltip label="Running" openDelay={250}>
                          <IconCircleFilled style={{ width: rem(16), color: "var(--mantine-color-green-text)" }} />
                        </Tooltip>
                      )}
                    </Group>
                    {/* <Group gap="xs">
                      <Text>
                        <span style={{ color: "var(--mantine-color-dimmed)" }}>IP:</span> 20.20.20.20
                      </Text>
                      <CopyButton value="20.20.20.20" timeout={2000}>
                        {({ copied, copy }) => (
                          <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
                            <ActionIcon color={copied ? "teal" : "gray"} variant="subtle" onClick={copy}>
                              {copied ? <IconCheck style={{ width: rem(16) }} /> : <IconCopy style={{ width: rem(16) }} />}
                            </ActionIcon>
                          </Tooltip>
                        )}
                      </CopyButton>
                    </Group> */}
                  </Flex>
                  <Box>
                    <Text>
                      <span style={{ color: "var(--mantine-color-dimmed)" }}>vCPUs:</span> 2
                    </Text>
                    <Text>
                      <span style={{ color: "var(--mantine-color-dimmed)" }}>vRAMs:</span> 2
                    </Text>
                    <Text>
                      <span style={{ color: "var(--mantine-color-dimmed)" }}>Storage:</span> 18.5GB/20GB (93%)
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Grid.Col>
          ))}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Button
              p="lg"
              variant="light"
              style={{ borderRadius: "var(--mantine-radius-md)" }}
              h="100%"
              w="100%"
              mih={114.39}
              onClick={() => createInstance.open()}
            >
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
      </Container>
    </>
  );
}
