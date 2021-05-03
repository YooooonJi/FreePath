import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import PathTransport from "./PathTransport";
import PathWalk from "./PathWalk";
import PathDetail from "./PathDetail";
import BusDetail from "./BusDetail";

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

const DepartureBox = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background-color: #f46262;
`;

const ArrivalBox = styled(DepartureBox)`
  margin-left: -10px;
`;

const DetailContainer = styled.View`
  width: 100%;
  margin-top: 15px;
  padding: 0px 10px;
`;

const CardExpand = () => (
  <CardExpandView>
    <PathContainer>
      <ArrivalBox>
        <Icon name="flag" size={15} color="#ffffff" />
      </ArrivalBox>
      <PathWalk minute={6} width={(6 * screenWidth) / 44} />
      <PathTransport minute={8} width={(8 * screenWidth) / 44} color="#19bf66" />
      <PathWalk minute={2} width={(2 * screenWidth) / 44} />
      <PathTransport minute={22} width={(22 * screenWidth) / 44} color="#d1d2a2" />
      <PathWalk minute={6} width={(6 * screenWidth) / 44} />
      <DepartureBox>
        <Icon name="place" size={15} color="#ffffff" />
      </DepartureBox>
    </PathContainer>
    <DetailContainer>
      <PathDetail type="bus" number={5714} stop="당산푸르지오아파트 승차" color="#d1d2a2" />
      <BusDetail count={12} stop="강남역" />
      <PathDetail type="tram" number={2} stop="강남역 환승 > 역삼역 하차" color="#19bf66" />
    </DetailContainer>
  </CardExpandView>
);

export default CardExpand;
