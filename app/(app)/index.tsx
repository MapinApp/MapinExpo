import React, { useLayoutEffect, useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { useTheme } from "@/context/theme";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "react-native-elements";
import {
  Block,
  Button,
  Input,
  Image,
  Switch,
  Modal,
  Text,
} from "@/components/ui";

// buttons example
const Buttons = () => {
  const [showModal, setModal] = useState(false);
  const [quantity, setQuantity] = useState("01");
  const { theme, isDark, handleIsDark } = useTheme();
  const { assets, colors, gradients, sizes } = theme;

  return (
    <Block margin={sizes.sm} padding={sizes.padding} outlined radius={6}>
      <Text p semibold marginBottom={sizes.s}>
        Buttons
      </Text>
      <Block>
        <Button flex={1} gradient={gradients.primary} marginBottom={sizes.base}>
          <Text white bold uppercase>
            Primary
          </Text>
        </Button>
        <Button
          flex={1}
          gradient={gradients.secondary}
          marginBottom={sizes.base}
        >
          <Text white bold uppercase>
            Secondary
          </Text>
        </Button>
        <Button flex={1} gradient={gradients.info} marginBottom={sizes.base}>
          <Text white bold uppercase>
            info
          </Text>
        </Button>
        <Button flex={1} gradient={gradients.success} marginBottom={sizes.base}>
          <Text white bold uppercase>
            success
          </Text>
        </Button>
        <Button flex={1} gradient={gradients.warning} marginBottom={sizes.base}>
          <Text white bold uppercase>
            warning
          </Text>
        </Button>
        <Button flex={1} gradient={gradients.danger} marginBottom={sizes.base}>
          <Text white bold uppercase>
            danger
          </Text>
        </Button>
        <Button flex={1} gradient={gradients.light} marginBottom={sizes.base}>
          <Text bold uppercase>
            light
          </Text>
        </Button>
        <Button flex={1} gradient={gradients.dark} marginBottom={sizes.base}>
          <Text white bold uppercase>
            dark
          </Text>
        </Button>
        <Block row justify="space-between" marginBottom={sizes.base}>
          <Button flex={1} row primary onPress={() => setModal(true)}>
            <Block
              row
              align="center"
              justify="space-between"
              paddingHorizontal={sizes.sm}
            >
              <Text white bold uppercase marginRight={sizes.sm}>
                {quantity}
              </Text>
              <Ionicons name="chevron-down-outline" size={16} color="white" />
            </Block>
          </Button>
          <Button flex={1} primary marginHorizontal={sizes.s}>
            <Text white bold uppercase marginHorizontal={sizes.s}>
              Delete
            </Text>
          </Button>
          <Button primary>
            <Text white bold uppercase marginHorizontal={sizes.sm}>
              Save for later
            </Text>
          </Button>
        </Block>
      </Block>
      <Modal visible={showModal} onRequestClose={() => setModal(false)}>
        <FlatList
          keyExtractor={(index) => `${index}`}
          data={["01", "02", "03", "04", "05"]}
          renderItem={({ item }) => (
            <Button
              marginBottom={sizes.sm}
              onPress={() => {
                setQuantity(item);
                setModal(false);
              }}
            >
              <Text p white semibold uppercase>
                {item}
              </Text>
            </Button>
          )}
        />
      </Modal>
    </Block>
  );
};

// // texts example
const Typography = () => {
  const { sizes, gradients } = useTheme().theme;

  return (
    <Block margin={sizes.sm} padding={sizes.padding} outlined radius={6}>
      <Text p semibold marginBottom={sizes.s}>
        Typography
      </Text>
      <Block>
        <Text h1 uppercase center marginVertical={3}>
          Head 1
        </Text>
        <Text center marginVertical={3} h2 uppercase>
          Head 2
        </Text>
        <Text center marginVertical={3} h3>
          Head 3
        </Text>
        <Text center marginVertical={3} h4>
          Head 4
        </Text>
        <Text center marginVertical={3} h5>
          Head 5
        </Text>
        <Text center marginVertical={3} p>
          Paragraph
        </Text>
        <Text center marginVertical={3} marginBottom={sizes.xs}>
          Text
        </Text>
        <Text h2 uppercase primary>
          Primary
        </Text>
        <Text h2 uppercase secondary>
          Secondary
        </Text>
        <Text h2 uppercase tertiary>
          Tertiary
        </Text>
        <Text h2 uppercase black>
          Black
        </Text>
        <Text h2 uppercase white>
          white
        </Text>
        <Text h2 uppercase gray>
          gray
        </Text>
        <Text h2 uppercase danger>
          danger
        </Text>
        <Text h2 uppercase warning>
          warning
        </Text>
        <Text h2 uppercase success>
          success
        </Text>
        <Text h2 uppercase gradient={gradients.primary}>
          G Primary
        </Text>

        <Text h2 uppercase gradient={gradients.secondary}>
          G Secondary
        </Text>

        <Text h2 uppercase gradient={gradients.success}>
          G Success
        </Text>

        <Text h2 uppercase gradient={gradients.warning}>
          G Warning
        </Text>

        <Text h2 uppercase gradient={gradients.danger}>
          G Danger
        </Text>

        <Text h2 uppercase gradient={gradients.black}>
          G Black
        </Text>

        <Text h2 uppercase gradient={gradients.white}>
          G White
        </Text>

        <Text h2 uppercase gradient={gradients.dark}>
          G Dark
        </Text>

        <Text h2 uppercase gradient={gradients.light}>
          G Light
        </Text>

        <Text h2 uppercase gradient={gradients.info}>
          G Info
        </Text>
      </Block>
    </Block>
  );
};

// inputs example
const Inputs = () => {
  const { colors, sizes } = useTheme().theme;

  return (
    <Block margin={sizes.sm} padding={sizes.padding} outlined radius={6}>
      <Text p semibold marginBottom={sizes.s}>
        Inputs
      </Text>
      <Block>
        <Input placeholder="Regular" marginBottom={sizes.sm} />
        <Input placeholder="Search" marginBottom={sizes.sm} />
        <Input
          search
          label="Search"
          marginBottom={sizes.sm}
          placeholder="Search with label"
        />
        <Input success placeholder="Success" marginBottom={sizes.sm} />
        <Input danger placeholder="Error" marginBottom={sizes.sm} />
        <Input disabled placeholder="Disabled" marginBottom={sizes.sm} />
      </Block>
    </Block>
  );
};

// switch example
const Switches = () => {
  const { colors, sizes } = useTheme().theme;
  const [switch1, setSwitch1] = useState(true);
  const [switch2, setSwitch2] = useState(false);

  return (
    <Block margin={sizes.sm} padding={sizes.padding} outlined radius={6}>
      <Text p semibold marginBottom={sizes.s}>
        Switches
      </Text>
      <Block>
        <Block row flex={0} align="center" justify="space-between">
          <Text>Switch is {switch1 ? "ON" : "OFF"}</Text>
          <Switch
            checked={switch1}
            onPress={(checked) => setSwitch1(checked)}
          />
        </Block>
        <Block
          row
          flex={0}
          align="center"
          justify="space-between"
          marginTop={sizes.s}
        >
          <Text>Switch is {switch2 ? "ON" : "OFF"}</Text>
          <Switch
            checked={switch2}
            onPress={(checked) => setSwitch2(checked)}
          />
        </Block>
      </Block>
    </Block>
  );
};

// social example
const Social = () => {
  const { sizes } = useTheme().theme;

  return (
    <Block margin={sizes.sm} padding={sizes.padding} outlined radius={6}>
      <Text p semibold marginBottom={sizes.s}>
        Social
      </Text>
      <Block row justify="space-evenly">
        <Button social="google" />
        <Button social="apple" />
      </Block>
    </Block>
  );
};

// cards example
const Cards = () => {
  const { assets, colors, gradients, sizes } = useTheme().theme;

  return (
    <Block marginTop={sizes.m} paddingHorizontal={sizes.padding}>
      <Text p semibold marginBottom={sizes.s}>
        Cards
      </Text>
      {/* single card */}
      <Block>
        <Block card row>
          <Image source={assets.og} height={"100%"} width={"33%"} />
          <Block padding={sizes.s} justify="space-between">
            <Text p marginBottom={15}>
              Adventures - Multi day trips with meals and stays.
            </Text>
            <TouchableOpacity>
              <Block row align="center">
                <Text p semibold marginRight={sizes.s} color={colors.link}>
                  Read Article
                </Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={16}
                  color={colors.text}
                />
              </Block>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

// texts example
const Header = () => {
  const { theme, isDark, handleIsDark } = useTheme();
  const { sizes, gradients } = theme;

  return (
    <Block margin={sizes.sm} padding={sizes.padding} outlined radius={6}>
      <Text h1 uppercase gradient={gradients.primary}>
        Mapin
      </Text>

      <Block>
        <Pressable
          onPress={() => {
            handleIsDark();
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "rgb(210, 230, 255)" : "transparent",
            },
          ]}
        >
          <Text p>Toggle Dark: {JSON.stringify(isDark)}</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            console.log("Hello");
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "rgb(210, 230, 255)" : "transparent",
            },
          ]}
        >
          <Text p>Call Log()</Text>
        </Pressable>
      </Block>
    </Block>
  );
};

export default function Components() {
  const { theme } = useTheme();
  const { colors, sizes } = theme;

  return (
    <Block background>
      <Block safe>
        <Block
          scroll
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: sizes.l,
          }}
        >
          <Block>
            <Header />
            <Typography />
            <Buttons />
            <Inputs />
            <Switches />
            <Social />
            <Cards />
          </Block>
        </Block>
      </Block>
    </Block>
  );
}
