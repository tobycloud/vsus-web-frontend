import { Box, Button, Center, Image, PinInput, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link } from "react-router-dom";

export default function EnterResetPasswordCode() {
  const form = useForm({
    initialValues: {
      code: "",
    },
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
          <Link to="/login" style={{ color: "var(--mantine-color-vsus-text-7)", textDecoration: "none" }}>
            Sign in
          </Link>
        </Text>
      </Box>
    </Center>
  );
}
