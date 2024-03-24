import { Box, Button, Modal, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { getWorkspace } from "../../database";

export default function CreateWorkspaceModal(): {
  element: JSX.Element;
  state: boolean;
  close: () => void;
  open: () => void;
  toggle: () => void;
} {
  const [opened, controls] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: isNotEmpty("Workspace name is required"),
    },
  });

  return {
    element: (
      <Modal
        opened={opened}
        onClose={() => {
          controls.close();
          form.reset();
        }}
        title="Create a new workspace"
        centered
        radius="md"
        padding="lg"
      >
        <Box
          component="form"
          onSubmit={form.onSubmit(async () => {
            await getWorkspace(form.values.name);
          })}
        >
          <TextInput {...form.getInputProps("name")} placeholder="Workspace name" mb="md" />
          <Button variant="light" fw={400} color="vsus-button" type="submit">
            Create
          </Button>
        </Box>
      </Modal>
    ),
    state: opened,
    ...controls,
  };
}
