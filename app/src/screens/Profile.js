import React, { useEffect } from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import firebase from "firebase";
import MenuButton from "../components/Common/MenuButton";
import LocationFavorite from "../components/Profile/LocationFavorite";

const ProfileContainer = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const LogoutButtonContainer = styled.TouchableOpacity`
  z-index: 1;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  right: 0;
  top: 0;
  width: 45px;
  height: 45px;
  padding: 0px;
`;

const IconLogout = styled(Icon)`
  color: white;
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

const UpperContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  background-color: ${(props) => props.theme.profile.bg};
`;

const ProfileImage = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 3px solid #F4E7E7;
  background-color: ${(props) => props.theme.board.bg};
  elevation: 3;
  margin-top: 25px;
`;

const ProfileText = styled.Text`
  color: ${(props) => props.theme.carousel.text};
  font-size: 18px;
  line-height: 20px;
  font-family: "5";
  margin-top: 15px;
`;

const LowerContainer = styled.View`
  display: flex;
  width: 100%;
  height: 1000px;
  background-color: ${(props) => props.theme.board.bg};
  padding: 20px;
`;

const ProfileLabelText = styled.Text`
  color: ${(props) => props.theme.board.label.title};
  font-size: 15px;
  line-height: 17px;
  font-family: "5";
`;

const GuideContainer = styled.View`
  margin: 20px auto;
  width: 75%;
  height: 50px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.board.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  elevation: 3;
`;

const GuideLineBox = styled.View`
  flex-direction: row;
`;

const GuideText = styled.Text`
  font-size: 12px;
  line-height: 18px;
  font-family: "5";
  color: ${(props) => props.color};
`;

const Profile = ({ setPopMenu, setPopLogin, setIsLoggedIn, isLoggedIn }) => {
  useEffect(() => {
    if (!isLoggedIn) {
      setPopLogin(true);
    }
  }, []);

  const logout = () => {
    setIsLoggedIn(false);

    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch(() => {
      // An error happened.
    });
  };

  if (!isLoggedIn) {
    return (
      <ProfileContainer>
        <ProfileLoginButton onPress={() => setPopLogin(true)}>
          <ProfileLoginButtonText>로그인</ProfileLoginButtonText>
        </ProfileLoginButton>
      </ProfileContainer>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <ProfileContainer>
          <MenuButton setPopMenu={setPopMenu} />
          <LogoutButtonContainer onPress={() => logout()}>
            <IconLogout name="logout" size={24} />
          </LogoutButtonContainer>
          <UpperContainer>
            <ProfileImage />
            <ProfileText>lion_choonsik@gmail.com</ProfileText>
          </UpperContainer>
          <LowerContainer>
            <ProfileLabelText>장소 즐겨찾기</ProfileLabelText>
            <GuideContainer>
              <GuideLineBox>
                <GuideText color="#5B79E1">자주가는 장소</GuideText>
                <GuideText color="rgba(0, 0, 0, 0.5)">를 등록해서</GuideText>
              </GuideLineBox>
              <GuideLineBox>
                <GuideText color="rgba(0, 0, 0, 0.5)">알림 추가 시 </GuideText>
                <GuideText color="#CE5A5A">편리하게 </GuideText>
                <GuideText color="rgba(0, 0, 0, 0.5)">찾아보세요!</GuideText>
              </GuideLineBox>
            </GuideContainer>
            <LocationFavorite />
            <ProfileLabelText>사용자 추가 정보</ProfileLabelText>
            <GuideContainer>
              <GuideLineBox>
                <GuideText color="#5B79E1">프리패스</GuideText>
                <GuideText color="rgba(0, 0, 0, 0.5)">에서는 사용자 추가 정보 설정을 통해</GuideText>
              </GuideLineBox>
              <GuideLineBox>
                <GuideText color="#CE5A5A">맞춤 출발시간</GuideText>
                <GuideText color="rgba(0, 0, 0, 0.5)">과 </GuideText>
                <GuideText color="#CE5A5A">추천 경로</GuideText>
                <GuideText color="rgba(0, 0, 0, 0.5)">를 안내해드립니다.</GuideText>
              </GuideLineBox>
            </GuideContainer>
          </LowerContainer>
        </ProfileContainer>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
