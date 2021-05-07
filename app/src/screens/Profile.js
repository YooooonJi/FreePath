import React, { useEffect } from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileView = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: white;
`;

const ProfileLoginButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 40px;
  background-color: black;
  margin-top: 5px;
`;

const ProfileLoginButtonText = styled.Text`
  font-size: 15px;
  line-height: 17px;
  font-family: "5";
  color: white;
`;

const TitleContainer = styled.View`
  position: relative;
  width: 100%;
  height: 40%;
  background-color: ${(props) => props.theme.login.bg};
`;

const ProfileImage = styled.View`
  margin-top: -150px;
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background-color: ${(props) => props.theme.profile.bg};
  display: flex;
  justify-content: center;
  align-items: center;
  elevation: 4;
`;

const ProfileContainer = styled.View`
  margin-top: -50px;
  width: 90%;
  height: 60%;
  border-radius: 10px;
  background-color: ${(props) => props.theme.profile.bg};
  display: flex;
  justify-content: center;
  align-items: center;
  elevation: 3;
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
    <SafeAreaView>
      <ProfileView>
        <TitleContainer />
        <ProfileImage />
        <ProfileContainer />
        <ProfileLoginButton onPress={() => setIsLoggedIn(false)}>
          <ProfileLoginButtonText>로그아웃</ProfileLoginButtonText>
        </ProfileLoginButton>
      </ProfileView>
    </SafeAreaView>
  );
};

export default Profile;
