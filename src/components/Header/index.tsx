import { ActionIcon, Avatar, Box, Code, Flex, Group, Image, Indicator, Text, Title, Tooltip, UnstyledButton, rem } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { spotlight } from "@mantine/spotlight";
import { IconInbox, IconPlus, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "preact/hooks";
import { Link } from "react-router-dom";
import pocketbase, { getAvatar } from "../../database";
import { User } from "../../database/models";
import NavBar from "../NavBar";
import SearchMenu from "../SearchMenu";
import WorkspacesCombobox from "../WorkspacesCombobox";
import classes from "./index.module.css";

export function Header() {
  const isMobile = useMediaQuery("(max-width: 62em)");

  const user = pocketbase.authStore.model as User;

  const [opened, { open, close }] = useDisclosure(false);

  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const getUserAvatar = async () => {
      if (!user) return;
      const url = await getAvatar(user);
      setAvatar(url);
    };

    getUserAvatar();
  }, [user]);

  return (
    <>
      <header className={classes.header} style={{ borderBottom: "calc(0.0625rem*var(--mantine-scale)) solid var(--_app-shell-border-color)" }}>
        <Flex justify="space-between" h="100%">
          <Group flex={!isMobile ? 1.5 : "none"}>
            <Group gap={0} component={Link} to="/" style={{ color: "white", textDecoration: "none" }} w={92.75}>
              <Image src="/../images/icons/vsus.svg" alt="vSuS" h={35} style={{ pointerEvents: "none", userSelect: "none" }} />
              <Title order={3} ml="xs" style={{ pointerEvents: "none", userSelect: "none" }}>
                vSuS
              </Title>
            </Group>
            <Group gap={0} visibleFrom="sm">
              <WorkspacesCombobox user={user} />
              <Tooltip label="Create a new workspace" color="primary" openDelay={250}>
                <ActionIcon variant="light" aria-label="new-workspace" color="vsus-button" size="lg" ml="xs">
                  <IconPlus size={20} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
          <Group visibleFrom="lg" flex={!isMobile ? 1 : "none"}>
            <UnstyledButton variant="light" color="vsus-button" onClick={spotlight.open} mr="auto" ml="auto">
              <Box style={{ borderRadius: "5px", backgroundColor: "#0E363C" }}>
                <Group style={{ padding: "10px 35px 10px 35px" }}>
                  <IconSearch style={{ width: rem(20), height: rem(20), color: "#E0E0E0" }} stroke={1.5} />
                  <Text size="sm" style={{ color: "#E0E0E0" }}>
                    Press <Code>Ctrl + K</Code> to search
                  </Text>
                </Group>
              </Box>
            </UnstyledButton>
          </Group>
          <Group flex={!isMobile ? 1.5 : "none"} justify="flex-end">
            <ActionIcon variant="light" aria-label="new-workspace" color="vsus-button" size="lg" hiddenFrom="lg" onClick={spotlight.open}>
              <IconSearch size={20} />
            </ActionIcon>
            <Indicator color="red" size={15} withBorder disabled>
              <Tooltip label="You have no unread notifications" color="primary" openDelay={250}>
                <ActionIcon variant="light" aria-label="new-workspace" color="vsus-button" size="lg">
                  <IconInbox size={20} />
                </ActionIcon>
              </Tooltip>
            </Indicator>
            <Avatar src={avatar} onClick={open} />
          </Group>
        </Flex>
      </header>
      <SearchMenu />
      <NavBar opened={opened} close={close} username={user?.username} name={user?.name} avatar={avatar} />
    </>
  );
}

Header.defaultProps = { inSettings: false };
