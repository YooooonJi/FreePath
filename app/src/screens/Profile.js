import React, { useEffect } from "react";
import styled from "styled-components/native";

const ProfileView = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const ProfileLoginButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 40px;
  background-color: black;
`;

const ProfileLoginButtonText = styled.Text`
  font-size: 15px;
  line-height: 17px;
  font-family: "5";
  color: white;
`;

const Profile = ({ setPopLogin, setIsLoggedIn, isLoggedIn }) => {
  useEffect(() => {
    if (!isLoggedIn) {
      setPopLogin(true);
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <ProfileView>
        <ProfileLoginButton onPress={() => setPopLogin(true)}>
          <ProfileLoginButtonText>로그인</ProfileLoginButtonText>
        </ProfileLoginButton>
      </ProfileView>
    );
  }

  return (
    <ProfileView>
      <ProfileLoginButton onPress={() => setIsLoggedIn(false)}>
        <ProfileLoginButtonText>로그아웃</ProfileLoginButtonText>
      </ProfileLoginButton>
    </ProfileView>
  );
};

export default Profile;
