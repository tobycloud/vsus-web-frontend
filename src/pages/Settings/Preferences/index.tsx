import { Alert, Avatar, Box, Button, Center, Flex, NativeSelect, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";
import { useEffect, useState } from "preact/hooks";
import { Link } from "react-router-dom";
import SettingsBox from "../../../components/SettingsBox";
import pocketbase, { getAvatar } from "../../../database";
import { User } from "../../../database/models";
import { setDocumentTitle } from "../../../utils";

const SettingsPreferences = () => {
  const isMobile = useMediaQuery(`(max-width: 36em)`);

  const user = pocketbase.authStore.model as User;

  if (!user) return null;

  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setAvatar(getAvatar(user));
  }, [user]);

  useEffect(() => {
    setDocumentTitle("Preferences | Settings");
  }, []);

  const preferencesUpdated = new URLSearchParams(window.location.search).get("updated");

  const avatarBox = (
    <Flex direction={"column"} mt="md" align={!isMobile ? "center" : "flex-start"}>
      <Text c="dimmed">Avatar</Text>
      <Avatar src={avatar} size={150} radius="50%" mt="sm" />
    </Flex>
  );

  return (
    <Box>
      <Title order={2}>Preferences</Title>
      {preferencesUpdated && (
        <Alert variant="light" mt="md" color="green" title="Success!" icon={<IconInfoCircle />}>
          Your preferences have been updated successfully.
        </Alert>
      )}
      <SettingsBox
        title="Your Profile"
        leftSection={
          <Flex justify="space-between">
            <Flex direction={"column"}>
              {isMobile && avatarBox}
              <Flex mt="md" direction={"column"}>
                <Text c="dimmed">Username</Text>
                <Text fw={500}>{user.username}</Text>
              </Flex>
              <Flex mt="md" direction={"column"}>
                <Text c="dimmed">Display name</Text>
                <Text fw={500} c={user.name ? "white" : "dark"}>
                  {user.name || "Not set"}
                </Text>
              </Flex>
              <Flex mt="md" direction={"column"}>
                <Text c="dimmed">Email</Text>
                <Text fw={500} maw={245} style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user.email}
                </Text>
              </Flex>
              <Flex mt="md" direction={"column"}>
                <Text c="dimmed">Phone number</Text>
                <Text fw={500} c={user.phoneNumber ? "white" : "dark"}>
                  {user.phoneNumber || "Not set"}
                </Text>
              </Flex>
            </Flex>
            {!isMobile && avatarBox}
          </Flex>
        }
        rightSection={
          <Center>
            <Button variant="light" fw={400} color="vsus-button" style={{ margin: "auto" }} component={Link} to="edit-profile">
              Edit profile
            </Button>
          </Center>
        }
      />
      <SettingsBox
        title="Language"
        leftSection={<Text mt="md">Your preference language for the dashboard.</Text>}
        rightSection={
          <Center>
            <NativeSelect disabled data={[{ value: "en", label: "English" }]} defaultValue="en" variant="filled" style={{ margin: "auto" }} />
          </Center>
        }
      />
      <SettingsBox
        title="Appearance"
        leftSection={<Text mt="md">How the dashboard would be displayed to you, either dark theme or light theme.</Text>}
        rightSection={
          <Center>
            <NativeSelect
              disabled
              data={[
                { value: "dark", label: "Dark" },
                { value: "light", label: "Light" },
              ]}
              defaultValue="en"
              variant="filled"
              style={{ margin: "auto" }}
            />
          </Center>
        }
      />
      {/* <SettingsBox
        title="Communication"
        leftSection={
          <Flex direction="column" mt="md">
            <Text>vSuS may send you emails regarding:</Text>
            <List
              mt="md"
              spacing="xs"
              size="sm"
              center
              icon={
                <ThemeIcon color="vsus-natural" size={24} radius="xl">
                  <IconCircleCheck style={{ width: rem(20), height: rem(20) }} />
                </ThemeIcon>
              }
            >
              <List.Item>A</List.Item>
              <List.Item>B</List.Item>
              <List.Item>C</List.Item>
              <List.Item>D</List.Item>
            </List>
          </Flex>
        }
        rightSection={
          <Center>
            <Button fw={400} disabled variant="light" color="vsus-button" style={{ margin: "auto" }}>
              Edit options
            </Button>
          </Center>
        }
      /> */}
    </Box>
  );
};

export default SettingsPreferences;
