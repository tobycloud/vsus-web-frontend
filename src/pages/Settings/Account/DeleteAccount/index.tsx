import { Alert, Box, Button, Container, Group, Text, TextInput, Title } from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { IconAlertTriangle } from "@tabler/icons-react";
import BackButton from "../../../../components/BackButton";
import pocketbase from "../../../../database";
import { User } from "../../../../database/models";

export const SettingsAccountDeleteAccount = () => {
  const user = pocketbase.authStore.model as User;

  if (!user) return null;

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isEmail("Invalid email"),
      password: isNotEmpty("Password is required"),
    },
  });

  return (
    <Container>
      <BackButton to="/settings/account" />

      <Title order={2}>Delete account</Title>
      <Alert variant="light" mt="md" color="red" title="Warning!" icon={<IconAlertTriangle />}>
        This irreversible action will permanently delete your account and all associated data. Proceed only if you are certain about this decision.
      </Alert>
      <Box mt="lg" component="form" onSubmit={form.onSubmit(async () => {})}>
        <Box mt="lg">
          <Text fw={500} mb="xs">
            Your email address
          </Text>
          <TextInput required onFocus={() => form.setFieldError("email", false)} {...form.getInputProps("email")} />
        </Box>
        <Box mt="lg">
          <Text fw={500} mb="xs">
            Your password
          </Text>
          <TextInput required onFocus={() => form.setFieldError("password", false)} {...form.getInputProps("password")} />
        </Box>
        <Group mt="xl" ml="auto" w="max-content">
          <Button variant="light" color="red" type="submit" disabled>
            Delete account
          </Button>
        </Group>
      </Box>
    </Container>
  );
};
