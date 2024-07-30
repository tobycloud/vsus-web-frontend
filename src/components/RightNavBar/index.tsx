import { Avatar, Box, Button, Divider, Drawer, Flex, Group, Modal, NavLink, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBook2,
  IconDeviceDesktopAnalytics,
  IconLogout,
  IconServer2,
  IconSettings,
  IconSpeakerphone,
  IconUpload,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import pocketbase from "../../database";
import { PBUser } from "../../database/models";
import CreateInstanceModal from "../CreateInstanceModal";
import CreateNewDropdown from "../CreateNewDropdown";
import CreateWorkspaceModal from "../CreateWorkspaceModal";

export default function RightNavBar({ opened, close }: { opened: boolean; close: () => void }) {
  const [signOutModalOpened, { open: openSignOutModal, close: closeSignOutModal }] = useDisclosure(false);
  const navigate = useNavigate();
  const user = pocketbase.authStore.model as PBUser;
  const createWorkspace = CreateWorkspaceModal({ user });
  const createInstance = CreateInstanceModal({ user });

  return (
    <>
      {createWorkspace.element}
      {createInstance.element}
      <Drawer.Root opened={opened} onClose={close} overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} position="right" size="xs">
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              <Group gap="sm">
                <Avatar src={pocketbase.getFileUrl(user, user.avatar)} alt={user.name} radius="xl" size="md" />
                <Box>
                  <Text size="lg" lineClamp={1}>
                    {user.username}
                  </Text>
                  {user.name != "" && (
                    <Text size="xs" c="dimmed" lineClamp={1}>
                      {user.name}
                    </Text>
                  )}
                </Box>
              </Group>
            </Drawer.Title>
            <Flex align="center">
              <Box hiddenFrom="xs" mr="md">
                <CreateNewDropdown
                  newWorkspace={() => {
                    createWorkspace.open();
                    close();
                  }}
                  newInstance={() => {
                    createInstance.open();
                    close();
                  }}
                />
              </Box>
              <Drawer.CloseButton styles={{}} />
            </Flex>
          </Drawer.Header>
          <Drawer.Body>
            <NavLink
              component={Link}
              to={`/user/${user.username}`}
              label="Your profile"
              leftSection={<IconUser size="1rem" stroke={1.5} />}
              onClick={() => close()}
            />
            <Divider mt={10} mb={10} />
            <NavLink
              component={Link}
              to="/workspace"
              label="Your workspaces"
              leftSection={<IconDeviceDesktopAnalytics size="1rem" stroke={1.5} />}
              onClick={() => close()}
            />
            <NavLink
              component={Link}
              to="/instance"
              label="Your instances"
              leftSection={<IconServer2 size="1rem" stroke={1.5} />}
              onClick={() => close()}
            />
            <Divider mt={10} mb={10} />
            <NavLink component={Link} to="/" label="Upgrade" leftSection={<IconUpload size="1rem" stroke={1.5} />} onClick={() => close()} disabled />
            <NavLink
              component={Link}
              to="/"
              label="What's New"
              leftSection={<IconSpeakerphone size="1rem" stroke={1.5} />}
              onClick={() => close()}
              disabled
            />
            <NavLink
              component={Link}
              to="/settings/preferences"
              label="Settings"
              leftSection={<IconSettings size="1rem" stroke={1.5} />}
              onClick={() => close()}
            />
            <Divider mt={10} mb={10} />
            <NavLink
              component={Link}
              to="/"
              label="Documentations"
              leftSection={<IconBook2 size="1rem" stroke={1.5} />}
              onClick={() => close()}
              disabled
            />
            <NavLink component={Link} to="/" label="Support" leftSection={<IconUsers size="1rem" stroke={1.5} />} onClick={() => close()} disabled />
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
      <Modal opened={signOutModalOpened} onClose={closeSignOutModal} centered withCloseButton={false} padding="lg" radius="md">
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
                navigate("/auth/signin");
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
