import { useEffect } from "preact/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import pocketbase from "../../../database";

export default function AuthContent() {
  const navigate = useNavigate();

  useEffect(() => {
    pocketbase
      .collection("users")
      .authRefresh()
      .then(() => navigate("/"))
      .catch(() => {});
  }); // dunno if this is healthy for pocketbase

  return <Outlet />;
}
