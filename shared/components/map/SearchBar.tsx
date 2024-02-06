import React, { useState, useCallback } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useTheme } from "@/context/theme";

const searchBar = ({
  deviceLocation,
  funOnPress,
}: {
  deviceLocation: { latitude: number; longitude: number };
  funOnPress: (details: any) => void;
}) => {
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
        placeholder="Search here"
        disableScroll={false}
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(details) => {
          // 'details' is provided when fetchDetails = true
          //console.log(data, details);
          funOnPress(details);
          setValue("");
        }}
        query={{
          key: "AIzaSyDOSkytRpgdQE4rfh0p0epWTLPIsC79Ed8",
          language: "en",
          // components: "country:uk",
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
        // renderLeftButton={()  => <Text>Custom text after the input</Text>}
        // renderRightButton={() => <Text>Custom text after the input</Text>}

        enablePoweredByContainer={true}
        // listEmptyComponent
        // onFail
        styles={{
          container: {
            flex: 0,
            position: "absolute",
            width: "100%",
            zIndex: 1,
            // paddingHorizontal: 7, marginTop: 7
          },
          textInputContainer: {
            flexDirection: "row",
            color: colors.text,
            paddingHorizontal: 15,
            backgroundColor: colors.card,
          },
          textInput: {
            color: colors.text,
            fontFamily: "JosefinSansLight",
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
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
            borderTopWidth: 0,
            backgroundColor: colors.card,
            borderColor: colors.text,
          },
          powered: {},
          listView: {
            marginHorizontal: 10,
            marginTop: 10,
          },
          row: {
            backgroundColor: colors.card,
            flexDirection: "row",
          },
          separator: {
            height: 1,
            backgroundColor: colors.text,
          },
          description: {
            color: colors.text,
            fontFamily: "JosefinSansLight",
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

export default searchBar;
