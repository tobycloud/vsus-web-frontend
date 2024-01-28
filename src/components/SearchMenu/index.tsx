import { rem } from "@mantine/core";
import { Spotlight, SpotlightActionData } from "@mantine/spotlight";
import { IconCpu, IconDashboard, IconSearch } from "@tabler/icons-react";

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
