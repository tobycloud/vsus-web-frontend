import { Anchor, Avatar, Blockquote, Box, Button, Divider, Flex, Grid, Group, Image, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconInfoCircle, IconMail, IconPhone, IconUsersGroup } from "@tabler/icons-react";
import { useEffect, useState } from "preact/hooks";
import { Link, useLoaderData } from "react-router-dom";
import pocketbase from "../../database";
import { User } from "../../database/models";
import { setDocumentTitle } from "../../utils";
import Error404 from "../Error/404";
import ProfileFollow from "./Follow";
import classes from "./index.module.css";

export default function Profile() {
  const isMobile = useMediaQuery(`(max-width: 36em)`);
  const { profile } = useLoaderData() as { profile: User };
  const user = pocketbase.authStore.model as User;

  if (!profile) return <Error404 />;

  const [currentTab, setCurrentTab] = useState(new URLSearchParams(location.search).get("tab"));

  useEffect(() => {
    let tab = new URLSearchParams(location.search).get("tab") || "";
    !["followers", "following"].includes(tab) && (tab = "");
    setCurrentTab(tab);
    setDocumentTitle(`${tab != "" ? `${tab.toTitleCase()} - ` : ""} ${profile.username} ${profile.name != "" ? `(${profile.name})` : ""}`);
  }, [location.search]);

  return (
    <Box w="100%" style={{ transform: "translateY(-32px)" }}>
      <Image
        src={!!profile.banner ? profile.banner : "/images/default-banner.png"}
        alt="Banner"
        w="100%"
        h={isMobile ? 200 : 300}
        objectFit="cover"
        ml="auto"
        mr="auto"
        style={{ position: "relative" }}
      />
      <Grid align="flex-start" gutter="xl" maw={1366} ml="auto" mr="auto" pl="md" pr="md">
        <Grid.Col span={{ base: 12, md: 4.5, lg: 4 }} style={{ transform: "translateY(-75px)" }}>
          <Flex
            p="lg"
            h="max-content"
            w="100%"
            miw={isMobile ? "0" : 330}
            bg="dark"
            direction="column"
            align="center"
            style={{
              borderBottomLeftRadius: "var(--mantine-radius-lg)",
              borderBottomRightRadius: "var(--mantine-radius-lg)",
              transform: "translateY(75px)",
            }}
          >
            <Box h={55} style={{ position: "relative", insetBlockStart: "-95px" }}>
              <Avatar src={profile.avatar} w={150} h={150} />
            </Box>
            <Title order={2} mt="lg" fw={600} maw={350} ta="center">
              {profile.name != "" ? profile.name : profile.username}
            </Title>
            {profile.name && (
              <Text align="center" mt="xs" fz="lg" maw={350} ta="center">
                {profile.username}
              </Text>
            )}
            {/* {profile.pronouns && (
            <Text align="center" mt="xs" c="dimmed">
              {profile.pronouns}
            </Text>
          )} */}
            {user.id == profile.id ? (
              <Button
                mt="md"
                variant="outline"
                color="vsus-button"
                w="100%"
                component={Link}
                to="/settings/preferences/edit-profile?fromProfile=true"
              >
                Edit profile
              </Button>
            ) : profile.followers.includes(user.id) ? (
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
              {profile.aboutMe && <Text mb="lg">{profile.aboutMe}</Text>}
              <Group mb="md" gap="xs">
                <IconUsersGroup size={20} style={{ color: "var(--mantine-color-dimmed)" }} />
                <Text component={Link} c="dimmed" to="?tab=followers" className={classes.link}>
                  <Text c="white" fw={600} component={"span"}>
                    {profile.followers.length}
                  </Text>{" "}
                  follower{profile.followers.length != 1 && "s"}
                </Text>
                <Text c="dimmed">·</Text>
                <Text component={Link} c="dimmed" to="?tab=following" className={classes.link}>
                  <Text c="white" fw={600} component={"span"}>
                    {profile.following.length}
                  </Text>{" "}
                  following
                </Text>
              </Group>
              {/* {profile.location && (
              <Group mb="md" gap="xs">
                <IconMapPin size={20} style={{ color: "var(--mantine-color-dimmed)" }} />
                <Text >{profile.location}</Text>
              </Group>
            )}
            {profile.organization && (
              <Group mb="md" gap="xs">
                <IconBuilding size={20} style={{ color: "var(--mantine-color-dimmed)" }} />
                <Text >{profile.organization}</Text>
              </Group>
            )} */}
              {profile.emailVisibility && profile.email && (
                <Group mb="md" gap="xs">
                  <IconMail size={20} style={{ color: "var(--mantine-color-dimmed)" }} />
                  <Text component={Anchor} href={`mailto:${profile.email}`} c="white">
                    {profile.email}
                  </Text>
                </Group>
              )}
              {profile.phoneNumberVisibility && profile.phoneNumber && (
                <Group mb="md" gap="xs">
                  <IconPhone size={20} style={{ color: "var(--mantine-color-dimmed)" }} />
                  <Text>{profile.phoneNumber}</Text>
                </Group>
              )}
            </Box>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 7.5, lg: 8 }} mt={{ md: "lg" }}>
          {(() => {
            switch (currentTab) {
              case "followers":
                return <ProfileFollow followers={profile.followers} key={profile.id} />;
              case "following":
                return <ProfileFollow following={profile.following} key={profile.id} />;
              default:
                return (
                  <Box ml="md" mr="md">
                    <Blockquote
                      color="vsus-text"
                      cite={
                        <Text>
                          -{" "}
                          <span>
                            <Link to="/user/pdt1806" style={{ color: "var(--mantine-color-dimmed)", textDecoration: "none" }}>
                              pdt1806
                            </Link>
                          </span>
                        </Text>
                      }
                      icon={<IconInfoCircle />}
                      mt="lg"
                    >
                      Nothing is here yet. How about coming back at a later date?
                    </Blockquote>
                  </Box>
                );
            }
          })()}
        </Grid.Col>
      </Grid>
    </Box>
  );
}
