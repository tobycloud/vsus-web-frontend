import { Box } from "@mantine/core";
import { useEffect } from "preact/hooks";
import { setDocumentTitle } from "../../utils";

export default function Home() {

  useEffect(() => {
    setDocumentTitle("Home");
  }, []);

  return <Box />;
}
