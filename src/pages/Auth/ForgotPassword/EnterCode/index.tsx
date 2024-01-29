import { Box, Button, PinInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link } from "react-router-dom";
import classes from "../../index.module.css";
import AuthLayout from "../../Layout";
import { useEffect } from "preact/hooks";
import { setDocumentTitle } from "../../../../utils";

export default function EnterResetPasswordCode() {
  const form = useForm({
    initialValues: {
      code: "",
    },
  });

  useEffect(() => {
    setDocumentTitle("Forgot password");
  }, []);

  return (
    <AuthLayout title="Reset your password">
      <Box component="form" className={classes.inputBox} onSubmit={form.onSubmit(async () => {})}>
        <Text size="md" weight={700} align="center" mb="md">
          Enter the code we sent to your email
        </Text>
        <PinInput variant="filled" length={5} type="number" oneTimeCode ml="auto" mr="auto" size="md" {...form.getInputProps("code")} />
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
