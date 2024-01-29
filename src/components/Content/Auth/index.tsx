import { Outlet, useNavigate } from "react-router-dom";
import pocketbase from "../../../database";

export default function AuthContent() {
  const navigate = useNavigate();

  if (pocketbase.authStore.model !== null) navigate("/");

  return <Outlet />;
}
