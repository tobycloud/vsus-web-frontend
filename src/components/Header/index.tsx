import {
  ActionIcon,
  Avatar,
  Box,
  Combobox,
  Flex,
  Group,
  Image,
  Input,
  InputBase,
  Text,
  Title,
  Tooltip,
  UnstyledButton,
  rem,
  useCombobox,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { spotlight } from "@mantine/spotlight";
import { IconDeviceDesktop, IconPlus, IconSearch } from "@tabler/icons-react";
import { useState } from "preact/hooks";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";
import SearchMenu from "../SearchMenu";
import classes from "./index.module.css";

export function Header() {
  const workspaces = [
    {
      id: "RECORD_ID",
      collectionId: "8ns6dvelf7xqlks",
      collectionName: "workspaces",
      created: "2022-01-01 01:00:00.123Z",
      updated: "2022-01-01 23:59:59.456Z",
      name: "test",
      owner: "RELATION_RECORD_ID",
    },
  ];

  const isMobile = useMediaQuery("(max-width: 62em)");

  const [opened, { open, close }] = useDisclosure(false);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [workspaceSelected, setWorkspaceSelected] = useState<string | null>(null);

  const options = workspaces.map((item, index) => (
    <Combobox.Option value={item.name} key={item.name}>
      <Group gap={0}>
        <Flex direction={"column"} align={"center"}>
          <IconDeviceDesktop size={30} />
          <Text mt={5}>{index}</Text>
        </Flex>
        <Box ml="sm">
          <Text size="xl">{item.name}</Text>
          <Text size="xs" c="lightgrey">
            vCPUs:
          </Text>
          <Text size="xs" c="lightgrey">
            vRAMs:
          </Text>
          <Text size="xs" c="lightgrey">
            Storage:
          </Text>
        </Box>
      </Group>
    </Combobox.Option>
  ));

  // useEffect(() => {
  //   setWorkspaceSelected(workspaces[0]);
  // }, []);

  return (
    <>
      <header className={classes.header}>
        <Flex justify="space-between" h="100%">
          <Group flex={!isMobile ? 1 : 0}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              <Group gap={0}>
                <Image src="/images/icons/vsus.svg" alt="vSuS" h={35} style={{ pointerEvents: "none", userSelect: "none" }} />
                <Title order={3} ml="xs" style={{ pointerEvents: "none", userSelect: "none" }}>
                  vSuS
                </Title>
              </Group>
            </Link>
            <Group gap={0} visibleFrom="xl">
              <Combobox
                store={combobox}
                onOptionSubmit={(val) => {
                  setWorkspaceSelected(val);
                  combobox.closeDropdown();
                }}
              >
                <Combobox.Target>
                  <InputBase
                    w={250}
                    ml="xl"
                    variant="filled"
                    component="button"
                    type="button"
                    pointer
                    rightSection={<Combobox.Chevron />}
                    rightSectionPointerEvents="none"
                    onClick={() => combobox.toggleDropdown()}
                  >
                    {workspaceSelected || <Input.Placeholder>Select a workspace</Input.Placeholder>}
                  </InputBase>
                </Combobox.Target>
                <Combobox.Dropdown>
                  <Combobox.Options>{options}</Combobox.Options>
                </Combobox.Dropdown>
              </Combobox>
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
            <Avatar src="" onClick={open} ml="auto" />
          </Group>
        </Flex>
      </header>
      <SearchMenu />
      <NavBar opened={opened} close={close} />
    </>
  );
}
