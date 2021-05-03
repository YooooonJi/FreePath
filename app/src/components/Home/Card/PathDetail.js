import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const PathDetailContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
`;

const TypeContainer = styled.View`
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: 15px;
  margin-right: 10px;
`;

const NumberContainer = styled.View`
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  min-width: 20px;
  border-radius: 10px;
  margin-right: 5px;
  padding: 0px 10px;
`;

const NumberText = styled.Text`
  color: white;
  font-size: 15px;
  font-family: "5";
`;

const StopText = styled.Text`
  font-size: 15px;
  font-family: "4";
`;

const PathDetail = ({
  type, number, stop, color,
}) => (
  <PathDetailContainer>
    <TypeContainer color={color}>
      <Icon name={type === "bus" ? "directions-bus" : "tram"} size={20} color="#ffffff" />
    </TypeContainer>
    <NumberContainer color={color}>
      <NumberText>{number}</NumberText>
    </NumberContainer>
    <StopText>{stop}</StopText>
  </PathDetailContainer>
);

export default PathDetail;
