import React, { useState } from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Card from "../Home/Card";

const GroupAlarmContainer = styled.View`
  display: flex;
  width: 100%;
  min-height: ${(props) => props.boardHeight}px;
  background-color: ${(props) =>
    !props.setup ? props.theme.board.bg : "rgba(0, 0, 0, 0.5)"};
  padding-left: 10px;
  padding-right: 10px;
`;

const LabelContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  margin-top: 20px;
`;

const LabelText = styled.Text`
  color: ${(props) => props.theme.board.label.title};
  font-size: 15px;
  font-weight: bold;
`;

const LabelSetupText = styled.Text`
  color: ${(props) => (!props.setup ? props.theme.board.label.setup : "white")};
  font-size: 15px;
  line-height: 17px;
  font-family: "5";
`;

const CardContainer = styled.View`
  margin-top: 15px;
  margin-bottom: 15px;
  width: 100%;
  height: 80px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.card.bg};
  display: flex;
  justify-content: center;
  align-items: center;
  elevation: 3;
`;

const IconAddCircle = styled(Icon)`
  color: ${(props) => props.theme.card.add};
`;

const GuideContainer = styled.View`
  align-self: center;
  margin-top: 20px;
  width: 75%;
  height: 50px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.board.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  elevation: 3;
`;

const GuideLineBox = styled.View`
  flex-direction: row;
`;

const GuideText = styled.Text`
  font-size: 12px;
  color: ${(props) => props.color};
  font-weight: bold;
`;

const GroupAlarm = ({ groupAlarmList, setPopGroupCardAdd }) => {
  const screenHeight = Dimensions.get("window").height;

  const [setup, setSetup] = useState(false);
  return (
    <GroupAlarmContainer setup={setup} boardHeight={screenHeight - 273}>
      <LabelContainer>
        <LabelText>그룹 알림</LabelText>
        <LabelSetupText setup={setup} onPress={() => setSetup(!setup)}>
          {setup ? "완료" : "편집"}
        </LabelSetupText>
      </LabelContainer>
      {groupAlarmList &&
        groupAlarmList.map((ga, index) => (
          <Card key={index} data={ga} setup={setup} />
        ))}
      {groupAlarmList && groupAlarmList.length === 0 && (
        <GuideContainer>
          <GuideLineBox>
            <GuideText color="#5B79E1">친구</GuideText>
            <GuideText color="rgba(0, 0, 0, 0.5)">
              를 초대해 그룹을 만들고
            </GuideText>
          </GuideLineBox>
          <GuideLineBox>
            <GuideText color="#CE5A5A">그룹 알림</GuideText>
            <GuideText color="rgba(0, 0, 0, 0.5)">을 등록해보세요!</GuideText>
          </GuideLineBox>
        </GuideContainer>
      )}
      {!setup && (
        <CardContainer>
          <IconAddCircle
            name="add-circle"
            size={40}
            onPress={() => setPopGroupCardAdd(true)}
          />
        </CardContainer>
      )}
    </GroupAlarmContainer>
  );
};

export default GroupAlarm;
