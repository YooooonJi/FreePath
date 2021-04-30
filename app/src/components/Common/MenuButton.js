import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import styled from "styled-components/native";

const MenuButtonContainer = styled.TouchableOpacity`
  z-index: 1;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  left: 0;
  top: 0;
  width: 45px;
  height: 45px;
  padding: 5px;
`;

const MenuButton = ({ setPopMenu }) => (
  <MenuButtonContainer onPress={() => setPopMenu(true)}>
    <Icon name="menu" size={20} color="white" />
  </MenuButtonContainer>
);

export default MenuButton;
