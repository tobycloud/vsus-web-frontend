import { Alert, Badge, Box, Button, Center, Flex, Group, Text, Title, Tooltip } from "@mantine/core";
import { IconCheck, IconInfoCircle } from "@tabler/icons-react";
import { useEffect } from "preact/hooks";
import { Link } from "react-router-dom";
import SettingsBox from "../../../components/SettingsBox";
import pocketbase from "../../../database";
import { User } from "../../../database/models";
import { setDocumentTitle } from "../../../utils";

const SettingsAccount = () => {
  useEffect(() => {
    setDocumentTitle("Account | Settings");
  }, []);

  const user = pocketbase.authStore.model as User;

  if (!user) return null;

  const phoneNumberUpdated = new URLSearchParams(window.location.search).get("phoneNumberUpdated");

  return (
    <Box>
      <Title order={2}>Account</Title>
      {phoneNumberUpdated && (
        <Alert variant="light" mt="md" color="green" title="Success!" icon={<IconInfoCircle />}>
          Your phone number has been updated successfully.
        </Alert>
      )}
      <SettingsBox
        title="Password"
        leftSection={
          <Flex direction="column" mt="md">
            <Text>Change your password any time. This does not affect your two-factor authentication configuration.</Text>
          </Flex>
        }
        rightSection={
          <Center>
            <Button fw={400} variant="light" color="vsus-button" style={{ margin: "auto" }} disabled>
              Change password
            </Button>
          </Center>
        }
      />
      <SettingsBox
        title="Email address"
        leftSection={
          <Flex direction="column" mt="md">
            <Group gap={5}>
              <Text>{user.email}</Text>
              {user.verified && (
                <Tooltip label="Account verified">
                  <IconCheck size={20} stroke={2} style={{ color: "var(--mantine-color-green-light-color)" }} />
                </Tooltip>
              )}
            </Group>
          </Flex>
        }
        rightSection={
          <Center>
            <Flex direction={"column"} align={"center"}>
              <Button
                fw={400}
                variant="light"
                color="vsus-button"
                style={{ margin: "auto" }}
                mb="md"
                component={Link}
                to="change-email-address"
                disabled
              >
                Change email address
              </Button>
              <Button fw={400} variant="light" color="vsus-button" style={{ margin: "auto" }} disabled>
                Verify account
              </Button>
            </Flex>
          </Center>
        }
      />
      <SettingsBox
        title="Phone number"
        leftSection={
          <Flex direction="column" mt="md">
            <Text c={user.phoneNumber ? "white" : "dark"}>{user.phoneNumber || "Not set"}</Text>
          </Flex>
        }
        rightSection={
          <Center>
            <Button fw={400} variant="light" color="vsus-button" style={{ margin: "auto" }} component={Link} to="change-phone-number" disabled>
              {user.phoneNumber ? "Change phone number" : "Add phone number"}
            </Button>
          </Center>
        }
      />
      <SettingsBox
        title="Two-Factor Authentication"
        leftSection={
          <Flex direction="column" mt="md">
            <Badge color="red" size="lg" mb="md" variant="light">
              Not enabled
            </Badge>
            <Text>
              Protect your account by adding an extra layer of security.{" "}
              <span>
                <Link to="" style={{ color: "white" }}>
                  Learn more
                </Link>
              </span>
            </Text>
          </Flex>
        }
        rightSection={
          <Center>
            <Button fw={400} variant="light" color="vsus-button" style={{ margin: "auto" }} component={Link} to="two-factor-authentication" disabled>
              Enable 2FA
            </Button>
          </Center>
        }
      />
      <SettingsBox
        title="Account Deletion"
        leftSection={
          <Flex direction="column" mt="md">
            <Text>Once you delete your account, there is no going back. Please be certain. </Text>
          </Flex>
        }
        rightSection={
          <Center>
            <Button fw={400} variant="light" color="red" style={{ margin: "auto" }} component={Link} to="delete-account">
              Delete account
            </Button>
          </Center>
        }
      />
    </Box>
  );
};

export default SettingsAccount;
