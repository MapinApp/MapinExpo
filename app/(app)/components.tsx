import React, { useState } from "react";
import { FlatList, TouchableOpacity, Pressable } from "react-native";
import { useTheme } from "@/context/theme";
import { Ionicons } from "@expo/vector-icons";
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
    <Block margin={sizes.xs} card>
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
    <Block margin={sizes.xs} card>
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
        <Text center marginVertical={3} marginBottom={sizes.s}>
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
    <Block margin={sizes.xs} card>
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
    <Block margin={sizes.xs} card>
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
    <Block margin={sizes.xs} card>
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

const Carousel = () => {
  const { gradients, sizes } = useTheme().theme;
  const [optionId, setOptionId] = useState(0);

  const article = [
    {
      id: 1,
      title: "Single room in center",
      description:
        "As Uber works through a huge amount of internal management turmoil, the company is also consolidating.",
      type: "room",
      guests: 1,
      sleeping: { total: 1, type: "sofa" },
      price: 89,

      image:
        "https://images.unsplash.com/photo-1543489822-c49534f3271f?fit=crop&w=450&q=80",
    },
    {
      id: 2,
      title: "Cosy apartment",
      description:
        "Different people have different taste, and various types of music have many ways of leaving an impact on someone.",
      type: "apartment",
      guests: 3,
      sleeping: { total: 2, type: "bed" },
      price: 200,

      image:
        "https://images.unsplash.com/photo-1603034203013-d532350372c6?fit=crop&w=450&q=80",
    },
    {
      id: 3,
      title: "Single room in center",
      description:
        "As Uber works through a huge amount of internal management turmoil, the company is also consolidating.",
      type: "room",
      guests: 1,
      sleeping: { total: 1, type: "sofa" },
      price: 89,

      image:
        "https://images.unsplash.com/photo-1543489822-c49534f3271f?fit=crop&w=450&q=80",
    },
  ];

  const CARD_WIDTH = sizes.width - sizes.s;

  return (
    <Block
      scroll
      horizontal
      pagingEnabled
      decelerationRate="fast"
      snapToAlignment="center"
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      onScroll={({ nativeEvent }) => {
        const optionIndex = Math.round(
          Number(nativeEvent?.contentOffset?.x) / sizes.width
        );
        const option = article.find((_, index) => index === optionIndex);
        if (option) setOptionId(option?.id);
      }}
    >
      {article.map((option, index) => {
        return (
          <Block
            card
            width={CARD_WIDTH - sizes.sm}
            marginLeft={index === 0 ? sizes.sm : 0}
            marginRight={sizes.sm}
            key={`article-${option.id}-option`}
          >
            <Image
              shadow
              height={261}
              width={CARD_WIDTH - sizes.md}
              source={{ uri: option?.image }}
            />
            <Block marginTop={sizes.sm} paddingHorizontal={sizes.s}>
              <Block row flex={0} marginBottom={sizes.s}>
                <Text p transform="capitalize">
                  {option?.type}
                  {" • "}
                  {option?.guests}
                  {" • "}
                  {option?.sleeping?.total} {option?.sleeping?.type}
                </Text>
              </Block>
              <Text h4 marginBottom={sizes.s}>
                {option?.title}
              </Text>
              <Text p lineHeight={26}>
                {option?.description}
              </Text>
            </Block>
          </Block>
        );
      })}
    </Block>
  );
};

const Chits = () => {
  const { colors, gradients, sizes } = useTheme().theme;
  let dummyChits = [
    "Shoreditch",
    "North London",
    "London Bridge",
    "Tooting",
    "Waterloo",
    "Paddington",
  ];
  const [currentChit, setChit] = useState(dummyChits[0]);

  return (
    <Block color={colors.card} row flex={0} paddingVertical={sizes.padding}>
      <Block
        scroll
        horizontal
        renderToHardwareTextureAndroid
        showsHorizontalScrollIndicator={false}
        contentOffset={{ x: -sizes.padding, y: 0 }}
      >
        {dummyChits?.map((category, index) => {
          const isSelected = category === currentChit;
          return (
            <Button
              chit
              radius={sizes.m}
              marginHorizontal={sizes.s}
              key={`category-${category}-${index}`}
              onPress={() => setChit(category)}
              gradient={gradients?.[isSelected ? "primary" : "light"]}
            >
              <Text
                p
                size={sizes.s}
                bold={isSelected}
                white={isSelected}
                black={!isSelected}
                transform="capitalize"
              >
                {category}
              </Text>
            </Button>
          );
        })}
      </Block>
    </Block>
  );
};

const Album = () => {
  const { assets, sizes } = useTheme().theme;

  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE =
    (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN =
    (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;

  return (
    <Block margin={sizes.xs} card>
      <Block row align="center" justify="space-between">
        <Text h5>Album</Text>
        <Button>
          <Text p primary>
            View all
          </Text>
        </Button>
      </Block>
      <Block row justify="space-between" wrap="wrap">
        <Image
          contentFit="cover"
          source={assets?.og}
          marginBottom={IMAGE_MARGIN}
          height={IMAGE_SIZE}
          width={IMAGE_SIZE}
        />
        <Image
          contentFit="cover"
          source={assets?.og}
          marginBottom={IMAGE_MARGIN}
          height={IMAGE_SIZE}
          width={IMAGE_SIZE}
        />
        <Image
          contentFit="cover"
          source={assets?.og}
          marginBottom={IMAGE_MARGIN}
          height={IMAGE_SIZE}
          width={IMAGE_SIZE}
        />
        <Image
          contentFit="cover"
          source={assets?.og}
          marginBottom={IMAGE_MARGIN}
          height={IMAGE_SIZE}
          width={IMAGE_SIZE}
        />
        <Image
          contentFit="cover"
          source={assets?.og}
          marginBottom={IMAGE_MARGIN}
          height={IMAGE_SIZE}
          width={IMAGE_SIZE}
        />
        <Image
          contentFit="cover"
          source={assets?.og}
          marginBottom={IMAGE_MARGIN}
          height={IMAGE_SIZE}
          width={IMAGE_SIZE}
        />
      </Block>
    </Block>
  );
};

// cards example
const Cards = () => {
  const { assets, colors, gradients, sizes } = useTheme().theme;

  return (
    <Block margin={sizes.xs}>
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
      {/* inline cards */}
      <Block row marginTop={sizes.sm}>
        <Block card marginRight={sizes.sm}>
          <Image contentFit="cover" source={assets?.og} height={100} />
          <Block padding={sizes.s} justify="space-between">
            <Text p marginBottom={sizes.s}>
              New ways to meet your business goals.
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
        <Block card>
          <Image contentFit="cover" source={assets?.og} height={100} />
          <Block padding={sizes.s} justify="space-between">
            <Text p marginBottom={sizes.s}>
              The highest status people.
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
      {/* full image width card */}
      <Block card marginTop={sizes.sm}>
        <Image contentFit="cover" source={assets?.og} height={200} />
        <Text
          h5
          bold
          uppercase
          gradient={gradients.primary}
          marginTop={sizes.sm}
        >
          Trending
        </Text>
        <Text
          p
          marginTop={sizes.s}
          marginLeft={sizes.xs}
          marginBottom={sizes.sm}
        >
          Some kind of update to put onto the timeline.
        </Text>
        {/* user details */}
        <Block row marginLeft={sizes.xs} marginBottom={sizes.xs}>
          <Image
            source={assets.og}
            style={{ width: sizes.xl, height: sizes.xl, borderRadius: sizes.s }}
          />
          <Block marginLeft={sizes.s}>
            <Text p semibold>
              Mathew Glock
            </Text>
            <Text p gray>
              Posted on 28 February
            </Text>
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
    <Block margin={sizes.xs} card>
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
            paddingVertical: sizes.xs,
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
            <Chits />
            <Album />
            <Carousel />
          </Block>
        </Block>
      </Block>
    </Block>
  );
}
