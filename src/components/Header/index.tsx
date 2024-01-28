import { ActionIcon, Avatar, Box, Flex, Group, Image, Text, Title, Tooltip, UnstyledButton, rem } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { spotlight } from "@mantine/spotlight";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "preact/hooks";
import { Link } from "react-router-dom";
import pocketbase, { getImageURL } from "../../database";
import { User } from "../../database/models";
import NavBar from "../NavBar";
import SearchMenu from "../SearchMenu";
import WorkspacesCombobox from "../WorkspacesCombobox";
import classes from "./index.module.css";

export function Header() {
  const isMobile = useMediaQuery("(max-width: 62em)");

  const user: User = pocketbase.authStore.model as User;

  const [opened, { open, close }] = useDisclosure(false);

  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const getAvatar = async () => {
      if (!user) return;
      const url = await getImageURL(user);
      setAvatar(url);
    };

    getAvatar();
  }, []);

  return (
    <>
      <header className={classes.header}>
        <Flex justify="space-between" h="100%">
          <Group flex={!isMobile ? 1 : 0}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              <Group gap={0}>
                <Image src="/../images/icons/vsus.svg" alt="vSuS" h={35} style={{ pointerEvents: "none", userSelect: "none" }} />
                <Title order={3} ml="xs" style={{ pointerEvents: "none", userSelect: "none" }}>
                  vSuS
                </Title>
              </Group>
            </Link>
            <Group gap={0} visibleFrom="xl">
              <WorkspacesCombobox user={user} />
              <Tooltip label="Create a new workspace" color="primary" openDelay={250}>
                <ActionIcon variant="light" aria-label="new-workspace" color="vsus-button" size="lg" ml="xs">
                  <IconPlus size={20} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
          <Group visibleFrom="lg" flex={1}>
            <UnstyledButton variant="light" color="vsus-button" onClick={spotlight.open} mr="auto" ml="auto">
              <Box style={{ borderRadius: "12px", backgroundColor: "#0E363C" }}>
                <Group style={{ padding: "10px 50px 10px 50px" }}>
                  <IconSearch style={{ width: rem(20), height: rem(20), color: "#E0E0E0" }} stroke={1.5} />
                  <Text style={{ color: "#E0E0E0" }}>Search for your workspaces, etc.</Text>
                </Group>
              </Box>
            </UnstyledButton>
          </Group>
          <Group flex={!isMobile ? 1 : 0}>
            <Avatar src={avatar} onClick={open} ml="auto" />
          </Group>
        </Flex>
      </header>
      <SearchMenu />
      <NavBar opened={opened} close={close} username={user?.username} name={user?.name} avatar={avatar} />
    </>
  );
}
