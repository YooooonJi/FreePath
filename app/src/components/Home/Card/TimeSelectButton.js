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

const TimeSelectButton = (props) => {
  const [enableLast, setEnableLast] = useState(true);
  const [enableTime, setEnableTime] = useState(false);

  const selectButton = (time) => {
    if (time === "막차") {
      setEnableLast(true);
      setEnableTime(false);
    } else {
      setEnableLast(false);
      setEnableTime(true);
    }

    props.getTime(time);
  };

  return (
    <SelectContainer>
      <SelectBox onPress={() => selectButton("막차")} disabled={enableLast}>
        <Icon name="bedtime" size={15} color="#FFFFFF" />
        <SelectText>막차</SelectText>
      </SelectBox>
      <SelectBox onPress={() => selectButton("시간")} disabled={enableTime}>
        <Icon name="access-time" size={15} color="#FFFFFF" />
        <SelectText>시간 선택</SelectText>
      </SelectBox>
    </SelectContainer>
  );
};

export default TimeSelectButton;
