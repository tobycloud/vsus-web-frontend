/* eslint-disable react-hooks/rules-of-hooks */
import { ActionIcon, Avatar, Box, Code, Flex, Group, Indicator, Text, Tooltip, UnstyledButton, rem } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { spotlight } from "@mantine/spotlight";
import { IconInbox, IconMenu2, IconSearch } from "@tabler/icons-react";
import { useEffect } from "preact/hooks";
import { Link, useNavigate } from "react-router-dom";
import pocketbase from "../../database";
import { PBUser } from "../../database/models";
import { borderLine } from "../../utils";
import CreateInstanceModal from "../CreateInstanceModal";
import CreateNewDropdown from "../CreateNewDropdown";
import CreateWorkspaceModal from "../CreateWorkspaceModal";
import LeftNavBar from "../LeftNavBar";
import Logo from "../Logo";
import RightNavBar from "../RightNavBar";
import SearchMenu from "../SearchMenu";
import classes from "./index.module.css";

export function Header() {
  const user = pocketbase.authStore.model as PBUser;

  const isMobile = useMediaQuery("(max-width: 62em)");

  const navigate = useNavigate();

  const [openedRight, { open: openRight, close: closeRight }] = useDisclosure(false);

  const [openedLeft, { open: openLeft, close: closeLeft }] = useDisclosure(false);

  if (!user) return null;

  const createWorkspace = CreateWorkspaceModal({ user });

  const createInstance = CreateInstanceModal({ user });

  useEffect(() => {
    if (window.location.pathname === "/auth/signin") return;

    pocketbase
      .collection("users")
      .authRefresh()
      .catch(() => {
        // not logged in
        navigate("/auth/signin");
      });
  }, []);

  return (
    <>
      {createWorkspace.element}
      {createInstance.element}
      <header className={classes.header} style={{ borderBottom: borderLine }}>
        <Flex justify="space-between" h="100%">
          <Group flex={!isMobile ? 1.5 : "none"}>
            <ActionIcon variant="light" aria-label="new-workspace" color="vsus-button" size="lg" onClick={openLeft}>
              <IconMenu2 size={20} />
            </ActionIcon>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              <Logo />
            </Link>
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
            <Box visibleFrom="xs">
              <CreateNewDropdown newWorkspace={createWorkspace.open} newInstance={createInstance.open} />
            </Box>
            <Indicator color="red" size={15} withBorder disabled>
              <Tooltip label="You have no unread notifications" color="primary" openDelay={250}>
                <ActionIcon variant="light" aria-label="new-workspace" color="vsus-button" size="lg">
                  <IconInbox size={20} />
                </ActionIcon>
              </Tooltip>
            </Indicator>
            <Avatar src={pocketbase.getFileUrl(user, user.avatar)} onClick={openRight} />
          </Group>
        </Flex>
      </header>
      <SearchMenu />
      <LeftNavBar opened={openedLeft} close={closeLeft} />
      <RightNavBar opened={openedRight} close={closeRight} />
    </>
  );
}
