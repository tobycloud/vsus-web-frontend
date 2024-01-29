import { Alert, Box, Button, Center, Image, Input, PasswordInput, Text, Title } from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { IconAt, IconKey, IconReload, IconUser } from "@tabler/icons-react";
import { useState } from "preact/hooks";
import { Link, useNavigate } from "react-router-dom";
import { userSignUp } from "../../../database";

export default function SignUp() {
  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
      password2: "",
    },
    validate: {
      email: isEmail("Invalid email"),
      username: hasLength({ min: 5, max: 15 }, "Username must be 5-15 characters long"),
      password: hasLength({ min: 8 }, "Password must be at least 8 characters long"),
      password2: (value): string | null => (value !== form.values.password ? "Passwords do not match" : null),
    },
  });

  const [errorDuringSignUp, setErrorDuringSignUp] = useState("");

  const navigate = useNavigate();

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
            Create a new account
          </Text>
        </Box>
        {!!errorDuringSignUp && (
          <Alert variant="light" color="red" title="Error!" mt="xl">
            {errorDuringSignUp}
          </Alert>
        )}
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
          onSubmit={form.onSubmit(async () => {
            try {
              await userSignUp({
                email: form.values.email,
                username: form.values.username,
                password: form.values.password,
                passwordConfirm: form.values.password2,
              });
              navigate("/auth/signin?accountCreated=true");
            } catch (error) {
              form.reset();
              setErrorDuringSignUp("This email or username may already be in use.");
            }
          })}
        >
          <Input
            variant="filled"
            required
            placeholder="Enter your email"
            leftSection={<IconAt size={16} />}
            w="100%"
            id="email"
            {...form.getInputProps("email")}
          />
          <Input
            variant="filled"
            required
            placeholder="Enter your username"
            leftSection={<IconUser size={16} />}
            mt="lg"
            w="100%"
            id="username"
            {...form.getInputProps("username")}
          />
          <PasswordInput
            variant="filled"
            required
            placeholder="Enter password"
            leftSection={<IconKey size={16} />}
            mt="lg"
            w="100%"
            id="password"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            variant="filled"
            required
            placeholder="Re-enter password"
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
            Sign up
          </Button>
        </Box>
        <Text size="sm" weight={700} align="center" mt="xl">
          Already have an account?{" "}
          <Link to="/auth/signin" style={{ color: "var(--mantine-color-vsus-text-7)", textDecoration: "none" }}>
            Sign in
          </Link>
        </Text>
      </Box>
    </Center>
  );
}
