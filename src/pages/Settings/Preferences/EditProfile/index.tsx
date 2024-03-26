import { Alert, Avatar, Box, Button, Checkbox, Container, Flex, Group, Loader, Menu, Text, TextInput, Title, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { IconInfoCircle, IconTrash, IconUpload } from "@tabler/icons-react";
import { useEffect, useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";
import { useFilePicker } from "use-file-picker";
import { FileAmountLimitValidator, FileSizeValidator, FileTypeValidator } from "use-file-picker/validators";
import BackButton from "../../../../components/BackButton";
import pocketbase, { getAvatar } from "../../../../database";
import { User } from "../../../../database/models";
import { base64toFile } from "../../../../utils";

const SettingsPreferencesEditProfile = () => {
  const isMobile = useMediaQuery(`(max-width: 36em)`);

  const user = pocketbase.authStore.model as User;

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      username: user.username,
      name: user.name,
      emailVisibility: user.emailVisibility,
      phoneNumberVisibility: user.phoneNumberVisibility,
    },
  });

  const [errorWhileUpdating, setErrorWhileUpdating] = useState<string>("");

  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    setAvatar(getAvatar(user));
  }, []);

  const {
    openFilePicker,
    filesContent,
    loading: avatarLoading,
    errors: avatarErrors,
  } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: true,
    validators: [
      new FileAmountLimitValidator({ max: 1 }),
      new FileTypeValidator(["jpg", "jpeg", "png", "gif", "webp"]), // two jpg on purpose
      new FileSizeValidator({ maxFileSize: 8 * 1024 ** 2 /* 8 MB */ }),
    ],
  });

  useEffect(() => {
    filesContent.length > 0 && setAvatar(filesContent[0].content);
  }, [filesContent]);

  useEffect(() => {
    setErrorWhileUpdating(avatarErrors.length > 0 ? "Image should be less than 8MB and in one of the following formats: jpg, png, gif, webp" : "");
  }, [avatarErrors]);

  const [dirtyForm, setDirtyForm] = useState(false);

  useEffect(() => {
    setDirtyForm(form.isDirty() || filesContent.length > 0 || (!!user.avatar && !avatar));
  }, [form.values, filesContent, avatar]);

  const resetForm = () => {
    form.reset();
    filesContent.length = 0;
    avatarErrors.length = 0;
  };

  const [buttonLoading, setButtonLoading] = useState(false);

  const avatarBox = (
    <Flex direction={"column"} align="center" ml="lg">
      <Text fw={500}>Avatar</Text>
      {!avatarLoading ? <Avatar src={avatar} size={150} radius="50%" mt="sm" /> : <Loader size={150} radius="50%" mt="sm" />}
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button variant="light" fw={400} mt="md" color="vsus-button">
            Edit
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconUpload style={{ width: rem(14), height: rem(14) }} />}
            onClick={() => {
              openFilePicker();
            }}
          >
            Upload a photo
          </Menu.Item>
          {user.avatar && (
            <Menu.Item
              leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
              onClick={() => {
                setAvatar(null);
              }}
            >
              Remove photo
            </Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );

  return (
    <Container>
      <BackButton to="/settings/preferences" />
      <Title order={2}>Edit profile</Title>
      {!!errorWhileUpdating && (
        <Alert variant="light" color="red" title="Error" icon={<IconInfoCircle />} mb="md" mt="md">
          {errorWhileUpdating}
        </Alert>
      )}
      <Box
        mt="lg"
        component="form"
        onSubmit={form.onSubmit(async () => {
          try {
            setButtonLoading(true);
            const data: {
              username: string;
              name: string;
              emailVisibility: boolean;
              phoneNumberVisibility: boolean;
              avatar?: Blob | null;
            } = form.values;
            if (filesContent.length > 0 || (!!user.avatar && !avatar))
              data.avatar = filesContent.length > 0 ? base64toFile(filesContent[0].content) : null;
            await pocketbase.collection("users").update(user.id, data);
            await pocketbase.collection("users").authRefresh();
            navigate("/settings/preferences?updated=true");
          } catch (error) {
            setButtonLoading(false);
            setErrorWhileUpdating((error as Error).message);
          }
        })}
      >
        <Flex justify="space-between">
          <Flex direction={"column"} w={isMobile ? "100%" : "60%"} maw={500}>
            {isMobile && avatarBox}
            <Box>
              <TextInput label="Username" variant="filled" value={form.values.username} {...form.getInputProps("username")} />
            </Box>
            <Box mt="md">
              <TextInput label="Display name" variant="filled" value={form.values.name} {...form.getInputProps("name")} />
            </Box>
            <Box mt="md">
              <TextInput label="Email" description="Change your email via Account" variant="filled" value={user.email} disabled />
              <Checkbox mt="md" label="Make my email public" checked={form.values.emailVisibility} {...form.getInputProps("emailVisibility")} />
            </Box>
            <Box mt="md">
              <TextInput
                label="Phone number"
                description="Set or change your phone number via Account"
                variant="filled"
                value={user.phoneNumber}
                disabled
              />
              <Checkbox
                mt="md"
                label="Make my phone number public"
                checked={form.values.phoneNumberVisibility}
                {...form.getInputProps("phoneNumberVisibility")}
              />
            </Box>
          </Flex>
          {!isMobile && avatarBox}
        </Flex>
        <Group mt="xl" ml="auto" w="max-content">
          {dirtyForm && (
            <Button
              variant="light"
              color="cyan"
              onClick={() => {
                resetForm();

                if (!user) return;
                setAvatar(getAvatar(user));
              }}
              disabled={avatarLoading || buttonLoading}
            >
              Discard changes
            </Button>
          )}
          <Button variant="light" color="green" type="submit" disabled={!dirtyForm} loading={buttonLoading}>
            Save
          </Button>
        </Group>
      </Box>
    </Container>
  );
};

export default SettingsPreferencesEditProfile;
