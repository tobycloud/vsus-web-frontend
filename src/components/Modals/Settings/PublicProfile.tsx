import { Alert, Avatar, Box, Button, Checkbox, Flex, Group, Loader, Menu, Modal, Text, TextInput, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconInfoCircle, IconTrash, IconUpload } from "@tabler/icons-react";
import { ChangeEvent } from "preact/compat";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { useFilePicker } from "use-file-picker";
import { FileAmountLimitValidator, FileSizeValidator, FileTypeValidator } from "use-file-picker/validators";
import pocketbase, { getAvatar } from "../../../database";
import { User } from "../../../database/models";
import { base64toFile } from "../../../utils";

export default function SettingsPublicProfileModal({ setUpdatePreferences }: { setUpdatePreferences: StateUpdater<boolean> }): {
  element: JSX.Element;
  state: boolean;
  close: () => void;
  open: () => void;
  toggle: () => void;
} {
  const isMobile = useMediaQuery(`(max-width: 36em)`);

  const [opened, controls] = useDisclosure(false);

  const user = pocketbase.authStore.model as User;

  if (!user)
    return {
      element: <></>,
      state: false,
      close: () => {},
      open: () => {},
      toggle: () => {},
    };

  const form = useForm({
    initialValues: {
      username: user.username,
      name: user.name,
      emailVisibility: user.emailVisibility,
      phoneNumberVisibility: user.phoneNumberVisibility,
    },
  });

  const [avatar, setAvatar] = useState<string | null>(null);

  const getUserAvatar = async () => {
    if (!user) return;
    const url = await getAvatar(user);
    setAvatar(url);
  };

  useEffect(() => {
    getUserAvatar();
  }, [opened]);

  const { openFilePicker, filesContent, loading, errors } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: true,
    validators: [
      new FileAmountLimitValidator({ max: 1 }),
      new FileTypeValidator(["jpg", "png", "gif", "webp"]),
      new FileSizeValidator({ maxFileSize: 8 * 1024 ** 2 /* 8 MB */ }),
    ],
  });

  useEffect(() => {
    if (filesContent.length > 0) setAvatar(filesContent[0].content);
  }, [filesContent]);

  const [dirtyInfo, setDirtyInfo] = useState(false);

  useEffect(() => {
    setDirtyInfo(form.isDirty() || filesContent.length > 0 || (!!user.avatar && !avatar));
  }, [form.values, filesContent, avatar]);

  const resetInfo = () => {
    form.reset();
    filesContent.length = 0;
    errors.length = 0;
  };

  const avatarBox = (
    <Flex direction={"column"} mt="md" align="center">
      <Text fw={500}>Avatar</Text>
      {!loading ? <Avatar src={avatar} size={150} radius="50%" mt="sm" /> : <Loader size={150} radius="50%" mt="sm" />}
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

  return {
    element: (
      <Modal
        radius="lg"
        opened={opened}
        onClose={() => {
          controls.close();
          resetInfo();
        }}
        centered
        title="Edit Profile"
        padding={isMobile ? "lg" : "xl"}
        size="lg"
      >
        {errors.length > 0 && (
          <Alert variant="light" color="red" title="Error" icon={<IconInfoCircle />}>
            Image should be less than 8MB and in one of the following formats: jpg, png, gif, webp
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={form.onSubmit(async () => {
            const data: {
              username: string;
              name: string;
              emailVisibility: boolean;
              phoneNumberVisibility: boolean;
              avatar?: Blob | null;
            } = form.values;
            if (filesContent.length > 0 || (!!user.avatar && !avatar))
              data.avatar = filesContent.length > 0 ? base64toFile(filesContent[0].content) : null;
            console.log(data);
            await pocketbase.collection("users").update(user.id, data);
            await pocketbase.collection("users").authRefresh();
            setUpdatePreferences(true);
            controls.close();
          })}
        >
          <Flex justify="space-between">
            <Flex direction={"column"} w={isMobile ? "100%" : "auto"}>
              {isMobile && avatarBox}
              <Flex mt="md" direction={"column"}>
                <TextInput
                  label="Username"
                  variant="filled"
                  value={form.values.username}
                  onChange={(event: ChangeEvent) => {
                    form.setFieldValue("username", (event.target as HTMLInputElement).value);
                  }}
                />
              </Flex>
              <Flex mt="md" direction={"column"}>
                <TextInput
                  label="Display name"
                  variant="filled"
                  value={form.values.name}
                  onChange={(event: ChangeEvent) => {
                    form.setFieldValue("name", (event.target as HTMLInputElement).value);
                  }}
                />
              </Flex>
              <Flex mt="md" direction={"column"}>
                <TextInput label="Email" description="Change your email via Account" variant="filled" value={user.email} disabled />
                <Checkbox
                  mt="md"
                  label="Make my email public"
                  checked={form.values.emailVisibility}
                  onChange={(event: ChangeEvent) => {
                    form.setFieldValue("emailVisibility", (event.target as HTMLInputElement).checked);
                  }}
                />
              </Flex>
              <Flex mt="md" direction={"column"}>
                <TextInput
                  label="Phone number"
                  description="Change your phone number via Account"
                  variant="filled"
                  value={user.phoneNumber}
                  disabled
                />
                <Checkbox
                  mt="md"
                  label="Make my phone number public"
                  checked={form.values.phoneNumberVisibility}
                  onChange={(event: ChangeEvent) => {
                    form.setFieldValue("phoneNumberVisibility", (event.target as HTMLInputElement).checked);
                  }}
                />
              </Flex>
            </Flex>
            {!isMobile && avatarBox}
          </Flex>
          <Group mt="xl" ml="auto" w="max-content">
            {dirtyInfo && (
              <Button
                variant="light"
                color="cyan"
                onClick={() => {
                  resetInfo();
                  getUserAvatar();
                }}
                disabled={loading}
              >
                Discard changes
              </Button>
            )}
            <Button variant="light" color="green" type="submit" disabled={!dirtyInfo}>
              Save
            </Button>
          </Group>
        </Box>
      </Modal>
    ),
    state: opened,
    ...controls,
  };
}
