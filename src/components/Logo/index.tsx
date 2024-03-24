import { Group, Image, Title } from "@mantine/core";

export default function Logo() {
  return (
    <>
      <Group gap={0} w={92.75}>
        <Image src="/../images/icons/vsus.svg" alt="vSuS" h={35} w={35} style={{ pointerEvents: "none", userSelect: "none" }} />
        <Title order={3} ml="xs" style={{ pointerEvents: "none", userSelect: "none" }} ff="Readex Pro">
          vSuS
        </Title>
      </Group>
    </>
  );
}
