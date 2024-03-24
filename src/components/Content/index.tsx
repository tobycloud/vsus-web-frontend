import { AppShell, Box, Container, Divider, ScrollArea } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useEffect } from "preact/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import pocketbase from "../../database";
import { Header } from "../Header";
import SettingsNavBar from "../SettingsNavBar";

export default function Content() {
  const isMobile = useMediaQuery("(max-width: 48em)");
  const navigate = useNavigate();

  useEffect(() => {
    if (pocketbase.authStore.model === null) navigate("/auth/signin");
  });

  const inSettings = window.location.pathname.includes("/settings");

  const inWorkspace = window.location.pathname.includes("/workspace");

  const [opened] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: !inSettings },
      }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <ScrollArea>
          <SettingsNavBar />
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main>
        <Container mt="xl" pb="xl" size={inWorkspace ? "xl" : "md"}>
          {isMobile && inSettings && (
            <Box>
              <SettingsNavBar />
              <Divider mt="xl" mb="xl" />
            </Box>
          )}
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
