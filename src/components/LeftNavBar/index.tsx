import { Box, Divider, Drawer, Flex, Group, NavLink, Text } from "@mantine/core";
import { IconDeviceDesktopAnalytics, IconHome, IconSearch } from "@tabler/icons-react";
import { RecordModel } from "pocketbase";
import { useEffect, useState } from "preact/hooks";
import { Link } from "react-router-dom";
import pocketbase, { getLimitWorkspaces } from "../../database";
import { User } from "../../database/models";
import Logo from "../Logo";

export default function LeftNavBar({ opened, close }: { opened: boolean; close: () => void }) {
  const [workspaces, setWorkspaces] = useState<RecordModel[]>([]);
  const user = pocketbase.authStore.model as User;

  const fetchWorkspaces = async () => {
    setWorkspaces(await getLimitWorkspaces(user, 0, 5));
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  useEffect(() => {
    const location = window.location.pathname.split("/");
    if (location[1] !== "workspace") return;
    if (!workspaces.map((workspace) => workspace.id).includes(location[2])) fetchWorkspaces();
  }, [window.location.pathname]); // handle workspace addition

  return (
    <>
      <Drawer.Root opened={opened} onClose={close} overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} size="xs">
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              <Logo />
            </Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>

          <Drawer.Body>
            <NavLink component={Link} to="/" label="Home" leftSection={<IconHome size="1rem" stroke={1.5} />} onClick={() => close()} />
            <Divider mt={10} mb={10} />
            <Box>
              <Flex justify="space-between" align="center" style={{ padding: "calc(0.5rem* var(--mantine-scale)) var(--mantine-spacing-sm)" }}>
                <Text size="sm" fw="600" c="dimmed">
                  Workspaces
                </Text>
                <IconSearch size={16} style={{ color: "var(--mantine-color-dimmed)" }} />
              </Flex>
              <Flex direction="column">
                {workspaces.map((workspace) => (
                  <NavLink
                    key={workspace.id}
                    leftSection={<IconDeviceDesktopAnalytics size={20} />}
                    component={Link}
                    to={`/workspace/${workspace.id}`}
                    label={workspace.name}
                    onClick={() => close()}
                  />
                ))}
                {workspaces.length === 0 && (
                  <Text size="sm" style={{ padding: "calc(0.5rem* var(--mantine-scale)) var(--mantine-spacing-sm)" }}>
                    No workspaces
                  </Text>
                )}
              </Flex>
            </Box>
            <Divider mt={10} mb={10} />
            <Box mt="lg">
              <Text size="xs" c="dimmed">
                © {new Date().getFullYear()} DaCloud™
              </Text>
              <Group mt="md">
                <Text size="xs" c="vsus-natural" component={Link} to="https://vsus.app/tos" target="_blank">
                  Terms
                </Text>
                <Text size="xs" c="vsus-natural" component={Link} to="https://vsus.app/privacy" target="_blank">
                  Privacy
                </Text>
              </Group>
            </Box>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
}
