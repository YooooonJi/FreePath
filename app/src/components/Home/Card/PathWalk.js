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
  width: ${(props) => props.width};
  height: 20px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #f1eaea;
`;

const PathWalkText = styled.Text`
  color: #968282;
  font-size: 12px;
  font-family: "5";
`;

const PathWalk = ({ minute, width }) => (
  <PathWalkContainer width={width}>
    <Icon name="directions-walk" size={15} color="#968282" />
    <PathWalkText>
      {minute}
      분
    </PathWalkText>
  </PathWalkContainer>
);

export default PathWalk;
