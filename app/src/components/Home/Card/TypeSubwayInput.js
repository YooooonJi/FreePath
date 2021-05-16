import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const TypeSubwayContainer = styled.View``;

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

const TypeSubwayInput = () => {
  const searchStation = () => {
    alert("역 검색");
  };

  return (
    <TypeSubwayContainer>
      <InputContainer>
        <InputBox placeholder="역 이름을 입력해주세요." />
        <InputIconBox onPress={searchStation}>
          <Icon name="search" size={15} color="rgba(0, 0, 0, 0.5)" />
        </InputIconBox>
      </InputContainer>
      <InputContainer>
        <InputBox placeholder="라인을 입력해주세요." />
        <InputIconBox>
          <Icon name="search" size={15} color="rgba(0, 0, 0, 0.5)" />
        </InputIconBox>
      </InputContainer>
    </TypeSubwayContainer>
  );
};

export default TypeSubwayInput;
