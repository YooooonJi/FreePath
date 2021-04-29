import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import PathTransport from "./PathTransport";
import PathWalk from "./PathWalk";
import PathDetail from "./PathDetail";

// 현재 컴포넌트의 width를 불러오도록 변경 필요
const screenWidth = Dimensions.get("window").width * 0.7;

const CardExpandView = styled.View`
  display: flex;
  align-items: center;
  padding: 15px;
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: white;
  elevation: 3;
`;

const PathContainer = styled.View`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  width: 100%;
`;

const PointBox = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  margin-left: -10px;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background-color: #f46262;
`;

const DetailContainer = styled.View`
  width: 100%;
  margin-top: 15px;
  padding: 0px 10px;
`;

const CardExpand = () => {
  return (
    <CardExpandView>
      <PathContainer>
        <PointBox>
          <Icon name={"flag"} size={15} color={"#ffffff"}></Icon>
        </PointBox>
        <PathWalk minute={6} width={6 * screenWidth / 44}></PathWalk>
        <PathTransport minute={8} width={8 * screenWidth / 44} color={"#19bf66"}></PathTransport>
        <PathWalk minute={2} width={2 * screenWidth / 44}></PathWalk>
        <PathTransport minute={22} width={22 * screenWidth / 44} color={"#d1d2a2"}></PathTransport>
        <PathWalk minute={6} width={6 * screenWidth / 44}></PathWalk>
        <PointBox style={{ marginLeft: 0 }}>
          <Icon name={"place"} size={15} color={"#ffffff"}></Icon>
        </PointBox>
      </PathContainer>
      <DetailContainer>
        <PathDetail type={"bus"} number={5714} stop={"당산푸르지오아파트 승차"} color={"#d1d2a2"}></PathDetail>
        <PathDetail type={"tram"} number={2} stop={"강남역 환승 > 역삼역 하차"} color={"#19bf66"}></PathDetail>
      </DetailContainer>
    </CardExpandView>
  )
}

export default CardExpand;
