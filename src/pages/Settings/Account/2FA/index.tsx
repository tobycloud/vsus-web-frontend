import { Badge, Button, Center, Container, Flex, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import BackButton from "../../../../components/BackButton";
import SettingsBox from "../../../../components/SettingsBox";

const SettingsAccount2FA = () => {
  return (
    <Container>
      <BackButton to="/settings/account" />
      <Title order={2}>Two-Factor Authentication</Title>
      <Badge color="red" variant="light" size="xl" mt="md">
        2FA is not enabled
      </Badge>
      <SettingsBox
        title="Security Key Authentication"
        leftSection={
          <Flex direction="column" mt="md">
            <Text>Increase your account security by adding a hardware security key as a two-factor authentication method.</Text>
          </Flex>
        }
        rightSection={
          <Center>
            <Button fw={400} variant="light" color="vsus-button" style={{ margin: "auto" }} component={Link} to="" disabled>
              Add
            </Button>
          </Center>
        }
      />
      <SettingsBox
        title="Mobile App Authentication"
        leftSection={
          <Flex direction="column" mt="md">
            <Text>Secure your account with TOTP two-factor authentication.</Text>
          </Flex>
        }
        rightSection={
          <Center>
            <Button fw={400} variant="light" color="vsus-button" style={{ margin: "auto" }} component={Link} to="" disabled>
              Set up
            </Button>
          </Center>
        }
      />
      <SettingsBox
        title="Backup codes"
        leftSection={
          <Flex direction="column" mt="md">
            <Text>Generate backup codes to use if you get locked out of your account.</Text>
          </Flex>
        }
        rightSection={
          <Center>
            <Button fw={400} variant="light" color="vsus-button" style={{ margin: "auto" }} component={Link} to="" disabled>
              Regenerate
            </Button>
          </Center>
        }
      />
    </Container>
  );
};

export default SettingsAccount2FA;
