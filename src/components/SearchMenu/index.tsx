import { rem } from "@mantine/core";
import { Spotlight, SpotlightActionData } from "@mantine/spotlight";
import { IconDashboard, IconDeviceDesktopAnalytics, IconSearch, IconServer2 } from "@tabler/icons-react";

const actions: SpotlightActionData[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Overview of workspaces and data.",
    onClick: () => {},
    leftSection: <IconDashboard style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
  },
  {
    id: "Workspaces",
    label: "Workspaces",
    description: "Control virtual machine workspaces efficiently.",
    onClick: () => {},
    leftSection: <IconDeviceDesktopAnalytics style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
  },
  {
    id: "Instances",
    label: "Instances",
    description: "Manage virtual machine instances effortlessly.",
    onClick: () => {},
    leftSection: <IconServer2 style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
  },
];

export default function SearchMenu() {
  return (
    <Spotlight
      actions={actions}
      nothingFound="Nothing found..."
      searchProps={{
        leftSection: <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />,
        placeholder: "Search...",
      }}
    />
  );
}
