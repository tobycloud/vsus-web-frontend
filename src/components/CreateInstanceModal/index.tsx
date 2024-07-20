import { Alert, Box, Button, Combobox, Input, InputBase, Modal, TextInput, useCombobox } from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";
import pocketbase, { addInstanceToWorkspace, createInstance, getUserWorkspaces } from "../../database";
import { PBUser, PBWorkspace } from "../../database/models";

export default function CreateInstanceModal({ user, workspace }: { user: PBUser; workspace?: PBWorkspace }): {
  element: JSX.Element;
  state: boolean;
  close: () => void;
  open: () => void;
  toggle: () => void;
} {
  const [opened, controls] = useDisclosure(false);

  const queryClient = useQueryClient();

  const workspaces = useQuery({
    queryKey: ["workspaces", user],
    queryFn: () => getUserWorkspaces(user),
  });

  const form = useForm<{
    workspace?: PBWorkspace;
    name: string;
  }>({
    initialValues: {
      workspace,
      name: "",
    },

    validate: {
      workspace: isNotEmpty("Workspace is required"),
      name: isNotEmpty("Instance name is required") && hasLength({ min: 1, max: 25 }, "Name must be 1-25 characters long"),
    },
  });

  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  return {
    element: (
      <Modal
        opened={opened}
        onClose={() => {
          controls.close();
          form.reset();
        }}
        title="Create a new Instance"
        centered
        radius="md"
        padding="lg"
      >
        <Box
          component="form"
          onSubmit={form.onSubmit(async () => {
            try {
              const instance = await createInstance(user, form.values.name, form.values.workspace!.id);
              if (!instance) return setError(true);

              addInstanceToWorkspace(form.values.workspace!, instance);

              setError(false);
              queryClient.invalidateQueries({ queryKey: ["instances", user] });
              queryClient.invalidateQueries({ queryKey: ["workspace", form.values.workspace!.id] });

              pocketbase.collection("users").authRefresh();
              navigate(`/instance/${instance.id}`);

              controls.close();
              form.reset();
            } catch (error) {
              setError(true);
            }
          })}
        >
          {error && (
            <Alert variant="light" color="red" title="Error!" mb="md" icon={<IconInfoCircle />}>
              Something went wrong while creating the Instance.
            </Alert>
          )}
          <TextInput {...form.getInputProps("name")} placeholder="Instance name" mb="md" />
          {!workspace && (
            <Combobox
              store={combobox}
              onOptionSubmit={(id) => {
                const workspace = workspaces.data?.items.find((item) => item.id === id);
                if (!workspace) return;

                form.setFieldValue("workspace", workspace);

                combobox.closeDropdown();
              }}
            >
              <Combobox.Target>
                <InputBase
                  mb="md"
                  component="button"
                  type="button"
                  pointer
                  rightSection={<Combobox.Chevron />}
                  rightSectionPointerEvents="none"
                  onClick={() => combobox.toggleDropdown()}
                >
                  {form.values.workspace || <Input.Placeholder>Workspace</Input.Placeholder>}
                </InputBase>
              </Combobox.Target>

              <Combobox.Dropdown>
                <Combobox.Options>
                  {workspaces ? (
                    (workspaces.data?.items ?? []).map((item) => (
                      <Combobox.Option value={item.id} key={item.id}>
                        {item.name}
                      </Combobox.Option>
                    ))
                  ) : (
                    <Combobox.Option value="No workspaces found" disabled>
                      No workspaces found
                    </Combobox.Option>
                  )}
                </Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>
          )}
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
