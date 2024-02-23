import { Divider, NavLink } from "@mantine/core";
import { IconCarouselHorizontal, IconChevronLeft, IconCreditCard, IconFileInvoice, IconToggleRight, IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "preact/hooks";
import { Link } from "react-router-dom";

const SettingsNavBar = () => {
  const [page, setPage] = useState(window.location.pathname);

  useEffect(() => {
    setPage(window.location.pathname);
  }, [window.location.pathname]);

  return (
    <>
      <NavLink label="Back to Home" leftSection={<IconChevronLeft size="1rem" stroke={1.5} />} component={Link} to="/" />
      <Divider mt={10} mb={10} />
      <NavLink
        c="white"
        label="Preferences"
        leftSection={<IconToggleRight size="1rem" stroke={1.5} />}
        component={Link}
        to="/settings/preferences"
        active={page.includes("/settings/preferences")}
      />
      <NavLink
        c="white"
        label="Account"
        leftSection={<IconUser size="1rem" stroke={1.5} />}
        component={Link}
        to="/settings/account"
        active={page.includes("/settings/account")}
      />
      <Divider mt={10} mb={10} label="Billing Settings" />
      <NavLink label="Billing" leftSection={<IconFileInvoice size="1rem" stroke={1.5} />} href="/" disabled />
      <NavLink label="Manage Plans" leftSection={<IconCarouselHorizontal size="1rem" stroke={1.5} />} href="/" disabled />
      <NavLink label="Payment Information" leftSection={<IconCreditCard size="1rem" stroke={1.5} />} href="/" disabled />
    </>
  );
};

export default SettingsNavBar;
