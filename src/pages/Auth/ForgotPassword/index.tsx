import { Box, Button, Input, Text } from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { IconAt } from "@tabler/icons-react";
import { useEffect, useState } from "preact/hooks";
import { Link } from "react-router-dom";
import pocketbase from "../../../database";
import { setDocumentTitle } from "../../../utils";
import AuthLayout from "../Layout";
import classes from "../index.module.css";

export default function ForgotPassword() {
  const [gettingCode, setGettingCode] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: isEmail("Invalid email"),
    },
  });

  useEffect(() => {
    setDocumentTitle("Forgot password");
  }, []);

  return (
    <AuthLayout title="Reset your password">
      <Box
        component="form"
        className={classes.inputBox}
        onSubmit={form.onSubmit(async ({ email }) => {
          setGettingCode(true);

          try {
            await pocketbase.collection("users").requestPasswordReset(email.trim());
          } catch (error) {
            console.error(error);
          }

          setGettingCode(false);
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
        <Button variant="light" color="vsus-button" mt="lg" w="100%" type="submit" disabled={gettingCode || !form.values.email.trim()}>
          Get reset code
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
