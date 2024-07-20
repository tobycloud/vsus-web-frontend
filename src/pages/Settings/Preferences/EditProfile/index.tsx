import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Group,
  Image,
  Loader,
  Menu,
  Text,
  TextInput,
  Textarea,
  Title,
  rem,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { IconInfoCircle, IconTrash, IconUpload } from "@tabler/icons-react";
import { useEffect, useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";
import { useFilePicker } from "use-file-picker";
import { FileAmountLimitValidator, FileSizeValidator, FileTypeValidator } from "use-file-picker/validators";
import BackButton from "../../../../components/BackButton";
import pocketbase from "../../../../database";
import { PBUser } from "../../../../database/models";
import { base64toFile } from "../../../../utils";

const SettingsPreferencesEditProfile = () => {
  const isMobile = useMediaQuery(`(max-width: 36em)`);

  const user = pocketbase.authStore.model as PBUser;

  const fromProfile = new URLSearchParams(window.location.search).get("fromProfile");

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      username: user.username,
      name: user.name,
      aboutMe: user.aboutMe,
      emailVisibility: user.emailVisibility,
      phoneNumberVisibility: user.phoneNumberVisibility,
    },

    validate: {
      username: isNotEmpty("Username is required"),
    },
  });

  const [errorWhileUpdating, setErrorWhileUpdating] = useState<string>("");

  const [avatar, setAvatar] = useState<string>(pocketbase.getFileUrl(user, user.avatar));

  const [banner, setBanner] = useState<string>(pocketbase.getFileUrl(user, user.banner));

  const {
    openFilePicker: openAvatarFilePicker,
    filesContent: avatarFilesContent,
    loading: avatarLoading,
    errors: avatarErrors,
  } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: true,
    validators: [
      new FileAmountLimitValidator({ max: 1 }),
      new FileTypeValidator(["jpg", "jpeg", "png", "gif", "webp"]), // two jpgs on purpose
      new FileSizeValidator({ maxFileSize: 8 * 1024 ** 2 /* 8 MB */ }),
    ],
  });

  const {
    openFilePicker: openBannerFilePicker,
    filesContent: bannerFilesContent,
    loading: bannerLoading,
    errors: bannerErrors,
  } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: true,
    validators: [
      new FileAmountLimitValidator({ max: 1 }),
      new FileTypeValidator(["jpg", "jpeg", "png", "gif", "webp"]), // two jpgs on purpose
      new FileSizeValidator({ maxFileSize: 8 * 1024 ** 2 /* 8 MB */ }),
    ],
  });

  useEffect(() => {
    avatarFilesContent.length > 0 && setAvatar(avatarFilesContent[0].content);
  }, [avatarFilesContent]);

  useEffect(() => {
    setErrorWhileUpdating(avatarErrors.length > 0 ? "Avatar should be less than 8MB and in one of the following formats: jpg, png, gif, webp" : "");
  }, [avatarErrors]);

  useEffect(() => {
    bannerFilesContent.length > 0 && setBanner(bannerFilesContent[0].content);
  }, [bannerFilesContent]);

  useEffect(() => {
    setErrorWhileUpdating(bannerErrors.length > 0 ? "Banner should be less than 16MB and in one of the following formats: jpg, png, gif, webp" : "");
  }, [bannerErrors]);

  const [dirtyForm, setDirtyForm] = useState(false);

  useEffect(() => {
    setDirtyForm(
      form.isDirty() || avatarFilesContent.length > 0 || bannerFilesContent.length > 0 || (!!user.avatar && !avatar) || (!!user.banner && !banner)
    );
  }, [form.values, avatarFilesContent, avatar, banner, bannerFilesContent]);

  const resetForm = () => {
    form.reset();
    avatarFilesContent.length = 0;
    avatarErrors.length = 0;
    bannerFilesContent.length = 0;
    bannerErrors.length = 0;
    if (!user) return;
    setAvatar(pocketbase.getFileUrl(user, user.avatar));
    setBanner(pocketbase.getFileUrl(user, user.banner));
  };

  const [buttonLoading, setButtonLoading] = useState(false);

  const avatarBox = (
    <Box ml={isMobile ? "0" : "lg"} mb={isMobile ? "md" : "lg"}>
      <Text fw={500}>Avatar</Text>
      {!avatarLoading ? <Avatar src={avatar} size={200} radius="50%" mt="sm" /> : <Loader size={200} radius="50%" mt="sm" />}
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
              openAvatarFilePicker();
            }}
          >
            Upload a photo
          </Menu.Item>
          {user.avatar && (
            <Menu.Item
              leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
              onClick={() => {
                setAvatar("");
              }}
            >
              Remove photo
            </Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>
    </Box>
  );

  const bannerBox = (
    <Box>
      <Text fw={500}>Banner</Text>
      {!bannerLoading ? (
        banner ? (
          <Image src={banner} h={125} w="100%" mt="sm" radius="sm" />
        ) : (
          <Text mt="md" c="dimmed">
            No banner
          </Text>
        )
      ) : (
        <Loader size={150} radius="50%" mt="sm" />
      )}
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
              openBannerFilePicker();
            }}
          >
            Upload a photo
          </Menu.Item>
          {user.banner && (
            <Menu.Item
              leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
              onClick={() => {
                setBanner("");
              }}
            >
              Remove photo
            </Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>
    </Box>
  );

  return (
    <Container>
      <BackButton to={fromProfile ? `/user/${user.username}` : "/settings/preferences"} />
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
              aboutMe: string;
              emailVisibility: boolean;
              phoneNumberVisibility: boolean;
              avatar?: Blob | null;
              banner?: Blob | null;
            } = form.values;
            if (avatarFilesContent.length > 0 || (!!user.avatar && !avatar))
              data.avatar = avatarFilesContent.length > 0 ? base64toFile(avatarFilesContent[0].content) : null;
            if (bannerFilesContent.length > 0 || (!!user.banner && !banner))
              data.banner = bannerFilesContent.length > 0 ? base64toFile(bannerFilesContent[0].content) : null;
            await pocketbase.collection("users").update(user.id, data);
            await pocketbase.collection("users").authRefresh();
            navigate(fromProfile ? `/user/${data.username}` : "/settings/preferences?updated=true");
          } catch (error) {
            setButtonLoading(false);
            setErrorWhileUpdating((error as Error).message);
          }
        })}
      >
        <Flex justify="space-between">
          <Flex direction={"column"} w={isMobile ? "100%" : "60%"} maw={!isMobile ? 500 : "none"}>
            {isMobile && avatarBox}
            {bannerBox}
            <TextInput mt="md" label="Username" variant="filled" value={form.values.username} {...form.getInputProps("username")} required />
            <TextInput mt="md" label="Display name" variant="filled" value={form.values.name} {...form.getInputProps("name")} />
            <Textarea
              mt="md"
              label="About me"
              variant="filled"
              value={form.values.aboutMe}
              {...form.getInputProps("aboutMe")}
              minRows={3}
              maxRows={3}
              autosize
            />
            <TextInput mt="md" label="Email" description="Change your email via Account" variant="filled" value={user.email} disabled />
            <Checkbox mt="md" label="Make my email public" checked={form.values.emailVisibility} {...form.getInputProps("emailVisibility")} />
            <TextInput
              mt="md"
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
