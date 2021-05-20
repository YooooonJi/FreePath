import React from "react";
import styled from "styled-components/native";

const PathTransportContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: -10px;
  min-width: 30px;
  max-width: 60px;
  width: ${(props) => props.width}px;
  height: 20px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: ${(props) => props.color};
`;

const PathTransportText = styled.Text`
  color: ${(props) => props.theme.card.expand.transtext};
  font-size: 12px;
  font-weight: bold;
`;

const PathTransport = ({ minute, width, color }) => (
  <PathTransportContainer width={width} color={color}>
    <PathTransportText>{minute}분</PathTransportText>
  </PathTransportContainer>
);

export default PathTransport;
