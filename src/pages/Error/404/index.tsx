import { Button, Center, Container, Flex, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <Container mt="xl">
      <Center>
        <Flex direction="column" align="center">
          <Text fw={700} style={{ fontSize: "125px" }}>
            404
          </Text>
          <Title order={1}>Page not found</Title>
          <Text align="center" mt="xl">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Text>
          <Button variant="light" color="vsus-button" mt="xl" size="md" component={Link} to="/">
            Back to home
          </Button>
        </Flex>
      </Center>
    </Container>
  );
}
