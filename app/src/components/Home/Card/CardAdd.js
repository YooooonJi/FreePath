import React, { useState } from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
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
  background-color: ${(props) => (props.focus ? "#ce5a5a" : "#d0d0d0")};
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
  const [alarmName, setAlarmName] = useState("");
  // 알람종류 => 경로 : 0, 버스 : 1, 지하철 : 2
  const [alarmType, setAlarmType] = useState(0);
  const [inputValue1, setInputValue1] = useState(null);
  const [inputValue2, setInputValue2] = useState(null);
  // 시간종류 => 막차 : 0, 시간선택 : 1
  const [timeType, setTimeType] = useState(0);
  const [alarmTime, setAlarmTime] = useState("");

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const getInputValue1 = (input1) => {
    setInputValue1(input1);
  };

  const getInputValue2 = (input2) => {
    setInputValue2(input2);
  };

  let inputType;

  if (alarmType === 0) {
    inputType = (
      <TypePath
        getInputValue1={getInputValue1}
        getInputValue2={getInputValue2}
      />
    );
  } else if (alarmType === 1) {
    inputType = <TypeBus />;
  } else {
    inputType = <TypeSubway />;
  }

  const onPressAlarmTime = () => {
    setTimeType(1);
    setShow(true);
  };

  // api 호출 일어날 곳
  const saveCard = () => {
    if (alarmName === "") {
      alert("알림 이름을 입력해주세요.");
    } else if (inputValue1 === null) {
      alert("출발지를 입력해주세요");
    } else if (inputValue2 === null) {
      alert("도착지를 입력해주세요");
    } else if (timeType === 1 && alarmTime === "") {
      alert("시간을 설정해주세요");
    } else {
      alert(
        `알림이름 : ${alarmName}\n알림타입 : ${alarmType}\n${inputValue1.address_name}\n[${inputValue1.x}, ${inputValue1.y}]\n${inputValue2.address_name}\n[${inputValue2.x}, ${inputValue2.y}]\n알림타입 : ${timeType}\n설정시간 : ${alarmTime} `
      );
    }
  };

  return (
    <CardAddContainer>
      <CardAddBgOpacity onPress={() => setPopCardAdd(false)}>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour
            display="spinner"
            onChange={(event, selected) => {
              if (event.type === "dismissed") {
                setShow(false);
                return;
              }

              if (selected !== undefined) {
                if (mode === "date") {
                  setDate(selected);
                  setMode("time");
                }

                if (mode === "time") {
                  setAlarmTime(
                    `${JSON.stringify(selected.toJSON()).slice(
                      1,
                      11
                    )} ${JSON.stringify(selected.toJSON()).slice(12, 17)}`
                  );

                  setShow(false);
                  setMode("date");
                }
              }
            }}
          />
        )}
      </CardAddBgOpacity>
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
          <SelectBox focus={alarmType === 0} onPress={() => setAlarmType(0)}>
            <Icon name="map" size={15} color="#FFFFFF" />
            <SelectText>경로</SelectText>
          </SelectBox>
          <SelectBox focus={alarmType === 1} onPress={() => setAlarmType(1)}>
            <Icon name="directions-bus" size={15} color="#FFFFFF" />
            <SelectText>버스</SelectText>
          </SelectBox>
          <SelectBox focus={alarmType === 2} onPress={() => setAlarmType(2)}>
            <Icon name="tram" size={15} color="#FFFFFF" />
            <SelectText>지하철</SelectText>
          </SelectBox>
        </SelectContainer>
        {inputType}
        <SubTitleContainer>
          <SubTitleText>도착 시간 설정</SubTitleText>
          <Icon name="info" size={15} color="#000000" />
        </SubTitleContainer>
        <SelectContainer>
          <SelectBox focus={timeType === 0} onPress={() => setTimeType(0)}>
            <Icon name="bedtime" size={15} color="#FFFFFF" />
            <SelectText>막차</SelectText>
          </SelectBox>
          <SelectBox focus={timeType === 1} onPress={onPressAlarmTime}>
            <Icon name="access-time" size={15} color="#FFFFFF" />
            <SelectText>{alarmTime === "" ? "시간선택" : alarmTime}</SelectText>
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
