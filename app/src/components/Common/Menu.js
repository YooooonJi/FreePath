import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const MenuContainer = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const MenuBox = styled.View`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 70%;
  background-color: white;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 20px;
`;

const MenuTop = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  /* border-bottom-color: rgba(0, 0, 0, 0.2);
  border-bottom-width: 2px; */
`;

const ServiceTitle = styled.Text`
  font-size: 20px;
  line-height: 23px;
  font-family: "6";
`;

const ThemeButton = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
`;

const Menu = ({ setPopMenu, darkMode, setDarkMode }) => (
  <MenuContainer onPress={() => setPopMenu(false)}>
    <MenuBox>
      <MenuTop>
        <ServiceTitle>프리패스</ServiceTitle>
        <ThemeButton
          onPress={() => {
            setDarkMode(!darkMode);
          }}
        >
          <Icon name="circle-half-full" size={20} color="black" />
        </ThemeButton>
      </MenuTop>
    </MenuBox>
  </MenuContainer>
);

export default Menu;
