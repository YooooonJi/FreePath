import React, { useState } from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import TypeSelectButton from "./TypeSelectButton";
import TypeBusInput from "../Home/Card/TypeBusInput";
import TypeSubwayInput from "../Home/Card/TypeSubwayInput";
import TypePathInput from "./TypePathInput";
import { addGroupAlarmLast, addGroupAlarmTime } from "../../api/GroupApi";

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
  background-color: ${(props) => (props.focus ? "#ce5a5a" : "#ce5a5a40")};
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

const GroupCardAdd = ({
  isLoggedIn,
  setPopGroupCardAdd,
  groupAlarmList,
  setGroupAlarmList,
  members,
}) => {
  // console.log("진입");

  const now = new Date();
  const nowtime = new Date(
    Date.UTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours() - 9,
      now.getMinutes()
    )
  );

  const [alarmName, setAlarmName] = useState("");
  // 알람종류 => 경로 : 0, 버스 : 1, 지하철 : 2
  const [alarmType, setAlarmType] = useState(0);
  const [inputValue1, setInputValue1] = useState(null);
  const [inputValue2, setInputValue2] = useState(null);
  // 시간종류 => 막차 : 0, 시간선택 : 1
  const [timeType, setTimeType] = useState(0);
  const [alarmTime, setAlarmTime] = useState("");

  const [date, setDate] = useState(nowtime);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [subwayUpdown, setSubwayUpdown] = useState(0);

  const getAlarmType = (type) => {
    setAlarmType(type);
  };

  const getInputValue1 = (input1) => {
    setInputValue1(input1);
  };

  const getInputValue2 = (input2) => {
    setInputValue2(input2);
  };

  let inputType;

  if (alarmType === 0) {
    inputType = (
      <TypePathInput
        getInputValue1={getInputValue1}
        getInputValue2={getInputValue2}
      />
    );
  } else if (alarmType === 1) {
    inputType = (
      <TypeBusInput
        getInputValue1={getInputValue1}
        getInputValue2={getInputValue2}
      />
    );
  } else {
    inputType = (
      <TypeSubwayInput
        getInputValue1={getInputValue1}
        getInputValue2={getInputValue2}
        setSubwayUpdown={setSubwayUpdown}
      />
    );
  }

  const onPressAlarmTime = () => {
    setTimeType(1);
    setShow(true);
  };

  const getMemberUidList = () => {
    const uidList = [];
    for (let i = 0; i < members.length; i += 1) {
      uidList.push(members[i].uid);
    }
    return uidList;
  };

  const getLastDateTime = () => {
    const nowDate = new Date();
    const year = nowDate.getFullYear();
    const month = `0${1 + nowDate.getMonth()}`.slice(-2);
    const day = `0${nowDate.getDate()}`.slice(-2);
    const hours = 23;
    const minutes = 50;

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // api 호출 일어날 곳
  const saveCard = async () => {
    if (alarmName === "") {
      alert("알림 이름을 입력해주세요.");
    } else if (inputValue2 === null) {
      alert("도착지를 입력해주세요");
    } else if (timeType === 1 && alarmTime === "") {
      alert("시간을 설정해주세요");
    } else {
      // console.log(
      //   `알림이름 : ${alarmName}\n알림타입 : ${alarmType}\n${inputValue1.address_name}\n
      //   [${inputValue1.x}, ${inputValue1.y}]\n${inputValue2.address_name}\n
      //   [${inputValue2.x}, ${inputValue2.y}]\n시간타입 : ${timeType}\n설정시간 : ${alarmTime} `
      // );

      // console.log(inputValue1);
      // console.log(inputValue2);

      // 카드 추가 분기
      // (로그인, 비로그인) * (경로, 버스, 지하철) * (막차, 특정시간) = 12가지 분기 생길 예정
      // eslint-disable-next-line no-lonely-if
      if (isLoggedIn) {
        // 로그인
        if (alarmType === 0) {
          // 경로
          if (timeType === 0) {
            // 막차
            const req = {
              alarmName,
              arriveTime: getLastDateTime(),
              endAddress: inputValue2.address_name,
              endX: inputValue2.x,
              endY: inputValue2.y,
              uids: getMemberUidList(), // 배열멤버 uid주기
              timetype: timeType,
              inputtime: getLastDateTime(),
            };

            // console.log(req);

            const { status, data } = await addGroupAlarmLast(req);

            if (status === 200) {
              // console.log(data);
              setGroupAlarmList([...groupAlarmList, data]);
              setPopGroupCardAdd(false);
            } else {
              console.log(status);
              console.log(data);
            }
          } else if (timeType === 1) {
            // 특정시간
            const req = {
              alarmName,
              arriveTime: alarmTime,
              endAddress: inputValue2.address_name,
              endX: inputValue2.x,
              endY: inputValue2.y,
              uids: getMemberUidList(),
              timeType,
              inputtime: alarmTime,
            };

            // console.log(req);

            const { status, data } = await addGroupAlarmTime(req);

            if (status === 200) {
              // console.log(data);
              setGroupAlarmList([...groupAlarmList, data]);
              setPopGroupCardAdd(false);
            } else {
              console.log(status);
              console.log(data);
            }
          }
        }
      }
    }
  };

  return (
    <CardAddContainer>
      <CardAddBgOpacity onPress={() => setPopGroupCardAdd(false)}>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour
            display="spinner"
            onChange={(event, selected) => {
              // console.log(selected);

              // if (event.type === "dismissed") {
              //   setShow(false);
              //   return;
              // }

              if (selected !== undefined) {
                if (mode === "date") {
                  setDate(selected);
                  setMode("time");
                }

                if (mode === "time") {
                  const strSel = JSON.stringify(selected.toJSON());
                  const splitSel = strSel.split("T");
                  const splitHours = splitSel[1].split(":");
                  const alarmSet = `${splitSel[0].split('"')[1]} ${
                    splitHours[0] * 1 + 9
                  }:${splitHours[1]}`;
                  setAlarmTime(alarmSet);
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
        <TypeSelectButton getAlarmType={getAlarmType} />
        {inputType}
        <SubTitleContainer>
          <SubTitleText>
            {alarmType === 0 ? "도착" : "출발"}
            시간 설정
          </SubTitleText>
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
          <ButtonBox onPress={() => setPopGroupCardAdd(false)}>
            <ButtonText>취소</ButtonText>
          </ButtonBox>
        </ButtonContainer>
      </CardAddInner>
    </CardAddContainer>
  );
};

export default GroupCardAdd;
