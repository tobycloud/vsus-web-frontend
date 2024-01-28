import { MantineProvider } from "@mantine/core";
import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./app.css";
import Content from "./components/Content";
import AuthContent from "./components/Content/Auth";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import EnterResetPasswordCode from "./pages/Auth/ForgotPassword/EnterCode";
import ResetPassword from "./pages/Auth/ForgotPassword/ResetPassword";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Content />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthContent />,
    children: [
      {
        path: "/auth/signin",
        element: <SignIn />,
      },
      {
        path: "/auth/signup",
        element: <SignUp />,
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/auth/forgot-password/enter-code",
        element: <EnterResetPasswordCode />,
      },
      {
        path: "/auth/forgot-password/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <MantineProvider
      defaultColorScheme="dark"
      theme={{
        colors: {
          dark: ["#ffffff", "#e6e7e7", "#b3b8b8", "#99a0a0", "#808889", "#1a3e42", "#1a3e42", "#00292d", "#1a292a", "#001112"],
          primary: ["#ffffff", "#e6eaea", "#b3bfc0", "#99a9ab", "#809496", "#667f81", "#4d696c", "#335457", "#1a3e42", "#00292d"],
          "vsus-natural": ["#E6FEFF", "#E6FEFF", "#E6FEFF", "#00A9BD", "#00A9BD", "#00A9BD", "#00292D", "#00292D", "#00292D", "#00292D"],
          "vsus-button": ["#f0f9fa", "#e3f0f1", "#c0e2e3", "#9bd3d5", "#7dc5c8", "#6abdc1", "#5fbabe", "#4ea3a7", "#419195", "#2c7e82"],
          "vsus-text": ["#ebfeff", "#d8fbfd", "#aaf8fc", "#7df5fb", "#62f2fb", "#56f1fb", "#4ef1fb", "#40d6e0", "#2fbfc7", "#00a5ad"],
        },
        primaryColor: "primary",
        fontFamily: "Readex Pro, sans-serif",
        headings: {
          fontFamily: "Readex Pro, sans-serif",
        },
      }}
    >
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
