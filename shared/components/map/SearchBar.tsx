import React, { useState, useCallback, useRef } from "react";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import { useTheme } from "@/context/theme";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
// Components
import { Button } from "@/components/ui";

const SearchBar = ({
  deviceLocation,
  funOnPress,
}: {
  deviceLocation: { latitude: number; longitude: number };
  funOnPress: (details: any) => void;
}) => {
  const ref = useRef<GooglePlacesAutocompleteRef>();
  const { colors, sizes } = useTheme().theme;
  const [value, setValue] = useState("");
  const [isFocused, setFocused] = useState(false);

  const handleFocus = useCallback(
    (focus: any) => {
      setFocused(focus);
    },
    [setFocused]
  );

  return (
    <>
      <GooglePlacesAutocomplete
        ref={ref as React.RefObject<GooglePlacesAutocompleteRef>}
        placeholder="Search here"
        disableScroll={false}
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          //console.log(data, details);
          funOnPress(details);
          setValue("");
          ref.current?.clear();
          ref.current?.blur();
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
          language: "en",
          components: "country:uk",
          location: `${deviceLocation.latitude}, ${deviceLocation.longitude}`,
        }}
        textInputProps={{
          minHeight: sizes.inputHeight,
          placeholderTextColor: colors.gray,
          returnKeyType: "search",
          paddingHorizontal: sizes.inputPadding,
          borderColor: isFocused ? colors.focus : colors.gray,
          borderWidth: sizes.inputBorder,
          borderRadius: 10,
          onFocus: () => handleFocus(true),
          onBlur: () => handleFocus(false),
          autoCapitalize: "words",
          // const [value, setValue] = useState('');
          onChangeText: (text: string) => {
            setValue(text);
          },
          value: value,
        }}
        renderRightButton={() => (
          <Button
            onPress={() => {
              ref.current?.clear();
              ref.current?.blur();
            }}
            flex={0}
            align="center"
            justify="center"
            height={"50%"}
            paddingLeft={12}
          >
            <Ionicons
              name="close-circle-outline"
              size={20}
              color={colors.text}
            />
          </Button>
        )}
        enablePoweredByContainer={true}
        styles={{
          container: {
            flex: 0,
            position: "absolute",
            width: "100%",
            zIndex: 1,
            marginTop: Constants.statusBarHeight,
            // paddingHorizontal: 7, marginTop: 7
          },
          textInputContainer: {
            flexDirection: "row",
            color: colors.text,
            paddingHorizontal: 15,
            paddingTop: 10,
            backgroundColor: colors.card,
          },
          textInput: {
            color: colors.text,
            fontFamily: "MontserratRegular",
            backgroundColor: colors.card,
            height: 44,
            paddingVertical: 5,
            paddingHorizontal: 20,
            fontSize: 17,
            flex: 1,
            borderRadius: sizes.inputRadius,
            marginBottom: 15,
          },
          poweredContainer: {
            justifyContent: "flex-end",
            alignItems: "center",
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopWidth: 0,
            backgroundColor: colors.card,
            borderColor: colors.text,
          },
          powered: {},
          listView: {
            marginTop: 0,
          },
          row: {
            backgroundColor: colors.card,
            flexDirection: "row",
          },
          separator: {
            height: 0.5,
            backgroundColor: colors.border,
          },
          description: {
            color: colors.text,
            fontFamily: "MontserratRegular",
            fontSize: 15,
            marginBottom: -5,
          },
          loader: {
            flexDirection: "row",
            justifyContent: "flex-end",
            height: 0,
          },
        }}
      />
    </>
  );
};

export default SearchBar;
