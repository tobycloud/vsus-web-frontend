import { Center, Flex, Loader, Text } from "@mantine/core";
import { useEffect, useState } from "preact/hooks";
import { Link } from "react-router-dom";

export default function Loading() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Center h="calc(100vh - 60px)">
      <Flex direction="column" align="center">
        <Loader size="xl" color="vsus-button" />
        {seconds > 10 && (
          <>
            <Text align="center" mt="xl">
              Stuck in the loading screen? Try refreshing the page or check your internet connection.
            </Text>
            <Text align="center">
              If the problem persists,{" "}
              <Link to="/" style={{ color: "var(--mantine-color-vsus-text-7)", textDecoration: "none" }}>
                contact us
              </Link>
              .
            </Text>
          </>
        )}
      </Flex>
    </Center>
  );
}
