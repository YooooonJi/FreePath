import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Constants from "expo-constants";

const TypePathContainer = styled.View``;

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

const TypePath = () => {
  const searchAddress = () => {
    const restApiKey = Constants.manifest.extra.kakaoRestApiKey;
    const url = "https://dapi.kakao.com/v2/local/search/address.json";
    const getQuery = "?query=세종대로 110";

    fetch(url + getQuery, {
      method: "GET",
      headers: {
        Authorization: `KakaoAK ${restApiKey}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        const addressResponse = response.documents;

        alert(
          `${addressResponse[0].address_name} (${addressResponse[0].y}, ${addressResponse[0].x})`
        );
      })
      .catch();
  };

  return (
    <TypePathContainer>
      <InputContainer>
        <InputBox placeholder="출발지를 입력해주세요." />
        <InputIconBox onPress={searchAddress}>
          <Icon name="search" size={15} color="rgba(0, 0, 0, 0.5)" />
        </InputIconBox>
      </InputContainer>
      <InputContainer>
        <InputBox placeholder="도착지를 입력해주세요." />
        <InputIconBox>
          <Icon name="search" size={15} color="rgba(0, 0, 0, 0.5)" />
        </InputIconBox>
      </InputContainer>
    </TypePathContainer>
  );
};

export default TypePath;
