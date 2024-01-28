import { Box, Center } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";

export default function Content() {
  return (
    <Box>
      <Header />
      <Center>
        <Outlet />
      </Center>
    </Box>
  );
}
