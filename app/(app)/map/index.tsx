import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Alert } from "react-native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
// Components
import { Block, Button, Text, Image } from "@/components/ui";
import { useTheme } from "@/context/theme";
// Map
import SearchBar from "@/components/map/SearchBar";
import Constants from "expo-constants";
import darkMapStyle from "@/assets/map/darkMapStyle.json";
import lightMapStyle from "@/assets/map/lightMapStyle.json";
// Util
const util = require("util");
// console.log(util.inspect(myObject, false, null, true /* enable colors */))

interface DeviceLocation {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Place {
  name: string;
  address: string;
  img_url: string;
  latitude?: number;
  longitude?: number;
}

export default function App() {
  const mapRef = React.createRef<MapView>();
  const { isDark, theme } = useTheme();
  const { colors, sizes } = theme;

  // Use this for the Location of Search Bar and Map
  const [deviceLocation, setDeviceLocation] = useState<DeviceLocation>({
    latitude: 51.510067,
    longitude: -0.133869,
    latitudeDelta: 0.022,
    longitudeDelta: 0.021,
  });

  const [selectedPlace, setSelectedPlace] = useState<Place>({
    name: "",
    address: "",
    img_url: "",
  });

  const goToLocation = async (lat: number, lng: number) => {
    mapRef?.current?.animateCamera({
      center: { latitude: lat, longitude: lng },
    });
  };

  // ============================================================================
  // =========================== On Search Functions ============================
  // ============================================================================

  const generatePhotoDetails = ({
    html_attributions,
    photo_reference,
    width,
  }: {
    html_attributions: string[];
    photo_reference: string;
    width: number;
  }) => {
    const defaultName = "Unknown";
    const defaultHref = "#";

    let name = defaultName;
    let href = defaultHref;

    if (html_attributions && html_attributions.length > 0) {
      const hrefRegex = /href="([^"]*)"/;
      const nameRegex = />([^<]+)</;

      const hrefMatches = hrefRegex.exec(html_attributions[0]);
      const nameMatches = nameRegex.exec(html_attributions[0]);

      href = hrefMatches ? hrefMatches[1] : defaultHref;
      name = nameMatches ? nameMatches[1] : defaultName;
    }

    const placesPhotoUrl = photo_reference
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${width}&photoreference=${photo_reference}&key=${process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY}`
      : null;

    return {
      photo_attribution_href: href,
      photo_attribution_name: name,
      places_photo_url: placesPhotoUrl,
    };
  };

  const doesPlaceExist = async (places_id: string) => {
    // If referral exists, return true, else return false
    try {
      const { data, error } = await supabase
        .from("places")
        .select("*")
        .eq("places_id", places_id);
      if (error) {
        alert(error.message);
        // throw new Error(error.message);
      }
      if (data) {
        if (data.length > 0) {
          return data[0];
        }
        return false;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking if place exists:", error);
      return false; // In case of error, conservatively return false to prevent false negatives
    }
  };

  const onResultClick = async (details: any) => {
    // console.log(util.inspect(details, false, null, true /* enable colors */));
    // We want to check of this places_id exists in the database
    let data = await doesPlaceExist(details.place_id);
    if (data) {
      console.log("Place already exists in database");
      console.log(data);

      if (
        data.lat !== null &&
        data.lng !== null &&
        data.places_photo_url !== null &&
        data.name !== null &&
        data.formatted_address !== null
      ) {
        // Go to the location
        goToLocation(data.lat, data.lng);
        setSelectedPlace({
          name: data.name,
          address: data.formatted_address,
          img_url: data.places_photo_url,
          latitude: data.lat,
          longitude: data.lng,
        });
      }

      console.log(util.inspect(data, false, null, true /* enable colors */));
      // If yes, retrieve the data and display it
    } else {
      // If no, then we want to store the data in the database in supabase and then display it

      let photoDetails =
        details.photos?.length > 0
          ? generatePhotoDetails(details.photos[0])
          : ({} as any);

      let data = {
        places_id: details?.place_id || null,
        name: details?.name || null,
        formatted_address: details?.formatted_address || null,
        lat: details?.geometry?.location?.lat || null,
        lng: details?.geometry?.location?.lng || null,
        types: details?.types || [],
        maps_url: details?.url || null,
        website: details?.website || null,
        price_level: details?.price_level || null,
        opening_hours: details?.opening_hours?.periods || null,
        phone_number: details?.formatted_phone_number || null,
        editorial_summary: details?.editorial_summary?.overview || null,
        business_status: details?.business_status || null,
        viewport_lat_delta:
          details?.geometry?.viewport?.northeast?.lat -
            details?.geometry?.viewport?.southwest?.lat || 0,
        viewport_lng_delta:
          details?.geometry?.viewport?.northeast?.lng -
            details?.geometry?.viewport?.southwest?.lng || 0,
        ...photoDetails,
      };
      try {
        // Insert to places
        const { error } = await supabase.from("places").insert([data]);
        if (error) throw new Error(error.message);
        // Display newly inserted data
      } catch (error) {
        console.error("Error inserting new place:", error);
      }

      // Go to the location
      goToLocation(data.lat, data.lng);
      // set the selected place
      setSelectedPlace({
        name: data.name,
        address: data.formatted_address,
        img_url: photoDetails?.places_photo_url,
        latitude: data.lat,
        longitude: data.lng,
      });
      console.log(util.inspect(data, false, null, true /* enable colors */));
    }
  };

  // ============================================================================
  // =========================== Lists ==========================================
  // ============================================================================

  let dummyData = [
    {
      list_id: 1,
      title: "Restauraunts",
      list_cover_photo_url: "https://source.unsplash.com/1600x900/",
      description: "A bunch of McDonalds I want to Visit",
      created_date: "2021-06-06T00:00:00+00:00",
      user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
      pin: [
        {
          pin_id: 8,
          pin_photo_url:
            "Aap_uECngJhHAPze6NYtW93NTwQdlLr6llSSKmOyck6vsKrr3envcv16RCC7Cfb-m9hL9IMnKqjdKP3HH-B4oAlCS_95HJlGdSmx1IIW53_DJf476iHT4KZkWyyOkAojK_mKKIHMeHgInNGFIlKqC0t61R5Kj-m2R1CMoXArCazQOBSjxy0D",
          pin_name: "Kiln",
          latitude: 51.51140069999999,
          longitude: -0.136059,
          address: "58 Brewer St, London W1F 9TL, UK",
          postcode: "W1F 9TL",
          rating: "4.4",
          type: "restaurant",
          notes: "Software Engineer",
          label_id: [2, 2, 7],
          created_date: "2021-07-27T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: ["b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f"],
          visited_time: null,
        },
        {
          pin_id: 11,
          pin_photo_url:
            "Aap_uEDOXyGyz29VSiiiz4jC7qDFMHstr8IoQJdUAoOq05CSRLwZo5JCWeNdmoSi33Cz0w9DVBP4cTXnKJ1rC1KpEHO9KnF5R18n5HqPltSXpKldc5jhr7tk2APbeBx1ioKh92Npe6_I0MIIEb-qTlAtO2OyNSZ2mKL2dbfoof9rhZRzylYS",
          pin_name: "Hoppers King's Cross",
          latitude: 51.53435,
          longitude: -0.1254808,
          address: "Unit 3, 4 Pancras Sq, London N1C 4AG, UK",
          postcode: "N1C 4AG",
          rating: "4.3",
          type: "restaurant",
          notes: "IT Manager",
          label_id: [6, 5, 5],
          created_date: "2021-08-20T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: ["b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f"],
          visited_time: null,
        },
        {
          pin_id: 21,
          pin_photo_url:
            "Aap_uED7ItSGnOv25DslIVB6W1C4KCntTuTF32MYrCKdpsZQsLKiI3B9tGdBUSu_JoQXZcTMqw9UOhiSuG_HWxRj9eCJr-zVo5L83uBPt35JQEtn394As8HGa6ldS7E265FrSKBir90-Z9DdBJ5O9p6E4UrtrkXcqo9HWRfLVQDdpSvJ3EH9",
          pin_name: "Patara Fine Thai Cuisine Soho",
          latitude: 51.5141736,
          longitude: -0.1307411,
          address: "15 Greek St, London W1D 4DP, UK",
          postcode: "W1D 4DP",
          rating: "4.3",
          type: "restaurant",
          notes: "Data Analyst",
          label_id: [14, 17, 16],
          created_date: "2021-06-04T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: [],
          visited_time: null,
        },
        {
          pin_id: 25,
          pin_photo_url:
            "Aap_uEDOJ4QToGrkt90065N-osJDvavRQV3l_S7JclgoRNVzlJiISil6XcMIpf6NIy51OG4wV0_26K494Yrdg6VhsmEzX0r8Acsw4f15ctlfz1lYPhsfEYahiztfkJSgqgKUAorLTLzs-Zrw2THtyO0M51kzEwFNhOt__1r72lFdiXrE6G-l",
          pin_name: "Busaba",
          latitude: 51.51378200000001,
          longitude: -0.134049,
          address: "106-110 Wardour St, London W1F 0TR, UK",
          postcode: "W1F 0TR",
          rating: "4",
          type: "restaurant",
          notes: "Frontend Engineer",
          label_id: [13, 10, 9],
          created_date: "2021-02-19T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: [],
          visited_time: null,
        },
        {
          pin_id: 2,
          pin_photo_url:
            "Aap_uEAtm0FUTxPdvnSVhdHGccVY5ZJiCDXPL9H9t8PjfSfgxIg_PQ23KGZeV975wpBR7VlZdCkePb4t2geYHFn-IXDRlDszgAWfcYLMXo3dd_Y8_JCSg89nxowSgHyit8VeLzWob6IttBj7nkT5nboHAscsyXYeLBc1FjEofwN11_NyGAgV",
          pin_name: "The Ivy Asia St Paul's",
          latitude: 51.5137197,
          longitude: -0.0960783,
          address: "20 New Change, London EC4M 9AG, UK",
          postcode: "EC4M 9AG",
          rating: "4.4",
          type: "restaurant",
          notes: "CEO",
          label_id: [8, 8, 1],
          created_date: "2021-12-11T00:00:00+00:00",
          visited: true,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: ["b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f"],
          visited_time: "2022-04-08T15:53:59.03+00:00",
        },
      ],
    },
    {
      list_id: 2,
      title: "Asian Restaurant",
      list_cover_photo_url: "https://source.unsplash.com/1600x900/",
      description: "CEO",
      created_date: "2021-06-07T00:00:00+00:00",
      user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
      pin: [
        {
          pin_id: 6,
          pin_photo_url: null,
          pin_name: "Brownsville, Texas, United States",
          latitude: 32.089715,
          longitude: 34.779953,
          notes: "Customer Engineer",
          label_id: [14, 11, 7],
          created_date: "2021-04-17T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: ["b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f"],
          visited_time: null,
        },
        {
          pin_id: 8,
          pin_photo_url: null,
          pin_name: "St. Paul, Minnesota, United States",
          latitude: 32.079825,
          longitude: 34.77445,
          notes: "Software Engineer",
          label_id: [2, 2, 7],
          created_date: "2021-07-27T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: ["b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f"],
          visited_time: null,
        },
        {
          pin_id: 13,
          pin_photo_url: null,
          pin_name: "Santa Clara, California, United States",
          latitude: 32.06645,
          longitude: 34.786325,
          notes: "Outbound BDR",
          label_id: [11, 18, 8],
          created_date: "2021-10-12T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: ["b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f"],
          visited_time: null,
        },
        {
          pin_id: 23,
          pin_photo_url: null,
          pin_name: "Valley Stream, New York, United States",
          latitude: 32.07606,
          longitude: 34.80074,
          notes: "Database Manager",
          label_id: [7, 2, 19],
          created_date: "2021-08-05T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: [],
          visited_time: null,
        },
        {
          pin_id: 24,
          pin_photo_url: null,
          pin_name: "Mesa, Arizona, United States",
          latitude: 32.09861,
          longitude: 34.80073,
          notes: "CTO",
          label_id: [9, 2, 4],
          created_date: "2021-09-27T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: [],
          visited_time: null,
        },
      ],
    },
    {
      list_id: 3,
      title: "Bar",
      list_cover_photo_url: "https://source.unsplash.com/1600x900/",
      description: "Outbound SDR",
      created_date: "2021-06-08T00:00:00+00:00",
      user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
      pin: [
        {
          pin_id: 4,
          pin_photo_url: null,
          pin_name: "Urbana, Illinois, United States",
          latitude: 32.11226,
          longitude: 34.83799,
          notes: "IT Manager",
          label_id: [10, 18, 12],
          created_date: "2021-09-18T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: ["b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f"],
          visited_time: null,
        },
        {
          pin_id: 12,
          pin_photo_url: null,
          pin_name: "Baytown, Texas, United States",
          latitude: 32.102224,
          longitude: 34.785543,
          notes: "Sales Team Lead",
          label_id: [16, 16, 16],
          created_date: "2021-07-17T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: ["b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f"],
          visited_time: null,
        },
        {
          pin_id: 13,
          pin_photo_url: null,
          pin_name: "Santa Clara, California, United States",
          latitude: 32.06645,
          longitude: 34.786325,
          notes: "Outbound BDR",
          label_id: [11, 18, 8],
          created_date: "2021-10-12T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: ["b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f"],
          visited_time: null,
        },
        {
          pin_id: 22,
          pin_photo_url: null,
          pin_name: "Springdale, Arkansas, United States",
          latitude: 32.052487,
          longitude: 34.756501,
          notes: "DevOps Engineer",
          label_id: [16, 3, 19],
          created_date: "2021-11-02T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: [],
          visited_time: null,
        },
        {
          pin_id: 3,
          pin_photo_url: null,
          pin_name: "Texas City, Texas, United States",
          latitude: 32.11876,
          longitude: 34.82229,
          notes:
            "a note on this pin \n Fri Apr 08 2022 17:23:22 GMT+0100 (British Summer Time) \n a note on this pin \n Fri Apr 08 2022 \n a note on this pin \n Fri Apr 08 2022 \n a note on this pin \n Fri Apr 08 2022 \n a note on this pin \n Sat Apr 09 2022 \n a note on this pin",
          label_id: [16, 16, 3],
          created_date: "2021-06-20T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: ["b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f"],
          visited_time: "2022-04-09T13:39:20.889+00:00",
        },
      ],
    },
    {
      list_id: 4,
      title: "Baseball Stadium",
      list_cover_photo_url: "https://source.unsplash.com/1600x900/",
      description: "IT Manager",
      created_date: "2021-06-09T00:00:00+00:00",
      user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
      pin: [
        {
          pin_id: 6,
          pin_photo_url: null,
          pin_name: "Brownsville, Texas, United States",
          latitude: 32.089715,
          longitude: 34.779953,
          notes: "Customer Engineer",
          label_id: [14, 11, 7],
          created_date: "2021-04-17T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: ["b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f"],
          visited_time: null,
        },
        {
          pin_id: 13,
          pin_photo_url: null,
          pin_name: "Santa Clara, California, United States",
          latitude: 32.06645,
          longitude: 34.786325,
          notes: "Outbound BDR",
          label_id: [11, 18, 8],
          created_date: "2021-10-12T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: ["b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f"],
          visited_time: null,
        },
        {
          pin_id: 18,
          pin_photo_url: null,
          pin_name: "San Diego, California, United States",
          latitude: 32.061717,
          longitude: 34.767103,
          notes: "Business Analyst",
          label_id: [9, 6, 4],
          created_date: "2021-07-27T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: [],
          visited_time: null,
        },
        {
          pin_id: 20,
          pin_photo_url: null,
          pin_name: "Colton, California, United States",
          latitude: 32.111344,
          longitude: 34.801714,
          notes: "Infrastructure Engineer",
          label_id: [9, 2, 7],
          created_date: "2021-10-26T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: [],
          visited_time: null,
        },
        {
          pin_id: 3,
          pin_photo_url: null,
          pin_name: "Texas City, Texas, United States",
          latitude: 32.11876,
          longitude: 34.82229,
          notes:
            "a note on this pin \n Fri Apr 08 2022 17:23:22 GMT+0100 (British Summer Time) \n a note on this pin \n Fri Apr 08 2022 \n a note on this pin \n Fri Apr 08 2022 \n a note on this pin \n Fri Apr 08 2022 \n a note on this pin \n Sat Apr 09 2022 \n a note on this pin",
          label_id: [16, 16, 3],
          created_date: "2021-06-20T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: ["b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f"],
          visited_time: "2022-04-09T13:39:20.889+00:00",
        },
      ],
    },
    {
      list_id: 5,
      title: "Boat or Ferry",
      list_cover_photo_url: "https://source.unsplash.com/1600x900/",
      description: "Inbound SDR",
      created_date: "2021-06-10T00:00:00+00:00",
      user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
      pin: [
        {
          pin_id: 10,
          pin_photo_url: null,
          pin_name: "Montgomery, Alabama, United States",
          latitude: 32.082191,
          longitude: 34.771216,
          notes: "Account Executive",
          label_id: [7, 16, 3],
          created_date: "2021-04-03T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: ["b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f"],
          visited_time: null,
        },
        {
          pin_id: 14,
          pin_photo_url: null,
          pin_name: "Azusa, California, United States",
          latitude: 32.059834,
          longitude: 34.772457,
          notes: "Business Analyst",
          label_id: [1, 8, 5],
          created_date: "2021-11-07T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: [],
          visited_time: null,
        },
        {
          pin_id: 17,
          pin_photo_url: null,
          pin_name: "Ormond Beach, Florida, United States",
          latitude: 32.06879,
          longitude: 34.796905,
          notes: "Backend Engineer",
          label_id: [11, 3, 1],
          created_date: "2021-12-05T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: [],
          visited_time: null,
        },
        {
          pin_id: 23,
          pin_photo_url: null,
          pin_name: "Valley Stream, New York, United States",
          latitude: 32.07606,
          longitude: 34.80074,
          notes: "Database Manager",
          label_id: [7, 2, 19],
          created_date: "2021-08-05T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: [],
          visited_time: null,
        },
        {
          pin_id: 1,
          pin_photo_url: null,
          pin_name: "Grand Forks, North Dakota, United States",
          latitude: 32.09004,
          longitude: 34.79679,
          notes: "Customer Engineer",
          label_id: [5, 17, 9],
          created_date: "2021-10-14T00:00:00+00:00",
          visited: true,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: ["b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f"],
          visited_time: "2022-04-08T15:53:43.608+00:00",
        },
        {
          pin_id: 77,
          pin_photo_url: null,
          pin_name: "West New York, New Jersey, United States",
          latitude: 32.11676,
          longitude: 34.83709,
          notes: "Co-Founder",
          label_id: [6, 9, 15],
          created_date: "2021-04-17T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: [
            "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
            "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          ],
          visited_time: null,
        },
        {
          pin_id: 71,
          pin_photo_url: null,
          pin_name: "West New York, New Jersey, United States",
          latitude: 32.11676,
          longitude: 34.83709,
          notes: "Co-Founder",
          label_id: [6, 9, 15],
          created_date: "2021-04-17T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: [
            "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
            "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          ],
          visited_time: null,
        },
      ],
    },
    {
      list_id: 18,
      title: "title",
      list_cover_photo_url: "https://source.unsplash.com/1600x900/",
      description: "3desc5",
      created_date: "2022-04-09T13:23:59.279+00:00",
      user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
      pin: [
        {
          pin_id: 1,
          pin_photo_url: null,
          pin_name: "Grand Forks, North Dakota, United States",
          latitude: 32.09004,
          longitude: 34.79679,
          notes: "Customer Engineer",
          label_id: [5, 17, 9],
          created_date: "2021-10-14T00:00:00+00:00",
          visited: true,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: ["b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f"],
          visited_time: "2022-04-08T15:53:43.608+00:00",
        },
        {
          pin_id: 2,
          pin_photo_url: null,
          pin_name: "Syracuse, New York, United States",
          latitude: 32.11614,
          longitude: 34.79464,
          notes: "CEO",
          label_id: [8, 8, 1],
          created_date: "2021-12-11T00:00:00+00:00",
          visited: true,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: ["b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f"],
          visited_time: "2022-04-08T15:53:59.03+00:00",
        },
        {
          pin_id: 3,
          pin_photo_url: null,
          pin_name: "Texas City, Texas, United States",
          latitude: 32.11876,
          longitude: 34.82229,
          notes:
            "a note on this pin \n Fri Apr 08 2022 17:23:22 GMT+0100 (British Summer Time) \n a note on this pin \n Fri Apr 08 2022 \n a note on this pin \n Fri Apr 08 2022 \n a note on this pin \n Fri Apr 08 2022 \n a note on this pin \n Sat Apr 09 2022 \n a note on this pin",
          label_id: [16, 16, 3],
          created_date: "2021-06-20T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: ["b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f"],
          visited_time: "2022-04-09T13:39:20.889+00:00",
        },
      ],
    },
    {
      list_id: 20,
      title: "title",
      list_cover_photo_url: "https://source.unsplash.com/1600x900/",
      description: "3desc5",
      created_date: "2022-04-09T13:40:20.494+00:00",
      user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
      pin: [
        {
          pin_id: 1,
          pin_photo_url: null,
          pin_name: "Grand Forks, North Dakota, United States",
          latitude: 32.09004,
          longitude: 34.79679,
          notes: "Customer Engineer",
          label_id: [5, 17, 9],
          created_date: "2021-10-14T00:00:00+00:00",
          visited: true,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: ["b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f"],
          visited_time: "2022-04-08T15:53:43.608+00:00",
        },
        {
          pin_id: 2,
          pin_photo_url: null,
          pin_name: "Syracuse, New York, United States",
          latitude: 32.11614,
          longitude: 34.79464,
          notes: "CEO",
          label_id: [8, 8, 1],
          created_date: "2021-12-11T00:00:00+00:00",
          visited: true,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: ["b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f"],
          visited_time: "2022-04-08T15:53:59.03+00:00",
        },
        {
          pin_id: 3,
          pin_photo_url: null,
          pin_name: "Texas City, Texas, United States",
          latitude: 32.11876,
          longitude: 34.82229,
          notes:
            "a note on this pin \n Fri Apr 08 2022 17:23:22 GMT+0100 (British Summer Time) \n a note on this pin \n Fri Apr 08 2022 \n a note on this pin \n Fri Apr 08 2022 \n a note on this pin \n Fri Apr 08 2022 \n a note on this pin \n Sat Apr 09 2022 \n a note on this pin",
          label_id: [16, 16, 3],
          created_date: "2021-06-20T00:00:00+00:00",
          visited: false,
          user_id: "1cd5b79a-ba8d-4788-b7eb-d73954885cae",
          historical_users: ["b50cb036-1a04-4bd9-a8f9-0ed8bb69d78f"],
          visited_time: "2022-04-09T13:39:20.889+00:00",
        },
      ],
    },
  ];

  // ============================================================================
  // =========================== On Load ========================================
  // ============================================================================

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location permission is needed to get the most out of Mapin!"
        );
        return;
      }
      let locationResp = await Location.getCurrentPositionAsync({});
      setDeviceLocation((currentLocation) => ({
        ...currentLocation,
        latitude: locationResp.coords.latitude,
        longitude: locationResp.coords.longitude,
      }));
    })();
  }, []);

  return (
    <Block paddingTop={Constants.statusBarHeight}>
      <SearchBar
        deviceLocation={deviceLocation}
        funOnPress={(details) => onResultClick(details)}
      />
      <MapView
        ref={mapRef}
        customMapStyle={isDark ? darkMapStyle : lightMapStyle}
        region={deviceLocation}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
        showsIndoors={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoorLevelPicker={false}
        provider="google"
        style={styles.map}
        loadingBackgroundColor={String(colors.background)}
      >
        {/* Markers */}
        {/* Conditional rendering of Marker */}
        {selectedPlace.latitude && selectedPlace.longitude && (
          <Marker
            coordinate={{
              latitude: selectedPlace.latitude,
              longitude: selectedPlace.longitude,
            }}
            title={selectedPlace.name}
            description={selectedPlace.address}
          />
        )}
      </MapView>

      {/* Search Location Card */}
      {selectedPlace.name && selectedPlace.address && selectedPlace.img_url ? (
        <Block>
          <Block
            card
            row
            position="absolute"
            bottom={150}
            right={0}
            marginHorizontal={sizes.xs}
          >
            <Image
              source={selectedPlace.img_url}
              height={"100%"}
              width={"33%"}
            />
            <Block padding={sizes.s} justify="space-between">
              <Text p marginBottom={15}>
                {selectedPlace.name}
              </Text>
              <TouchableOpacity>
                <Block row align="center">
                  <Text p semibold marginRight={sizes.s} color={colors.link}>
                    {selectedPlace.address}
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
      ) : null}

      {/* Button to Recenter */}
      <Button
        onPress={() => {
          goToLocation(deviceLocation.latitude, deviceLocation.longitude);
          setSelectedPlace({
            name: "",
            address: "",
            img_url: "",
          } as Place);
        }}
        position="absolute"
        bottom={10}
        right={10}
        outlined
        color={colors.background}
        flex={0}
        align="center"
        justify="center"
      >
        <Ionicons name="locate" size={20} color={String(colors.text)} />
      </Button>

      {/* List Button */}
      <Button
        onPress={() => {
          goToLocation(deviceLocation.latitude, deviceLocation.longitude);
          setSelectedPlace({
            name: "",
            address: "",
            img_url: "",
          } as Place);
        }}
        position="absolute"
        bottom={10}
        right={75}
        outlined
        color={colors.background}
        flex={0}
        align="center"
        justify="center"
      >
        <Ionicons name="albums-outline" size={20} color={String(colors.text)} />
      </Button>
    </Block>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
