import { Center, Container, Flex, Text, Title } from "@mantine/core";

export default function Error404() {
  return (
    <Container>
      <Center>
        <Flex direction="column" align="center">
          <Title order={1}>404</Title>
          <Text align="center">Page not found</Text>
        </Flex>
      </Center>
    </Container>
  );
}
