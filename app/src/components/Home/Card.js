import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const CardView = styled.View`
  margin-top: 15px;
  padding: 5px 10px;
  width: 100%;
  height: 100px;
  border-radius: 10px;
  background-color: #f9f1f7;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  elevation: 3;
`;

const CardLeftBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const CardOnOffBox = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #dd5254;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardOnOffText = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
`;

const CardInfoBox = styled.View`
  display: flex;
  justify-content: flex-start;
`;

const CardTitleText = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

const CardAddressText = styled.Text`
  margin-top: 3px;
  margin-bottom: 6px;
  margin-left: 1px;
  font-size: 12px;
  font-weight: bold;
  color: #7d797c;
`;

const CardTimeTagBox = styled.View`
  background-color: #e7e8b7;
  padding: 2px 8px;
  border-radius: 10px;
  align-self: flex-start;
`;

const CardTimeTagText = styled.Text`
  color: #958164;
  font-weight: bold;
  font-size: 12px;
`;

const CardRightBox = styled.View`
  min-width: 100px;
  max-width: 100px;
  width: 100px;
  height: 100%;
  display: flex;
  align-items: flex-end;
`;

const TimeLeftText = styled.Text`
  color: #7d797c;
  font-weight: bold;
  font-size: 15px;
  margin-top: 10px;
`;

const Card = ({ title, address, time }) => {
  return (
    <CardView>
      <CardLeftBox>
        <CardOnOffBox>
          <Icon name={"map"} size={20} color={"#FFFFFF"}></Icon>
          <CardOnOffText>ON</CardOnOffText>
        </CardOnOffBox>
        <CardInfoBox>
          <CardTitleText>{title}</CardTitleText>
          <CardAddressText>{address}</CardAddressText>
          <CardTimeTagBox>
            <CardTimeTagText>{time}</CardTimeTagText>
          </CardTimeTagBox>
        </CardInfoBox>
      </CardLeftBox>
      <CardRightBox>
        <TimeLeftText>1시간 15분 후</TimeLeftText>
      </CardRightBox>
    </CardView>
  );
};

export default Card;
