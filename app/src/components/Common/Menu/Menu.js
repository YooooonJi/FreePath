import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const MenuContainer = styled.View`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const MenuBgOpacity = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const MenuInner = styled.View`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 80%;
  height: 70%;
  background-color: white;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 30px 20px 20px 20px;
`;

const MenuContents = styled.View``;

const MenuHead = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 40px;
`;

const ServiceTitle = styled.Text`
  font-size: 20px;
  line-height: 23px;
  font-family: "5";
  color: ${(props) => props.theme.menu.title};
`;

const ThemeButton = styled.TouchableOpacity``;

const LoginInfoBox = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 4px;
  margin-top: 30px;
`;

const LoginInfoText = styled.Text`
  font-size: 12px;
  line-height: 14px;
  font-family: "4";
  color: ${(props) => props.theme.menu.login.info};
`;

const SectionLine = styled.View`
  height: 1px;
  background-color: ${(props) => props.theme.menu.login.info};
  margin-top: 4px;
  margin-bottom: 60px;
`;

const MenuBox = styled.TouchableOpacity`
  padding: 15px 0px;
`;

const MenuBoxTitle = styled.Text`
  font-size: 15px;
  line-height: 17px;
  font-family: "4";
  color: ${(props) => props.theme.menu.title};
`;

const CopyrightText = styled.Text`
  align-self: center;
  font-size: 10px;
  line-height: 11px;
  font-family: "4";
  color: ${(props) => props.theme.menu.copyright};
  margin-top: 4px;
`;

const IconCircleHalfFull = styled(Icon)`
  color: ${(props) => props.theme.menu.circle};
`;

const IconChevronRight = styled(Icon)`
  color: ${(props) => props.theme.menu.login.info};
`;

const Menu = ({ setPopMenu, darkMode, setDarkMode }) => (
  <MenuContainer>
    <MenuBgOpacity onPress={() => setPopMenu(false)} />
    <MenuInner>
      <MenuContents>
        <MenuHead>
          <ServiceTitle>프리패스</ServiceTitle>
          <ThemeButton
            onPress={() => {
              setDarkMode(!darkMode);
            }}
          >
            <IconCircleHalfFull name="circle-half-full" size={24} />
          </ThemeButton>
        </MenuHead>
        <LoginInfoBox>
          <LoginInfoText>
            로그인 하시고 맞춤 알림을 제공받아보세요.
          </LoginInfoText>
          <IconChevronRight name="chevron-right" size={20} />
        </LoginInfoBox>
        <SectionLine />
        <MenuBox>
          <MenuBoxTitle>메뉴이름미정</MenuBoxTitle>
        </MenuBox>
        <MenuBox>
          <MenuBoxTitle>메뉴이름미정</MenuBoxTitle>
        </MenuBox>
        <MenuBox>
          <MenuBoxTitle>메뉴이름미정</MenuBoxTitle>
        </MenuBox>
        <MenuBox>
          <MenuBoxTitle>메뉴이름미정</MenuBoxTitle>
        </MenuBox>
      </MenuContents>
      <CopyrightText>
        Copyright 2021. Team GGOMJIRAK. All rights reserved.
      </CopyrightText>
    </MenuInner>
  </MenuContainer>
);

export default Menu;
