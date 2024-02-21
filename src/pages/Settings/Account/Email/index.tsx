import { Box, Button, Container, Group, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import BackButton from "../../../../components/BackButton";
import pocketbase from "../../../../database";
import { User } from "../../../../database/models";

const SettingsAccountChangeEmail = () => {
  const user = pocketbase.authStore.model as User;

  if (!user) return null;

  const form = useForm({
    initialValues: {
      email: user.email,
      newEmail: "",
    },
    validate: {
      newEmail: (value) => {
        if (value === user.email) return "New email cannot be the same as the current email";
        if (!/^\S+@\S+$/.test(value)) return "Invalid email";
      },
    },
  });

  return (
    <Container>
      <BackButton to="/settings/account" />
      <Title order={2}>Change email address</Title>
      <Box
        mt="lg"
        component="form"
        onSubmit={form.onSubmit(async () => {
          await pocketbase.collection("users").requestEmailChange(form.values.newEmail);
        })}
      >
        <Box>
          <Text fw={500} mb="xs">
            Current email address
          </Text>
          <TextInput value={user.email} disabled />
        </Box>
        <Box mt="lg">
          <Text fw={500} mb="xs">
            New email address
          </Text>
          <TextInput
            required
            placeholder="New email"
            value={form.values.newEmail}
            onFocus={() => form.setFieldError("newEmail", false)}
            {...form.getInputProps("newEmail")}
          />
        </Box>
        <Group mt="xl" ml="auto" w="max-content">
          <Button variant="light" color="green" type="submit">
            Next
          </Button>
        </Group>
      </Box>
    </Container>
  );
};

export default SettingsAccountChangeEmail;
