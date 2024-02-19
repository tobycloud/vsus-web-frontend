import { Divider, NavLink } from "@mantine/core";
import { IconBook2, IconChevronLeft, IconToggleRight, IconUser, IconUsers } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const SettingsNavBar = () => {
  return (
    <>
      <NavLink label="Back to Home" leftSection={<IconChevronLeft size="1rem" stroke={1.5} />} component={Link} to="/" />
      <Divider mt={10} mb={10} />
      <NavLink label="Preferences" leftSection={<IconToggleRight size="1rem" stroke={1.5} />} component={Link} to="/settings/preferences" />
      <NavLink label="Account" leftSection={<IconUser size="1rem" stroke={1.5} />} component={Link} to="/" disabled />
      <Divider mt={10} mb={10} label="Billing Settings" />
      <NavLink label="Billing" leftSection={<IconBook2 size="1rem" stroke={1.5} />} href="/" disabled />
      <NavLink label="Manage Plans" leftSection={<IconUsers size="1rem" stroke={1.5} />} href="/" disabled />
      <NavLink label="Payment Information" leftSection={<IconBook2 size="1rem" stroke={1.5} />} href="/" disabled />
    </>
  );
};

export default SettingsNavBar;
