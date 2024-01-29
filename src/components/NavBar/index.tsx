import { Avatar, Box, Button, Divider, Drawer, Flex, Group, Modal, NavLink, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBook2, IconDeviceDesktop, IconLogout, IconServer2, IconSettings, IconSpeakerphone, IconUpload, IconUsers } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import pocketbase from "../../database";

export default function NavBar({
  opened,
  close,
  username,
  name,
  avatar,
}: {
  opened: boolean;
  close: () => void;
  username: string;
  name: string;
  avatar: string | null;
}) {
  const [signOutModalOpened, { open: openSignOutModal, close: closeSignOutModal }] = useDisclosure(false);
  const navigate = useNavigate();

  return (
    <>
      <Drawer.Root opened={opened} onClose={close} overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} position="right" size="xs">
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              <Flex align={"center"}>
                <Avatar src={avatar} alt={name} radius="xl" size="md" />
                <Box ml="sm">
                  <Text size="lg" lineClamp={1}>
                    {username}
                  </Text>
                  <Text size="xs" c="gray" lineClamp={1}>
                    {name}
                  </Text>
                </Box>
              </Flex>
            </Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body>
            <NavLink label="Your workspaces" leftSection={<IconDeviceDesktop size="1rem" stroke={1.5} />} onClick={() => {}} />
            <NavLink label="Your instances" leftSection={<IconServer2 size="1rem" stroke={1.5} />} onClick={() => {}} />
            <Divider mt={10} mb={10} />
            <NavLink label="Upgrade" leftSection={<IconUpload size="1rem" stroke={1.5} />} onClick={() => {}} />
            <NavLink label="What's New" leftSection={<IconSpeakerphone size="1rem" stroke={1.5} />} onClick={() => {}} />
            <NavLink label="Settings" leftSection={<IconSettings size="1rem" stroke={1.5} />} onClick={() => {}} />
            <Divider mt={10} mb={10} />
            <NavLink label="Documentations" leftSection={<IconBook2 size="1rem" stroke={1.5} />} onClick={() => {}} />
            <NavLink label="Support" leftSection={<IconUsers size="1rem" stroke={1.5} />} onClick={() => {}} />
            <Divider mt={10} mb={10} />
            <NavLink
              active
              variant="subtle"
              c="red"
              label="Sign out"
              leftSection={<IconLogout size="1rem" stroke={1.5} />}
              onClick={() => {
                openSignOutModal();
                close();
              }}
            />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
      <Modal opened={signOutModalOpened} onClose={closeSignOutModal} centered withCloseButton={false}>
        <Box>
          <Title order={3} mb="xs">
            Sign out
          </Title>
          <Text fw={400}>Are you sure you want to sign out?</Text>
          <Group mt="xl" ml="auto" w="max-content">
            <Button variant="light" color="vsus-button" onClick={closeSignOutModal}>
              Cancel
            </Button>
            <Button
              variant="light"
              color="red"
              onClick={() => {
                closeSignOutModal();
                pocketbase.authStore.clear();
                navigate("/login");
              }}
            >
              Sign out
            </Button>
          </Group>
        </Box>
      </Modal>
    </>
  );
}
