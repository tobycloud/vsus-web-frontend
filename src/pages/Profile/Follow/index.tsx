import { Avatar, Box, Button, Divider, Flex, Grid, Group, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconBuilding, IconMapPin } from "@tabler/icons-react";
import { useEffect, useState } from "preact/hooks";
import { Link } from "react-router-dom";
import UserHoverCard from "../../../components/UserHoverCard";
import pocketbase, { getAvatar, getUser } from "../../../database";
import { User } from "../../../database/models";
import Loading from "../../Loading";

export default function ProfileFollow({ followers, following }: { followers?: string[]; following?: string[] }) {
  const user = pocketbase.authStore.model as User;

  const isVertical = useMediaQuery(`(max-width: 62em)`);

  if (!followers && !following) return <Loading />;

  const people = followers ?? following ?? [];

  const [peopleUsers, setPeopleUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchPeople = async () => {
      const peopleUsers = await Promise.all(
        people.map(async (person) => {
          const user = await getUser(person);
          user.avatar = await getAvatar(user);
          return user;
        })
      );
      setPeopleUsers(peopleUsers as unknown[] as User[]);
    };

    fetchPeople();
  }, []);

  if (!peopleUsers) return <Loading />;

  return (
    <Box>
      <Title order={3}>{!!followers ? "Followers" : "Following"}</Title>
      <Divider my="md" />
      {peopleUsers.map((profile: User) => (
        <>
          <Grid justify="space-between" py="xs">
            <Grid.Col span={{ base: 12, xs: 9, lg: 10 }}>
              <Flex align="flex-start">
                <Avatar component={Link} to={`/user/${profile.username}`} src={profile.avatar} alt={profile.username} size="lg" />
                <Box ml="md">
                  <UserHoverCard profile={profile}>
                    <Group gap="0" w="max-content" maw={isVertical ? "calc(100vw - 125px)" : "calc(100vw - 600px"}>
                      <Text component={Link} to={`/user/${profile.username}`} size="lg" lineClamp={1} c="white" mr="xs" mb={2.5}>
                        {profile.name != "" ? profile.name : profile.username}
                      </Text>
                      <Text component={Link} to={`/user/${profile.username}`} size="xs" c="dimmed" lineClamp={1} mb={2.5}>
                        {profile.name && profile.username}
                      </Text>
                    </Group>
                  </UserHoverCard>
                  {profile.aboutMe && (
                    <Text size="xs" c="dimmed" lineClamp={1} mt={5}>
                      {profile.aboutMe}
                    </Text>
                  )}
                  {(profile.location || profile.organization) && (
                    <Group gap="lg">
                      {profile.location && (
                        <Group gap="5" mt="xs" align="center">
                          <IconMapPin size={20} style={{ color: "var(--mantine-color-dimmed)" }} />
                          <Text size="xs" c="dimmed" lineClamp={1}>
                            {profile.location}
                          </Text>
                        </Group>
                      )}
                      {profile.organization && (
                        <Group gap="5" mt="xs" align="center">
                          <IconBuilding size={20} style={{ color: "var(--mantine-color-dimmed)" }} />
                          <Text size="xs" c="dimmed" lineClamp={1}>
                            {profile.organization}
                          </Text>
                        </Group>
                      )}
                    </Group>
                  )}
                </Box>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ base: 12, xs: 3, lg: 2 }}>
              {user.id == profile.id ? null : user.followers.includes(profile.id) ? (
                <Button mt="md" variant="light" color="vsus-button" w="100%">
                  Unfollow
                </Button>
              ) : (
                <Button mt="md" variant="light" color="vsus-button" w="100%">
                  Follow
                </Button>
              )}
            </Grid.Col>
          </Grid>
          <Divider my="md" />
        </>
      ))}
    </Box>
  );
}
