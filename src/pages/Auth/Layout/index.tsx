import { Box, Center, Image, Text, Title } from "@mantine/core";

export default function AuthLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Center p="xl">
      <Box p="xl">
        {/* double xl on purpose */}
        <Box style={{ alignItems: "center", flexDirection: "column" }} display="flex">
          <Box display="flex" style={{ alignItems: "center", pointerEvents: "none" }} mb="lg">
            <Image src="../../images/icons/vsus.svg" w="50px" h="auto" alt="logo" />
            <Title order={1} ml="md" ff="Readex Pro">
              vSuS
            </Title>
          </Box>
          <Text size="xl" weight={700} align="center">
            {title}
          </Text>
        </Box>
        {children}
      </Box>
    </Center>
  );
}
