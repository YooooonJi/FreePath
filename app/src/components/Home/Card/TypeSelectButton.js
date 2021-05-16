import React, { useState } from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const SelectContainer = styled.View`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const SelectBox = styled.TouchableOpacity`
  margin-right: 10px;
  padding: 5px 10px 5px 10px;
  height: 25px;
  border-radius: 8px;
  background-color: ${(props) => (props.disabled ? "#ce5a5a" : "#ce5a5a40")};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SelectText = styled.Text`
  margin-left: 8px;
  color: white;
  font-size: 13px;
  font-weight: bold;
`;

const TypeSelectButton = (props) => {
  const [enablePath, setEnablePath] = useState(true);
  const [enableBus, setEnableBus] = useState(false);
  const [enableSubway, setEnableSubway] = useState(false);

  const selectButton = (type) => {
    if (type === 0) {
      setEnablePath(true);
      setEnableBus(false);
      setEnableSubway(false);
    } else if (type === 1) {
      setEnablePath(false);
      setEnableBus(true);
      setEnableSubway(false);
    } else {
      setEnablePath(false);
      setEnableBus(false);
      setEnableSubway(true);
    }

    props.getAlarmType(type);
  };

  return (
    <SelectContainer>
      <SelectBox onPress={() => selectButton(0)} disabled={enablePath}>
        <Icon name="map" size={15} color="#FFFFFF" />
        <SelectText>경로</SelectText>
      </SelectBox>
      <SelectBox onPress={() => selectButton(1)} disabled={enableBus}>
        <Icon name="directions-bus" size={15} color="#FFFFFF" />
        <SelectText>버스</SelectText>
      </SelectBox>
      <SelectBox onPress={() => selectButton(2)} disabled={enableSubway}>
        <Icon name="tram" size={15} color="#FFFFFF" />
        <SelectText>지하철</SelectText>
      </SelectBox>
    </SelectContainer>
  );
};

export default TypeSelectButton;
