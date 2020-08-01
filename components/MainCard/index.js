import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

import { Card, CardHourText, CardTemparatureText, CardIcon } from "./styles";

const MainCard = (props) => {
  const Icon = () => {
    if (props.icon === "sun") {
      return (
        <Feather
          style={{ color: "white", margin: 15 }}
          name="sun"
          size={40}
          color="white"
        />
      );
    }
  };

  return (
    <Card style={{ backgroundColor: props.backgroundColor }}>
      <CardHourText>{props.title}</CardHourText>
      <Icon></Icon>
      <CardTemparatureText>{props.variable}º</CardTemparatureText>
    </Card>
  );
};

export default MainCard;
