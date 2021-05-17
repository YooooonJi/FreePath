import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const UserDataContainer = styled.View`
  width: 40%;
  height: 75px;
  background-color: #f9f1f7;
  border-radius: 10px;
  elevation: 3;
  flex-direction: row;
  margin-bottom: 30px;
`;

const UserDataLeftContainer = styled.View`
  width: 40px;
  justify-content: center;
`;

const UserDataIconBox = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #ce5a5a;
  border-radius: 10px;
  elevation: 4;
  margin-left: -6px;
`;

const IconUserData = styled(Icon)`
  color: white;
`;

const UserDataMiddleContainer = styled.View`
  min-width: 25%;
  align-items: center;
  justify-content: center;
`;

const UserDataTitleText = styled.Text`
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
  font-weight: bold;
`;

const UserDataText = styled.Text`
  color: #ce5a5a;
  font-size: 15px;
  font-weight: bold;
  margin-top: 5px;
`;

const UserDataRightContainer = styled.View`
  align-items: flex-start;
  width: 20px;
`;

const SettingButtonContainer = styled.TouchableOpacity`
  z-index: 1;
  width: 20px;
  height: 20px;
  padding: 0px;
  margin-top: -5px;
`;

const IconSetting = styled(Icon)`
  color: #ce5a5a;
`;

const UserData = ({ icon, title, data, setPopModal }) => (
  <UserDataContainer>
    <UserDataLeftContainer>
      <UserDataIconBox>
        <IconUserData name={icon} size={30} />
      </UserDataIconBox>
    </UserDataLeftContainer>
    <UserDataMiddleContainer>
      <UserDataTitleText>{title}</UserDataTitleText>
      <UserDataText>{data}</UserDataText>
    </UserDataMiddleContainer>
    <UserDataRightContainer>
      <SettingButtonContainer
        onPress={() => {
          setPopModal(true);
        }}
      >
        <IconSetting name="settings" size={20} />
      </SettingButtonContainer>
    </UserDataRightContainer>
  </UserDataContainer>
);

export default UserData;
