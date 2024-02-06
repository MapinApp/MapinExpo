import React from "react";
import MapView from "react-native-maps";
import { Block } from "@/components/ui";

export default function App() {
  return (
    <Block>
      <MapView
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </Block>
  );
}
