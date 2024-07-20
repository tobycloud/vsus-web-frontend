import { Button, Menu, rem } from "@mantine/core";
import { IconChevronDown, IconDeviceDesktopAnalytics, IconPlus, IconServer2 } from "@tabler/icons-react";

export default function CreateNewDropdown({ newWorkspace, newInstance }: { newWorkspace: () => void; newInstance: () => void }) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="light" color="vsus-button" rightSection={<IconChevronDown size={20} />} p="xs">
          <IconPlus size={20} />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<IconDeviceDesktopAnalytics style={{ width: rem(14), height: rem(14) }} />} onClick={newWorkspace}>
          New workspace
        </Menu.Item>
        <Menu.Item leftSection={<IconServer2 style={{ width: rem(14), height: rem(14) }} />} onClick={newInstance}>
          New instance
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
