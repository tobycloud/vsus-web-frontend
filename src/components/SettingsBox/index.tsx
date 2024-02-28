import { Box, Divider, Table, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { borderLine } from "../../utils";

const SettingsBox = ({ title, leftSection, rightSection }: { title: string; leftSection: React.ReactNode; rightSection: React.ReactNode }) => {
  const isMobile = useMediaQuery(`(max-width: 62em)`);

  if (isMobile) {
    return (
      <Box p="lg" bg="dark" style={{ borderRadius: "var(--mantine-radius-lg)" }} mt="lg">
        <Title order={3}>{title}</Title>
        {leftSection}
        <Divider mt="lg" mb="lg" />
        {rightSection}
      </Box>
    );
  }

  return (
    <Table
      mt="lg"
      style={{
        borderRadius: "20px",
        borderSpacing: "0",
        borderCollapse: "separate",
      }}
    >
      <Table.Tbody>
        <Table.Tr>
          <Table.Td
            w="70%"
            bg="dark"
            style={{
              borderBottomLeftRadius: "20px",
              borderTopLeftRadius: "20px",
            }}
          >
            <Box m="lg">
              <Title order={3}>{title}</Title>
              {leftSection}
            </Box>
          </Table.Td>
          <Table.Td
            w="30%"
            bg="dark"
            style={{
              borderBottomRightRadius: "20px",
              borderTopRightRadius: "20px",
              borderLeft: borderLine,
            }}
          >
            {rightSection}
          </Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
};

export default SettingsBox;
