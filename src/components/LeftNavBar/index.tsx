import { Box, Divider, Drawer, Flex, NavLink, Text } from "@mantine/core";
import { IconDeviceDesktop, IconHome, IconSearch } from "@tabler/icons-react";
import { RecordModel } from "pocketbase";
import { useEffect, useState } from "preact/hooks";
import { Link } from "react-router-dom";
import { getLimitWorkspaces } from "../../database";
import { User } from "../../database/models";
import Logo from "../Logo";

export default function LeftNavBar({ opened, close, user }: { opened: boolean; close: () => void; user: User }) {
  const [workspaces, setWorkspaces] = useState<RecordModel[]>([]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      setWorkspaces(await getLimitWorkspaces(user, 0, 5));
    };

    fetchWorkspaces();
  }, []);

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
                    leftSection={<IconDeviceDesktop size={20} />}
                    component={Link}
                    to={`/workspace/${workspace.id}`}
                    label={workspace.name}
                    onClick={() => close()}
                  />
                ))}
              </Flex>
            </Box>
            <Divider mt={10} mb={10} />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
}
