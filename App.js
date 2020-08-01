import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import styled from "styled-components/native";
import { Feather, EvilIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

import InfoCard from "./components/InfoCard";
import MainCard from "./components/MainCard";

import getCurrentWeather from "./service/api";

export const Container = styled.View`
  flex: 1;
  background-color: #232634;
  align-items: center;
`;

export const RefreshButton = styled.TouchableOpacity`
  position: absolute;
  align-self: flex-start;
  margin: 30px;
`;

export const TemperatureView = styled.View`
  align-items: center;
  flex-direction: row;
  margin-top: 10px;
`;

export const TemperatureText = styled.Text`
  color: #e0e0e0;
  font-size: 50px;
`;

export const CardsView = styled.View`
  margin: 10px;
  align-items: center;
  flex-direction: row;
`;

export const LocalizationText = styled.Text`
  color: #e0e0e0;
`;

export const Info = styled.View`
  align-items: center;
  border-radius: 20px;
  width: 350px;
  height: 200px;
  background-color: #393e54;
`;

export const InfoText = styled.Text`
  color: #e0e0e0;
  margin: 15px;
  font-size: 20px;
  font-weight: bold;
`;

export const AddtionalInfo = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export default function App() {
  const [currentTemperature, setCurrentTemperature] = useState("31");
  const [locationCoords, setLocationCoords] = useState(null);

  const [locationName, setLocationName] = useState("BR, Pereiro");

  const [temperatureMin, setTemperatureMin] = useState("21");
  const [temperatureMax, setTemperatureMax] = useState("32");
  const [wind, setWind] = useState("7");
  const [humidity, setHumidity] = useState("68");

  async function getLocation() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    } else {
      let location = await Location.getCurrentPositionAsync({});
      await setLocationCoords(location.coords);
    }
  }

  async function setCurrentWeather() {
    await getLocation();
    const data = await getCurrentWeather(locationCoords);

    setCurrentTemperature(convertKelvinToC(data[0]));
    setTemperatureMin(convertKelvinToC(data[1]));
    setTemperatureMax(convertKelvinToC(data[2]));
    setLocationName(data[3]);
    setWind(data[4]);
    setHumidity(data[5]);
  }

  function convertKelvinToC(kelvin) {
    return parseInt(kelvin - 273);
  }

  useEffect(() => {
    setCurrentWeather();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#232634" />
      <Container>
        <RefreshButton onPress={() => setCurrentWeather()}>
          <EvilIcons name="refresh" color={"white"} size={32} />
        </RefreshButton>

        <Feather
          style={{ marginTop: 50 }}
          name="sun"
          size={40}
          color="orange"
        />

        <TemperatureView>
          <LocalizationText style={{ fontSize: 36, color: "#fff" }}>
            {locationName}
          </LocalizationText>
        </TemperatureView>

        <CardsView>
          <MainCard
            title={"Temp"}
            icon={"sun"}
            temperature={"27°"}
            backgroundColor={"#D26F2F"}
            variable={currentTemperature}
          ></MainCard>
          <MainCard
            title={"Temp Min"}
            icon={"sun"}
            temperature={"31°"}
            backgroundColor={"#D29600"}
            variable={temperatureMin}
          ></MainCard>
          <MainCard
            title={"Temp Max"}
            icon={"sun"}
            temperature={"21°"}
            backgroundColor={"#008081"}
            variable={temperatureMax}
          ></MainCard>
        </CardsView>

        <Info>
          <InfoText>Informações adcionais:</InfoText>
          <AddtionalInfo>
            <InfoCard title={"Vento"} variable={wind}></InfoCard>
            <InfoCard title={"Umidade"} variable={humidity}></InfoCard>
          </AddtionalInfo>
        </Info>
      </Container>
    </>
  );
}
