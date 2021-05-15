import React, { useState } from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import TypeBus from "./TypeBus";
import TypeSubway from "./TypeSubway";
import TypePath from "./TypePath";

const CardAddContainer = styled.View`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const CardAddBgOpacity = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CardAddInner = styled.View`
  display: flex;
  background-color: white;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: absolute;
  bottom: 0;
  padding: 20px;
`;

const TitleText = styled.Text`
  margin-bottom: 10px;
  color: black;
  font-size: 18px;
  font-weight: bold;
`;

const SubTitleContainer = styled.View`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SubTitleText = styled.Text`
  color: black;
  font-size: 15px;
  font-weight: bold;
`;

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
  background-color: #ce5a5a;
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

const ButtonContainer = styled.View`
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const ButtonBox = styled.TouchableOpacity`
  width: 150px;
  height: 40px;
  border-radius: 10px;
  background-color: #f9f1f7;
  display: flex;
  justify-content: center;
  align-items: center;
  elevation: 3;
`;

const ButtonText = styled.Text`
  color: rgba(0, 0, 0, 0.25);
  font-size: 18px;
  font-weight: bold;
`;

const CardAdd = ({ setPopCardAdd }) => {
  const [alarmName, setAlarmName] = useState(null);
  const [alarmType, setAlarmType] = useState("경로");
  const [inputValue1, setInputValue1] = useState(null);
  const [inputValue2, setInputValue2] = useState(null);

  const getInputValue1 = (input1) => {
    setInputValue1(input1);
  };

  const getInputValue2 = (input2) => {
    setInputValue2(input2);
  };

  let inputType;

  if (alarmType === "경로") {
    inputType = (
      <TypePath
        getInputValue1={getInputValue1}
        getInputValue2={getInputValue2}
      />
    );
  } else if (alarmType === "버스") {
    inputType = <TypeBus />;
  } else {
    inputType = <TypeSubway />;
  }

  const saveCard = () => {
    if (alarmName === null || inputValue1 === null || inputValue2 === null) {
      alert("알람 정보를 입력해주세요.");
    } else {
      alert(`저장 - ${alarmType} : ${inputValue1} / ${inputValue2}`);
    }
  };

  return (
    <CardAddContainer>
      <CardAddBgOpacity onPress={() => setPopCardAdd(false)} />
      <CardAddInner>
        <TitleText>알림 추가</TitleText>
        <SubTitleContainer>
          <SubTitleText>알림 이름</SubTitleText>
        </SubTitleContainer>
        <InputContainer>
          <InputBox
            placeholder="알림 이름을 입력해주세요. (최대 10글자)"
            onChangeText={setAlarmName}
            value={alarmName}
          />
        </InputContainer>
        <SubTitleContainer>
          <SubTitleText>종류 선택</SubTitleText>
        </SubTitleContainer>
        <SelectContainer>
          <SelectBox onPress={() => setAlarmType("경로")}>
            <Icon name="map" size={15} color="#FFFFFF" />
            <SelectText>경로</SelectText>
          </SelectBox>
          <SelectBox onPress={() => setAlarmType("버스")}>
            <Icon name="directions-bus" size={15} color="#FFFFFF" />
            <SelectText>버스</SelectText>
          </SelectBox>
          <SelectBox onPress={() => setAlarmType("지하철")}>
            <Icon name="tram" size={15} color="#FFFFFF" />
            <SelectText>지하철</SelectText>
          </SelectBox>
        </SelectContainer>
        {inputType}
        <SubTitleContainer>
          <SubTitleText>출발 시간 설정</SubTitleText>
          <Icon name="info" size={15} color="#000000" />
        </SubTitleContainer>
        <SelectContainer>
          <SelectBox>
            <Icon name="bedtime" size={15} color="#FFFFFF" />
            <SelectText>막차</SelectText>
          </SelectBox>
          <SelectBox>
            <Icon name="access-time" size={15} color="#FFFFFF" />
            <SelectText>시간 선택</SelectText>
          </SelectBox>
        </SelectContainer>
        <ButtonContainer>
          <ButtonBox onPress={() => saveCard()}>
            <ButtonText>저장</ButtonText>
          </ButtonBox>
          <ButtonBox onPress={() => setPopCardAdd(false)}>
            <ButtonText>취소</ButtonText>
          </ButtonBox>
        </ButtonContainer>
      </CardAddInner>
    </CardAddContainer>
  );
};

export default CardAdd;
