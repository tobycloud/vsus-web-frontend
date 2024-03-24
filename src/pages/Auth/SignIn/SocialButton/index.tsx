import { Avatar, Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { userSignInOAuth2 } from "../../../../database";

export default function SocialButton({ name, setErrorDuringSignIn }: { name: string; setErrorDuringSignIn: (error: string) => void }) {
  const navigate = useNavigate();

  return (
    <Avatar
      size="lg"
      radius="xl"
      alt={name}
      style={{ cursor: "pointer" }}
      onClick={async () => {
        try {
          await userSignInOAuth2(name.toLowerCase());
          navigate("/");
        } catch (error) {
          setErrorDuringSignIn((error as Error).message);
        }
      }}
    >
      <Image src={`/images/icons/socials/${name.toLowerCase()}.svg`} alt={name} p="xs" h={54} w={54} style={{ pointerEvents: "none" }} />
    </Avatar>
  );
}
