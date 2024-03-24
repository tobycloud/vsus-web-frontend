import { ActionIcon, Box, CopyButton, Divider, Flex, Grid, Group, Text, Title, Tooltip, rem } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconAdjustments, IconCheck, IconCopy, IconDeviceDesktop } from "@tabler/icons-react";
import { RecordModel } from "pocketbase";
import { useLoaderData } from "react-router-dom";
import Error404 from "../../Error/404";
import classes from "./index.module.css";

const data = [
  {
    title: "Instances",
    number: 5,
  },
  {
    title: "Blocks",
    number: 4,
  },
  {
    title: "Deployments",
    number: 5,
  },
  {
    title: "CI/CD Jobs",
    number: 2,
  },
];

export default function WorkspaceHome() {
  const isMobile = useMediaQuery(`(max-width: 36em)`);
  const { workspace } = useLoaderData() as { workspace: RecordModel };

  if (!workspace) return <Error404 />;

  return (
    <Box>
      <Flex justify="space-between">
        <Group>
          <IconDeviceDesktop size={40} />
          <Title order={2} mr="md">
            {workspace.name}
          </Title>
        </Group>
        <ActionIcon variant="light" size="lg" radius="sm" aria-label="Workspace's Option">
          <IconAdjustments size={20} />
        </ActionIcon>
      </Flex>
      <Divider my="xl" />
      <Title order={3}>Overview</Title>
      <Grid mt="md" mb="xl">
        {data.map((item) => (
          <Grid.Col span={{ base: 12, xs: 6, md: 3 }}>
            <Box p="lg" bg="dark" style={{ borderRadius: "var(--mantine-radius-md)" }}>
              <Title order={3}>{item.title}</Title>
              <Text style={{ fontSize: "calc(1.5*var(--mantine-font-size-xl))" }}>{item.number}</Text>
            </Box>
          </Grid.Col>
        ))}
      </Grid>
      <Title order={3} mt="xl">
        Running Instances
      </Title>
      <Grid mt="md" mb="xl">
        {[...Array(3).keys()].map((item) => (
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box p="lg" bg="dark" style={{ borderRadius: "var(--mantine-radius-md)" }}>
              <Flex justify="space-between" direction={isMobile ? "column" : "row"}>
                <Flex direction="column" justify="space-between" mr={isMobile ? "0" : "sm"} mb={isMobile ? "sm" : "0"}>
                  <Title order={4} className={classes.link}>
                    Instance #{item + 1}
                  </Title>
                  <Group gap="xs">
                    <Text>IP: 20.20.20.20</Text>
                    <CopyButton value="20.20.20.20" timeout={2000}>
                      {({ copied, copy }) => (
                        <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
                          <ActionIcon color={copied ? "teal" : "gray"} variant="subtle" onClick={copy}>
                            {copied ? <IconCheck style={{ width: rem(16) }} /> : <IconCopy style={{ width: rem(16) }} />}
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </CopyButton>
                  </Group>
                </Flex>
                <Box>
                  <Text>vCPUs: 2</Text>
                  <Text>vRAMs: 2</Text>
                  <Text>Storage: 18.5GB/20GB (93%)</Text>
                </Box>
              </Flex>
            </Box>
          </Grid.Col>
        ))}
      </Grid>
      <Title order={3} mt="xl">
        Other Instances
      </Title>
      <Grid mt="md" mb="xl">
        {[3, 4].map((item) => (
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box p="lg" bg="dark" style={{ borderRadius: "var(--mantine-radius-md)" }}>
              <Flex justify="space-between" direction={isMobile ? "column" : "row"}>
                <Flex direction="column" justify="space-between" mr={isMobile ? "0" : "sm"} mb={isMobile ? "sm" : "0"}>
                  <Title order={4} className={classes.link}>
                    Instance #{item + 1}
                  </Title>
                  <Group gap="xs">
                    <Text>IP: 20.20.20.20</Text>
                    <CopyButton value="20.20.20.20" timeout={2000}>
                      {({ copied, copy }) => (
                        <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
                          <ActionIcon color={copied ? "teal" : "gray"} variant="subtle" onClick={copy}>
                            {copied ? <IconCheck style={{ width: rem(16) }} /> : <IconCopy style={{ width: rem(16) }} />}
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </CopyButton>
                  </Group>
                </Flex>
                <Box>
                  <Text>vCPUs: 2</Text>
                  <Text>vRAMs: 2</Text>
                  <Text>Storage: 18.5GB/20GB (93%)</Text>
                </Box>
              </Flex>
            </Box>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}
