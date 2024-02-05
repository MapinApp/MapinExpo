import { useTheme } from "@/context/theme";
import { Ionicons } from "@expo/vector-icons";
import { Block, Button, Switch, Text } from "@/components/ui";
import { useAuth } from "@/context/auth";
import ProfileSettings from "@/components/profile/ProfileSettings";
import { Link } from "expo-router";

// Profile Settings
const Profile = () => {
  const { theme } = useTheme();
  const { sizes, colors } = theme;

  return (
    <Block marginBottom={sizes.xs} list>
      <Text p semibold marginBottom={sizes.s}>
        Profile
      </Text>
      <Block>
        <ProfileSettings />
        <Block
          row
          flex={0}
          align="center"
          justify="space-between"
          paddingTop={sizes.m}
        >
          <Text>Update Bio</Text>

          <Link href="/(app)/profile/settings/update-bio">
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color={colors.text}
            />
          </Link>
        </Block>
      </Block>
    </Block>
  );
};

// Preferences
const Preferences = () => {
  const { theme, isDark, handleIsDark } = useTheme();
  const { sizes } = theme;

  return (
    <Block marginBottom={sizes.xs} list>
      <Text p semibold marginBottom={sizes.s}>
        Preferences
      </Text>
      <Block>
        <Block row flex={0} align="center" justify="space-between">
          <Text>Dark Mode</Text>
          <Switch checked={isDark} onPress={() => handleIsDark()} />
        </Block>
      </Block>
    </Block>
  );
};

// Account Management
const Account = () => {
  const { sizes, colors } = useTheme().theme;
  const { signOut } = useAuth();

  return (
    <Block marginBottom={sizes.xs} list>
      <Text p semibold marginBottom={sizes.s}>
        Account Management
      </Text>
      <Block>
        <Block row flex={0} align="center" justify="space-between">
          <Text>Log Out</Text>
          <Button
            onPress={() => {
              signOut();
            }}
            chit
          >
            <Ionicons name="log-out-outline" size={18} color={colors.text} />
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

export default function Components() {
  const { theme } = useTheme();
  const { colors, sizes } = theme;

  return (
    <Block color={colors.list}>
      <Block safe>
        <Block
          scroll
          showsVerticalScrollIndicator={false}
          paddingVertical={sizes.xs}
        >
          <Block>
            <Profile />
            <Preferences />
            <Account />
          </Block>
        </Block>
      </Block>
    </Block>
  );
}
