import React, { useState, useRef } from "react";
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

const TypePathInput = (props) => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const departureInput = useRef();
  const arrivalInput = useRef();

  const searchAddress = (location) => {
    const restApiKey = Constants.manifest.extra.kakaoRestApiKey;
    const url = "https://dapi.kakao.com/v2/local/search/address.json";
    const getQuery = `?query=${location === "departure" ? departure : arrival}`;

    fetch(url + getQuery, {
      method: "GET",
      headers: {
        Authorization: `KakaoAK ${restApiKey}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.meta.total_count === 0) {
          alert("검색 결과가 없습니다.");
        } else if (location === "departure") {
          const departureInfo = response.documents[0];

          setDeparture(departureInfo.address_name);
          props.getInputValue1(departureInfo);
          departureInput.current.blur();
        } else {
          const arrivalInfo = response.documents[0];

          setArrival(arrivalInfo.address_name);
          props.getInputValue2(arrivalInfo);
          arrivalInput.current.blur();
        }
      })
      .catch();
  };

  return (
    <TypePathContainer>
      <InputContainer>
        <InputBox
          placeholder="출발지를 입력해주세요."
          onChangeText={setDeparture}
          onFocus={() => setDeparture("")}
          value={departure}
          ref={departureInput}
        />
        {departure !== "" && (
          <InputIconBox onPress={() => searchAddress("departure")}>
            <Icon name="search" size={15} color="rgba(0, 0, 0, 0.5)" />
          </InputIconBox>
        )}
      </InputContainer>
      <InputContainer>
        <InputBox
          placeholder="도착지를 입력해주세요."
          onChangeText={setArrival}
          onFocus={() => setArrival("")}
          value={arrival}
          ref={arrivalInput}
        />
        {arrival !== "" && (
          <InputIconBox onPress={() => searchAddress("arrival")}>
            <Icon name="search" size={15} color="rgba(0, 0, 0, 0.5)" />
          </InputIconBox>
        )}
      </InputContainer>
    </TypePathContainer>
  );
};

export default TypePathInput;
