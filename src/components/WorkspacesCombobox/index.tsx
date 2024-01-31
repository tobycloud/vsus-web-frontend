import { Box, Combobox, Flex, Group, Input, InputBase, Text, useCombobox } from "@mantine/core";
import { IconDeviceDesktop } from "@tabler/icons-react";
import { RecordModel } from "pocketbase";
import { useEffect, useState } from "preact/hooks";
import { getWorkspaces } from "../../database";
import { User } from "../../database/models";

export default function WorkspacesCombobox({ user }: { user: User }) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [workspaceSelected, setWorkspaceSelected] = useState<string | null>(null);

  const [workspaces, setWorkspaces] = useState<RecordModel[]>([]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      setWorkspaces(await getWorkspaces(user));
    };

    fetchWorkspaces();
  }, []);

  const options = workspaces.map((item, index) => (
    <Combobox.Option value={item.name} key={item.name} w="100%" maw="320px">
      <Group gap={0}>
        <Flex direction={"column"} align={"center"} w="max-content">
          <IconDeviceDesktop size={30} />
          <Text mt={5}>{index}</Text>
        </Flex>
        <Box ml="sm" maw={178}>
          <Text size="md" lineClamp={1}>
            {item.name}
          </Text>
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
  return (
    <Combobox
      disabled={workspaces.length === 0}
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
          {workspaceSelected || <Input.Placeholder>{workspaces.length === 0 ? "No workspace" : "Select a workspace"}</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>
      <Combobox.Dropdown style={{ border: "none" }}>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
