import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const TypeBusContainer = styled.View``;

const InputContainer = styled.View`
  margin-top: 10px;
  padding: 5px 10px 5px 10px;
  width: 100%;
  height: 30px;
  border-radius: 10px;
  background-color: #f9f1f7;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  elevation: 3;
`;

const InputBox = styled.TextInput`
  width: 90%;
  height: 30px;
`;

const InputIconBox = styled.TouchableOpacity`
  z-index: 1;
`;

const TypeBus = () => {
  const searchBusStop = () => {
    alert("정류장검색");
  };

  return (
    <TypeBusContainer>
      <InputContainer>
        <InputBox placeholder="정류장을 입력해주세요." />
        <InputIconBox onPress={searchBusStop}>
          <Icon name="search" size={15} color="rgba(0, 0, 0, 0.5)" />
        </InputIconBox>
      </InputContainer>
      <InputContainer>
        <InputBox placeholder="버스를 입력해주세요." />
        <InputIconBox>
          <Icon name="search" size={15} color="rgba(0, 0, 0, 0.5)" />
        </InputIconBox>
      </InputContainer>
    </TypeBusContainer>
  );
};

export default TypeBus;
