import { MantineProvider } from "@mantine/core";
import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./app.css";

import { getInstance, getUserByUsername, getWorkspace } from "./database";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Content from "./components/Content";
import AuthContent from "./components/Content/Auth";
import { PBInstance, PBUser, PBWorkspace } from "./database/models";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import EnterResetPasswordCode from "./pages/Auth/ForgotPassword/EnterCode";
import ResetPassword from "./pages/Auth/ForgotPassword/ResetPassword";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Error404 from "./pages/Error/404";
import Home from "./pages/Home";
import InstanceHome from "./pages/Instance";
import Instance from "./pages/Instance/Overview";
import Profile from "./pages/Profile";
import SettingsAccount from "./pages/Settings/Account";
import SettingsAccount2FA from "./pages/Settings/Account/2FA";
import { SettingsAccountDeleteAccount } from "./pages/Settings/Account/DeleteAccount";
import SettingsAccountChangeEmail from "./pages/Settings/Account/Email";
import SettingsAccountPhoneNumber from "./pages/Settings/Account/PhoneNumber/Changing";
import SettingsAccountPhoneNumberConfirmation from "./pages/Settings/Account/PhoneNumber/Confirmation";
import SettingsAccountPhoneNumberVerification from "./pages/Settings/Account/PhoneNumber/Verification";
import SettingsPreferences from "./pages/Settings/Preferences";
import SettingsPreferencesEditProfile from "./pages/Settings/Preferences/EditProfile";
import WorkspaceHome from "./pages/Workspace";
import WorkspaceOverview from "./pages/Workspace/Overview";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Content />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/settings/preferences",
        element: <SettingsPreferences />,
      },
      {
        path: "/settings/preferences/edit-profile",
        element: <SettingsPreferencesEditProfile />,
      },
      {
        path: "/settings/account",
        element: <SettingsAccount />,
      },
      {
        path: "/settings/account/change-phone-number",
        element: <SettingsAccountPhoneNumber />,
      },
      {
        path: "/settings/account/change-phone-number/confirmation",
        element: <SettingsAccountPhoneNumberConfirmation />,
      },
      {
        path: "/settings/account/change-phone-number/verification",
        element: <SettingsAccountPhoneNumberVerification />,
      },
      {
        path: "/settings/account/change-email-address",
        element: <SettingsAccountChangeEmail />,
      },
      {
        path: "/settings/account/two-factor-authentication",
        element: <SettingsAccount2FA />,
      },
      {
        path: "/settings/account/delete-account",
        element: <SettingsAccountDeleteAccount />,
      },
      {
        path: "/workspace/",
        element: <WorkspaceHome />,
      },
      {
        path: "/workspace/:workspaceId",
        element: <WorkspaceOverview />,
        loader: async ({ params }): Promise<PBWorkspace | undefined> => {
          const { workspaceId } = params;
          // Load workspace data

          if (!workspaceId) return;

          try {
            return await queryClient.fetchQuery({ queryKey: ["workspace", workspaceId], queryFn: () => getWorkspace(workspaceId) });
          } catch (error) {
            return;
          }
        },
      },
      {
        path: "/user/:username",
        element: <Profile />,
        loader: async ({ params }): Promise<PBUser | undefined> => {
          const { username } = params;
          if (!username) return;

          try {
            return await queryClient.fetchQuery({ queryKey: ["user", username], queryFn: () => getUserByUsername(username) });
          } catch (error) {
            return;
          }
        },
      },
      {
        path: "/instance/",
        element: <InstanceHome />,
      },
      {
        path: "/instance/:id",
        element: <Instance />,
        loader: async ({ params }): Promise<PBInstance | undefined> => {
          const { id } = params;
          if (!id) return;

          try {
            return await queryClient.fetchQuery({ queryKey: ["instance", id], queryFn: () => getInstance(id) });
          } catch (error) {
            return;
          }
        },
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
  {
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
        path: "/auth/forgot-password/confirm/:token",
        element: <ResetPassword />,

        loader: ({ params }): { token?: string } => ({ token: params.token }),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        defaultColorScheme="dark"
        theme={{
          colors: {
            dark: ["#ffffff", "#e6e7e7", "#b3b8b8", "#99a0a0", "#4c5d61", "#1a3e42", "#1a3e42", "#00292d", "#1a292a", "#001112"],
            primary: ["#ffffff", "#e6eaea", "#b3bfc0", "#99a9ab", "#809496", "#667f81", "#4d696c", "#335457", "#1a3e42", "#00292d"],
            "vsus-natural": ["#E6FEFF", "#E6FEFF", "#E6FEFF", "#00A9BD", "#00A9BD", "#00A9BD", "#00292D", "#00292D", "#00292D", "#00292D"],
            "vsus-button": ["#f0f9fa", "#e3f0f1", "#c0e2e3", "#9bd3d5", "#7dc5c8", "#6abdc1", "#5fbabe", "#4ea3a7", "#419195", "#2c7e82"],
            "vsus-text": ["#ebfeff", "#d8fbfd", "#aaf8fc", "#7df5fb", "#62f2fb", "#56f1fb", "#4ef1fb", "#40d6e0", "#2fbfc7", "#00a5ad"],
          },
          primaryColor: "primary",
          fontFamily: "Inter, sans-serif",
          headings: {
            fontFamily: "Inter, sans-serif",
          },
        }}
      >
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  );
}
