import { Box, Button, Container, Flex, Text, Title } from "@mantine/core";
import { useEffect } from "preact/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../../../components/BackButton";

const SettingsAccountPhoneNumberConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const phoneNumberForm = location.state ? location.state.form : null;

  useEffect(() => {
    !phoneNumberForm && navigate("/settings/account/change-phone-number", { replace: true });
  });

  if (!phoneNumberForm) {
    return null;
  }

  const verifyProcedure = () => {
    // send verification code to the phone number then navigate to the next step
    navigate("/settings/account/change-phone-number/verification", { state: { form: phoneNumberForm } });
  };

  return (
    <Container>
      <BackButton to="/settings/account/change-phone-number" />
      <Title order={2}>Confirm phone number</Title>
      <Box mt="lg">
        <Flex align="center" direction="column">
          <Text fw={400} mb="xs">
            Please confirm that your phone number is correct:
          </Text>
          <Title order={4} style={{ margin: 0 }} mb="xs">
            {`+${phoneNumberForm.countryCode} ${phoneNumberForm.phoneNumber}`}
          </Title>
          <Text fw={400}>A verification code will be sent to the phone number.</Text>
        </Flex>
        <Box mt="xl" ml="auto" w="max-content" onClick={() => verifyProcedure()}>
          <Button variant="light" color="green">
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SettingsAccountPhoneNumberConfirmation;
