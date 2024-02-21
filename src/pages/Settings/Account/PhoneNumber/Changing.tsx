import { Box, Button, Combobox, Container, Group, Text, TextInput, Title, useCombobox } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDialpad } from "@tabler/icons-react";
import { ChangeEvent } from "preact/compat";
import ReactCountryFlag from "react-country-flag";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../../components/BackButton";
import pocketbase from "../../../../database";
import { User } from "../../../../database/models";
import { countryCodes, formatPhoneNumber } from "../../../../utils";

const SettingsAccountPhoneNumber = () => {
  const navigate = useNavigate();
  const user = pocketbase.authStore.model as User;

  const form = useForm({
    initialValues: {
      countryCode: user.phoneNumber.split(" ")[0].replace("+", "") || "",
      phoneNumber: user.phoneNumber.replace(`${user.phoneNumber.split(" ")[0]} `, "") || "",
    },
  });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const filteredOptions = countryCodes.filter((item) => item.number.includes(form.values.countryCode.trim()));

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item.number} key={item.number}>
      <Group>
        <ReactCountryFlag
          countryCode={item.code}
          svg
          style={{
            width: "2em",
            height: "2em",
          }}
        />
        <Text size="md" lineClamp={1}>
          {item.number}
        </Text>
      </Group>
    </Combobox.Option>
  ));

  if (!user) return null;

  return (
    <Container>
      <BackButton to="/settings/account" />
      <Title order={2}>Change phone number</Title>
      <Box
        mt="lg"
        component="form"
        onSubmit={form.onSubmit(async () => {
          form.setFieldValue("phoneNumber", form.values.phoneNumber.trim());
          navigate("/settings/account/change-phone-number/confirmation", { state: { form: form.values } });
        })}
      >
        <Box>
          <Text fw={500} mb="xs">
            Phone number
          </Text>
          <Group>
            <Combobox
              store={combobox}
              onOptionSubmit={(val) => {
                form.setFieldValue("countryCode", val);
                combobox.closeDropdown();
              }}
            >
              <Combobox.Target>
                <TextInput
                  size="md"
                  leftSection={<IconDialpad size={15} />}
                  w={120}
                  value={form.values.countryCode}
                  onChange={(event: ChangeEvent) => {
                    let code = (event.target as HTMLInputElement).value;
                    if ((code !== "" && !Number(code) && !code.includes("-")) || code.length > 5) return;
                    form.setFieldValue("countryCode", code);
                    combobox.openDropdown();
                    combobox.updateSelectedOptionIndex();
                  }}
                  onClick={() => combobox.openDropdown()}
                  onFocus={() => combobox.openDropdown()}
                  onBlur={() => combobox.closeDropdown()}
                />
              </Combobox.Target>
              <Combobox.Dropdown style={{ border: "none" }}>
                <Combobox.Options>{options.length === 0 ? <Combobox.Empty>Nothing found</Combobox.Empty> : options}</Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>
            <TextInput
              size="md"
              w="calc(100% - 136px)"
              variant="filled"
              value={form.values.phoneNumber}
              onChange={(event: ChangeEvent) => {
                const number = (event.target as HTMLInputElement).value;
                if ((number !== "" && !/^[0-9\s]*$/.test(number)) || number.replaceAll(" ", "").length > 15) return;
                const numberFormatted = number.length < form.values.phoneNumber.length ? number : formatPhoneNumber(number);
                form.setFieldValue("phoneNumber", numberFormatted);
              }}
            />
          </Group>
        </Box>
        <Group mt="xl" ml="auto" w="max-content">
          {form.isDirty() && (
            <Button
              variant="light"
              color="cyan"
              onClick={() => {
                form.reset();
              }}
            >
              Discard changes
            </Button>
          )}
          <Button
            variant="light"
            color="green"
            type="submit"
            disabled={
              !form.isDirty() ||
              filteredOptions.length == 0 ||
              !/^[0-9\s]*$/.test(form.values.phoneNumber) ||
              form.values.phoneNumber.replaceAll(" ", "").length > 15
            }
          >
            Next
          </Button>
        </Group>
      </Box>
      <Text fw={400} c="dimmed" mt="md" size="sm">
        *Only a few country codes are supported at the moment.
      </Text>
    </Container>
  );
};

export default SettingsAccountPhoneNumber;
