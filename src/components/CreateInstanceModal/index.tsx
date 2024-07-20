import { Alert, Box, Button, Combobox, Input, InputBase, Modal, TextInput, useCombobox } from "@mantine/core";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";
import { RecordModel } from "pocketbase";
import { useEffect, useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";
import pocketbase, { createInstance, getLimitWorkspaces } from "../../database";
import { User } from "../../database/models";

export default function CreateInstanceModal({ user, workspaceId }: { user: User; workspaceId?: string }): {
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
      name: isNotEmpty("Instance name is required") && hasLength({ min: 1, max: 25 }, "Name must be 1-25 characters long"),
    },
  });

  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);

  const [workspaces, setWorkspaces] = useState<RecordModel[]>([]);

  useEffect(() => {
    opened &&
      (async () => {
        const workspaces = await getLimitWorkspaces(user, 1, 10);
        setWorkspaces(workspaces);
      })();
  }, [opened]);

  return {
    element: (
      <Modal
        opened={opened}
        onClose={() => {
          controls.close();
          form.reset();
          workspaces.length = 0;
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
              const wId = workspaceId ?? workspaces.find((item) => item.name === value)?.id;
              if (!wId) {
                setError(true);
                return;
              }
              console.log(wId);
              const instance = await createInstance(user, form.values.name, wId);
              if (!instance) {
                setError(true);
                return;
              }
              setError(false);
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
          {!workspaceId && (
            <Combobox
              store={combobox}
              onOptionSubmit={(val) => {
                setValue(val);
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
                  {value || <Input.Placeholder>Workspace name</Input.Placeholder>}
                </InputBase>
              </Combobox.Target>

              <Combobox.Dropdown>
                <Combobox.Options>
                  {workspaces ? (
                    workspaces.map((item) => (
                      <Combobox.Option value={item.name} key={item.id}>
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
