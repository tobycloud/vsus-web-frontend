import { Alert, Box, Button, Container, Flex, PinInput, Text, Title } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../../components/BackButton";

const SettingsAccountPhoneNumberVerification = () => {
  const navigate = useNavigate();

  const [errorWhileUpdating, _] = useState<string>(""); // add state updater later

  const [verificationCode, setVerificationCode] = useState<string | undefined>(undefined);

  const updateProcedure = () => {
    // update the phone number then navigate to account settings
    navigate("/settings/account?phoneNumberUpdated=true");
  };

  return (
    <Container>
      <BackButton to="/settings/account/change-phone-number" />
      <Title order={2}>Verify phone number</Title>
      {!!errorWhileUpdating && (
        <Alert variant="light" color="red" title="Error" icon={<IconInfoCircle />} mb="md" mt="md">
          {errorWhileUpdating}
        </Alert>
      )}
      <Flex mt="lg" align="center" direction="column">
        <Flex mt="lg" align="center" direction="column">
          <Text size="md" weight={700} mb="md">
            Enter the code we sent to your phone number
          </Text>
          <PinInput
            value={verificationCode}
            variant="filled"
            length={5}
            type="number"
            oneTimeCode
            ml="auto"
            mr="auto"
            size="md"
            onChange={(value) => {
              setVerificationCode(value);
            }}
          />
        </Flex>
        <Box mt="xl" ml="auto" w="max-content">
          <Button variant="light" color="green" onClick={() => updateProcedure()}>
            Verify
          </Button>
        </Box>
      </Flex>
    </Container>
  );
};

export default SettingsAccountPhoneNumberVerification;
