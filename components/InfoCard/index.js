import React from "react";
import { Card, Text } from "./styles";
const InfoCard = (props) => {
  return (
    <Card>
      <Text>{props.title}</Text>
      <Text style={{ color: "#adadad" }}>{props.variable}</Text>
    </Card>
  );
};

export default InfoCard;
