import { Box, Button, Center, Image, PasswordInput, Text, Title } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { IconKey, IconReload } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const form = useForm({
    initialValues: {
      password: "",
      password2: "",
    },
    validate: {
      password: hasLength({ min: 8 }, "Password must be at least 8 characters long"),
      password2: (value): string | null => (value !== form.values.password ? "Passwords do not match" : null),
    },
  });

  return (
    <Center p="xl">
      <Box p="xl">
        {/* double xl on purpose */}
        <Box style={{ alignItems: "center", flexDirection: "column" }} display="flex">
          <Box display="flex" style={{ alignItems: "center", pointerEvents: "none" }} mb="lg">
            <Image src="../../images/icons/vsus.svg" w="50px" h="auto" alt="logo" />
            <Title order={1} ml="md">
              vSuS
            </Title>
          </Box>
          <Text size="xl" weight={700} align="center">
            Reset your password
          </Text>
        </Box>

        <Box
          component="form"
          display="flex"
          style={{
            flexDirection: "column",
            backgroundColor: "var(--mantine-color-dark-8)",
            borderRadius: "12px",
          }}
          w="340px"
          p="lg"
          h="min-content"
          mt="xl"
          onSubmit={form.onSubmit(async () => {})}
        >
          <PasswordInput
            variant="filled"
            required
            placeholder="Enter new password"
            leftSection={<IconKey size={16} />}
            w="100%"
            id="password"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            variant="filled"
            required
            placeholder="Re-enter new password"
            leftSection={<IconReload size={16} />}
            mt="lg"
            w="100%"
            id="password2"
            {...form.getInputProps("password2")}
          />
          <Text size="xs" mt="xs" c="gray">
            Password must be at least 8 characters long
          </Text>
          <Button variant="light" color="vsus-button" mt="lg" w="100%" type="submit">
            Reset password
          </Button>
        </Box>
        <Text size="sm" weight={700} align="center" mt="xl">
          Remembered your password? Awesome!{" "}
          <Link to="/auth/signin" style={{ color: "var(--mantine-color-vsus-text-7)", textDecoration: "none" }}>
            Sign in
          </Link>
        </Text>
      </Box>
    </Center>
  );
}
