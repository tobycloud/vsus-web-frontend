import { Alert, Box, Button, Divider, Group, Input, PasswordInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAt, IconKey } from "@tabler/icons-react";
import { useEffect, useState } from "preact/hooks";
import { Link, useNavigate } from "react-router-dom";
import { userSignIn } from "../../../database";
import { setDocumentTitle } from "../../../utils";
import AuthLayout from "../Layout";
import classes from "../index.module.css";
import SocialButton from "./SocialButton";

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
    setDocumentTitle("Sign in");
  }, []);

  return (
    <AuthLayout title="Sign in to your account">
      {(accountCreated || passwordReset) && (
        <Alert variant="light" color="green" title={accountCreated ? "Account created!" : "Password reset!"} mt="xl">
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
        className={classes.inputBox}
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
          {["Discord", "GitHub", "Google"].map((name) => (
            <SocialButton name={name} setErrorDuringSignIn={setErrorDuringSignIn} />
          ))}
        </Group>
      </Box>
    </AuthLayout>
  );
}
