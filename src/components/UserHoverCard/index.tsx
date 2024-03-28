import { Anchor, Avatar, Box, Button, Divider, Group, HoverCard, Text } from "@mantine/core";
import { IconDeviceDesktopAnalytics, IconMail, IconPhone, IconUsersGroup } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import pocketbase from "../../database";
import { User } from "../../database/models";
import classes from "./index.module.css";

export default function UserHoverCard({ profile, children, workspaceOwner }: { profile: User; children: React.ReactNode; workspaceOwner?: boolean }) {
  const user = pocketbase.authStore.model as User;

  return (
    <HoverCard width="max-content" shadow="md" openDelay={250} withArrow>
      <HoverCard.Target>{children}</HoverCard.Target>
      <HoverCard.Dropdown bg="dark">
        <Box maw={350}>
          <Group gap="xs" component={Link} to={`/user/${profile.username}`} style={{ textDecoration: "none" }} w="max-content">
            <Avatar src={profile.avatar} alt={profile.username} radius="xl" size="md" />
            <Box>
              <Text size="lg" lineClamp={1} c="white" maw={320}>
                {profile.username}
              </Text>
              {profile.name != "" && (
                <Text size="xs" c="dimmed" lineClamp={1} maw={320}>
                  {profile.name}
                </Text>
              )}
            </Box>
          </Group>
          {workspaceOwner != undefined && (
            <Group mt="md" gap="xs">
              <IconDeviceDesktopAnalytics size={15} />
              <Text size="sm">{workspaceOwner ? "Owner" : "Collaborator"}</Text>
            </Group>
          )}
          {profile.id == user.id ? null : profile.followers.includes(user.id) ? (
            <Button mt="md" variant="light" color="vsus-button" w="100%">
              Unfollow
            </Button>
          ) : (
            <Button mt="md" variant="light" color="vsus-button" w="100%">
              Follow
            </Button>
          )}
          <Divider my="lg" w="100%" c="white" />
          <Box w="100%">
            {profile.aboutMe && (
              <Text mb="lg" size="sm">
                {profile.aboutMe}
              </Text>
            )}
            <Group mb="sm" gap="xs">
              <IconUsersGroup size={15} style={{ color: "var(--mantine-color-dimmed)" }} />
              <Text size="sm" component={Link} c="dimmed" to={`/user/${profile.username}/?tab=followers`} className={classes.link}>
                <Text size="sm" c="white" fw={600} component={"span"}>
                  {profile.following.length}
                </Text>{" "}
                follower{profile.followers.length != 1 && "s"}
              </Text>
              <Text c="dimmed">·</Text>
              <Text size="sm" component={Link} c="dimmed" to={`/user/${profile.username}/?tab=following`} className={classes.link}>
                <Text size="sm" c="white" fw={600} component={"span"}>
                  {profile.following.length}
                </Text>{" "}
                following{profile.following.length != 1 && "s"}
              </Text>
            </Group>
            {/* {profile.location && (
                  <Group mb="sm" gap="xs">
                    <IconMapPin size={15} style={{ color: "var(--mantine-color-dimmed)" }} />
                    <Text>{profile.location}</Text>
                  </Group>
                )}
                {profile.organization && (
                  <Group mb="sm" gap="xs">
                    <IconBuilding size={15} style={{ color: "var(--mantine-color-dimmed)" }} />
                    <Text>{profile.organization}</Text>
                  </Group>
                )} */}
            {profile.emailVisibility && profile.email && (
              <Group mb="sm" gap="xs">
                <IconMail size={15} style={{ color: "var(--mantine-color-dimmed)" }} />
                <Text size="sm" component={Anchor} c="white" href={`mailto:${profile.email}`}>
                  {profile.email}
                </Text>
              </Group>
            )}
            {profile.phoneNumberVisibility && profile.phoneNumber && (
              <Group mb="sm" gap="xs">
                <IconPhone size={15} style={{ color: "var(--mantine-color-dimmed)" }} />
                <Text size="sm">{profile.phoneNumber}</Text>
              </Group>
            )}
          </Box>
        </Box>
      </HoverCard.Dropdown>
    </HoverCard>
  );
}
