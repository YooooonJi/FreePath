import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const PathWalkContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: -10px;
  min-width: 60px;
  max-width: 60px;
  width: ${(props) => props.width}px;
  height: 20px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: ${(props) => props.theme.card.expand.walk};
`;

const PathWalkText = styled.Text`
  color: ${(props) => props.theme.card.expand.walktext};
  font-size: 12px;
  font-weight: bold;
`;

const PathWalk = ({ minute, width }) => (
  <PathWalkContainer width={width}>
    {/* <Icon name="directions-walk" size={12} color="#968282" /> */}
    <PathWalkText>{minute}분</PathWalkText>
  </PathWalkContainer>
);

export default PathWalk;
