import { Box } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import classes from "./index.module.css";

export default function Content() {
  return (
    <Box className={classes.content}>
      <Header />
      <Outlet />
    </Box>
  );
}
