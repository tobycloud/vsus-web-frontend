import { Box, Center } from "@mantine/core";
import { useEffect } from "preact/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import pocketbase from "../../database";
import { Header } from "../Header";

export default function Content() {
  const navigate = useNavigate();

  useEffect(() => {
    if (pocketbase.authStore.model === null) navigate("/login");
  });

  return (
    <Box>
      <Header />
      <Center>
        <Outlet />
      </Center>
    </Box>
  );
}
