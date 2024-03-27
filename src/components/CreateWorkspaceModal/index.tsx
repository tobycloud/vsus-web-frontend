import { Alert, Box, Button, Modal, TextInput } from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";
import pocketbase, { createWorkspace } from "../../database";
import { User } from "../../database/models";

export default function CreateWorkspaceModal({ user }: { user: User }): {
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
      name: isNotEmpty("Workspace name is required") && hasLength({ min: 1, max: 25 }, "Name must be 1-25 characters long"),
    },
  });

  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();

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
            try {
              const workspace = await createWorkspace(user, form.values.name);
              if (!workspace) {
                setError(true);
                return;
              }
              setError(false);
              pocketbase.collection("users").authRefresh();
              navigate(`/workspace/${workspace.id}`);
              controls.close();
              form.reset();
            } catch (error) {
              setError(true);
            }
          })}
        >
          {error && (
            <Alert variant="light" color="red" title="Error!" mb="md" icon={<IconInfoCircle />}>
              Something went wrong while creating the workspace.
            </Alert>
          )}
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
