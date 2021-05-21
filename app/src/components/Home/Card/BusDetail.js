import React from "react";
import styled from "styled-components/native";

const BusDetailContainer = styled.View`
  justify-content: space-between;
  height: 60px;
  border-left-width: 3px;
  border-left-color: rgba(0, 0, 0, 0.1);
  margin-left: 14px;
  padding: 5px 25px;
`;

const StopText = styled.Text`
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
  line-height: 15px;
  font-family: "4";
`;

const ArrivalText = styled.Text`
  color: black;
  font-size: 15px;
  line-height: 20px;
  font-family: "4";
`;

const BusDetail = ({ count, stop }) => (
  <BusDetailContainer>
    <StopText>
      {count}
      개 정류장
    </StopText>
    <ArrivalText>
      {stop}
      {" "}
      하차
    </ArrivalText>
  </BusDetailContainer>
);

export default BusDetail;
