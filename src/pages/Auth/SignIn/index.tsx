import { Alert, Avatar, Box, Button, Center, Divider, Group, Image, Input, PasswordInput, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAt, IconKey } from "@tabler/icons-react";
import { useEffect, useState } from "preact/hooks";
import { Link, useNavigate } from "react-router-dom";
import pocketbase, { userSignIn, userSignInOAuth2 } from "../../../database";

export default function SignIn() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const accountCreated = new URLSearchParams(window.location.search).get("accountCreated");
  const passwordReset = new URLSearchParams(window.location.search).get("passwordReset");
  const [errorDuringSignIn, setErrorDuringSignIn] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (pocketbase.authStore.isValid) navigate("/");
  });

  return (
    <Center p="xl">
      <Box p="xl">
        {/* double xl on purpose */}
        <Box style={{ alignItems: "center", flexDirection: "column" }} display="flex">
          <Box display="flex" style={{ alignItems: "center" }} mb="lg">
            <Image src="../../images/icons/vsus.svg" w="50px" h="auto" alt="logo" />
            <Title order={1} ml="md">
              vSuS
            </Title>
          </Box>
          <Text size="xl" weight={700} align="center">
            Sign in to your account
          </Text>
        </Box>
        {accountCreated && (
          <Alert variant="light" color="green" title="Account created!" mt="xl">
            Please sign in to continue.
          </Alert>
        )}
        {passwordReset && (
          <Alert variant="light" color="green" title="Password reset!" mt="xl">
            Please sign in to continue.
          </Alert>
        )}
        {!!errorDuringSignIn && (
          <Alert variant="light" color="red" title="Error!" mt="xl">
            {errorDuringSignIn}
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
              await userSignIn(form.values.email, form.values.password);
              navigate("/");
            } catch (error) {
              form.reset();
              setErrorDuringSignIn("Invalid email or password.");
            }
          })}
        >
          <Input
            variant="filled"
            required
            placeholder="Your email or username"
            leftSection={<IconAt size={16} />}
            w="100%"
            id="email"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            variant="filled"
            required
            placeholder="Your password"
            leftSection={<IconKey size={16} />}
            mt="lg"
            w="100%"
            id="password"
            {...form.getInputProps("password")}
          />
          <Link to="/auth/forgot-password" style={{ color: "var(--mantine-color-vsus-text-7)", textDecoration: "none", width: "max-content" }}>
            <Text size="sm" mt="xs">
              Forgot password?
            </Text>
          </Link>
          <Button variant="light" color="vsus-button" mt="lg" w="100%" type="submit">
            Sign in
          </Button>
        </Box>
        <Text size="sm" weight={700} align="center" mt="xl">
          Don't have an account?{" "}
          <Link to="/auth/signup" style={{ color: "var(--mantine-color-vsus-text-7)", textDecoration: "none" }}>
            Sign up
          </Link>
        </Text>
        <Divider mt="xl" mb="xl" />
        <Box w="300px" ml="auto" mr="auto">
          <Text size="lg" weight={700} align="center">
            Or continue with
          </Text>
          <Group display={"flex"} style={{ justifyContent: "space-around" }} mt="lg">
            <Avatar
              size="lg"
              radius="xl"
              alt="Discord"
              style={{ cursor: "pointer" }}
              onClick={async () => {
                try {
                  await userSignInOAuth2("discord");
                  navigate("/");
                } catch (error) {
                  setErrorDuringSignIn((error as Error).message);
                }
              }}
            >
              <Image src="../../images/icons/socials/discord.svg" alt="Discord" p="xs" />
            </Avatar>
            <Avatar
              size="lg"
              radius="xl"
              alt="GitHub"
              style={{ cursor: "pointer" }}
              onClick={async () => {
                try {
                  await userSignInOAuth2("github");
                  navigate("/");
                } catch (error) {
                  setErrorDuringSignIn((error as Error).message);
                }
              }}
            >
              <Image src="../../images/icons/socials/github.svg" alt="GitHub" p="xs" />
            </Avatar>
            <Avatar
              size="lg"
              radius="xl"
              alt="Google"
              style={{ cursor: "pointer" }}
              onClick={async () => {
                try {
                  await userSignInOAuth2("google");
                  navigate("/");
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              <Image src="../../images/icons/socials/google.svg" alt="Google" p="xs" />
            </Avatar>
          </Group>
        </Box>
      </Box>
    </Center>
  );
}
