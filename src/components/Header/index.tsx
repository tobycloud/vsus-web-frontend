import { Avatar, Box, Divider, Drawer, Group, Image, NavLink, Text, Title, UnstyledButton, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Spotlight, SpotlightActionData, spotlight } from "@mantine/spotlight";
import { IconCpu, IconDashboard, IconLayout, IconLogout, IconSearch, IconSettings } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import classes from "./index.module.css";

const actions: SpotlightActionData[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    description: "'Dashing through the snow~'",
    onClick: () => {},
    leftSection: <IconDashboard style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
  },
  {
    id: "Workspaces",
    label: "Workspaces",
    description: "Where you can create and manage your projects.",
    onClick: () => {},
    leftSection: <IconCpu style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
  },
];

export function Header() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            <Group h="100%" gap={0}>
              <Image src="/images/icons/vsus.svg" alt="vSuS" h={35} style={{ pointerEvents: "none", userSelect: "none" }} />
              <Title order={2} ml={10} style={{ pointerEvents: "none", userSelect: "none" }}>
                vSuS
              </Title>
            </Group>
          </Link>
          <Group h="100%" gap={0} visibleFrom="sm">
            <UnstyledButton variant="light" color="vsus-button" onClick={spotlight.open}>
              <Box style={{ borderRadius: "12px", backgroundColor: "#0E363C" }}>
                <Group style={{ padding: "10px 50px 10px 50px" }}>
                  <IconSearch style={{ width: rem(20), height: rem(20), color: "#E0E0E0" }} stroke={1.5} />
                  <Text style={{ color: "#E0E0E0" }}>Search for workspaces, etc.</Text>
                </Group>
              </Box>
            </UnstyledButton>
          </Group>
          <Group>
            {/* <Button color="vsus-button" variant="light">
              Log in
            </Button>
            <Button color="vsus-button">Sign up</Button> */}
            <Avatar src="" onClick={open} />
          </Group>
        </Group>
      </header>
      <Spotlight
        actions={actions}
        nothingFound="Nothing found..."
        searchProps={{
          leftSection: <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />,
          placeholder: "Search...",
        }}
      />
      <Drawer opened={opened} onClose={close} title="username" overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} position="right">
        <NavLink label="Overview" leftSection={<IconLayout size="1rem" stroke={1.5} />} onClick={() => {}} />
        <NavLink label="Settings" leftSection={<IconSettings size="1rem" stroke={1.5} />} onClick={() => {}} />
        <Divider mt={10} mb={10} />
        <NavLink label="Sign out" leftSection={<IconLogout size="1rem" stroke={1.5} />} onClick={() => {}} />
      </Drawer>
    </Box>
  );
}
