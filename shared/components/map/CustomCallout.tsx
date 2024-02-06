import React, {} from "react";
import { StyleSheet, View } from "react-native";

import {  useTheme } from "../../hooks";
import {
  Block,
  Text,
} from "../../components";
import { Ionicons } from "@expo/vector-icons";

const CustomCallout = ({title, info}) => {
  const { colors, sizes, gradients} = useTheme();

  const styles = StyleSheet.create({
    bubble: {
      flexDirection: 'column',
      alignSelf: 'flex-end',
      borderRadius: sizes.cardRadius,
      padding: 15,
      width: 150, 
      height: 120,
      backgroundColor: colors.card
    },
    // Arrow below the bubble
    arrow: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderTopColor: colors.card,
      borderWidth: 16,
      alignSelf: 'center',
      marginTop: -32,
    },
    arrowBorder: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderTopColor: '#141727',
      borderWidth: 16,
      alignSelf: 'center',
      marginTop: -0.5,
      // marginBottom: -15
    },
    // Character name
    name: {
      fontSize: 16,
      marginBottom: 5,

    },
    // Character image
    // image: {
    //   width: "100%",
    //   height: 80,
    // },
    view: {
// backgroundColor: '#bada55',
    paddingTop: 70
    },
    chipsItem: {
marginLeft: 4
    },
  });

  return (
    <>
      <View style={styles.view}>
        <Block style={styles.bubble}  
        // gradient={isDark? gradients.dark: gradients.white} start={{x:0.5, y:0}} end={{x:0.5, y:1}}
        >

                    <Block
              flex={0}
              padding={0}
              justify="center"
              // position="absolute"
              // top={-3}
              // right={-4}
              width={24}
              height={24}
              radius={24 / 2}
              gradient={gradients?.info}>
                          <Ionicons
          name="ios-restaurant"
          color={colors.white}
          style={styles.chipsItem}
          size={15}
        />

              {/* <Text white center
               size={25} lineHeight={10} paddingTop={10} paddingLeft={1}>
                +
              </Text> */}
            </Block>  
          <Text p style={styles.name} numberOfLines={2}>{title}</Text>
          <Text numberOfLines={1}>{info}</Text>
        </Block>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
    </>
  );
};

export default CustomCallout;




