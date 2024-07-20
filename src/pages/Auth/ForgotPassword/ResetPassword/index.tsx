import { Box, Button, PasswordInput, Text } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { IconKey, IconReload } from "@tabler/icons-react";
import { useEffect } from "preact/hooks";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import pocketbase from "../../../../database";
import { setDocumentTitle } from "../../../../utils";
import classes from "../../index.module.css";
import AuthLayout from "../../Layout";

export default function ResetPassword() {
  const navigate = useNavigate();

  const { token } = useLoaderData() as { token?: string };

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

  useEffect(() => {
    setDocumentTitle("Set new password");
  }, []);

  if (!token) navigate("/auth/signin");

  return (
    <AuthLayout title="Reset your password">
      <Box
        component="form"
        className={classes.inputBox}
        onSubmit={form.onSubmit(async () => {
          try {
            await pocketbase.collection("users").confirmPasswordReset(token!, form.values.password, form.values.password2);
            navigate("/auth/signin");
          } catch (error) {
            console.error(error);
          }
        })}
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
    </AuthLayout>
  );
}
