import { useEffect } from "preact/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import pocketbase from "../../../database";

export default function AuthContent() {
  const navigate = useNavigate();

  useEffect(() => {
    if (pocketbase.authStore.isValid) navigate("/");
  });

  return <Outlet />;
}
