import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const LocationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 35px;
`;

const LocationIconBox = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: white;
  elevation: 3;
`;

const LocationFavorite = () => (
  <LocationContainer>
    <LocationIconBox><Icon name="home-heart" size={40} color="#BBB27E" /></LocationIconBox>
    <LocationIconBox><Icon name="wallet-travel" size={40} color="#8C837C" /></LocationIconBox>
    <LocationIconBox><Icon name="flag" size={40} color="#ABC2E0" /></LocationIconBox>
    <LocationIconBox><Icon name="flag" size={40} color="#ABC2E0" /></LocationIconBox>
  </LocationContainer>
);

export default LocationFavorite;
