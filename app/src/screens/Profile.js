import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalSelector from "react-native-modal-selector";
import MenuButton from "../components/Common/MenuButton";
import LocationFavorite from "../components/Profile/LocationFavorite";
import UserData from "../components/Profile/UserData";
import { getAllProfile, updateCustom } from "../api/UserApi";

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
  border: 3px solid #f4e7e7;
  background-color: ${(props) => props.theme.board.bg};
  elevation: 3;
  margin-top: 25px;
`;

const ProfileNickname = styled.Text`
  color: ${(props) => props.theme.carousel.text};
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
`;

const ProfileEmail = styled.Text`
  color: ${(props) => props.theme.carousel.text};
  font-size: 15px;
  margin-top: 5px;
`;

const LowerContainer = styled.View`
  display: flex;
  width: 100%;
  background-color: ${(props) => props.theme.board.bg};
  padding: 20px;
`;

const ProfileLabelText = styled.Text`
  color: ${(props) => props.theme.board.label.title};
  font-size: 15px;
  font-weight: bold;
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
  color: ${(props) => props.color};
  font-weight: bold;
`;

const UserDataContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Profile = ({ setPopMenu, setPopLogin, setIsLoggedIn, isLoggedIn }) => {
  const [profileData, setProfileData] = useState(null);
  const [popModal1, setPopModal1] = useState(false);
  const [popModal2, setPopModal2] = useState(false);
  const [popModal3, setPopModal3] = useState(false);
  const [popModal4, setPopModal4] = useState(false);
  const [speed, setSpeed] = useState(4);
  const [favorites, setFavorites] = useState(0);
  const [priority, setPriority] = useState(0);
  const [sparetime, setSparetime] = useState(5);

  const customSpeed = [
    "멈춰!",
    "매우 느림",
    "느림",
    "조금 느림",
    "보통",
    "조금 빠름",
    "빠름",
    "매우 빠름",
  ];
  const customFavorites = ["상관없음", "지하철", "버스"];
  const customPriority = ["상관없음", "최단시간", "최소환승"];

  useEffect(() => {
    const asyncGetAllProfile = async () => {
      const req = { uid: firebase.auth().currentUser.uid };
      const { status, data } = await getAllProfile(req);

      if (status === 200) {
        console.log(data);
        setProfileData(data);
        setSpeed(data.custom.speed);
        setFavorites(data.custom.favorites);
        setPriority(data.custom.priority);
        setSparetime(data.custom.sparetime);
      }
    };

    if (isLoggedIn) {
      asyncGetAllProfile();
    }
  }, [isLoggedIn]);

  const logout = async () => {
    firebase
      .auth()
      .signOut()
      .then(async () => {
        await AsyncStorage.removeItem("credential");
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.log(error);
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

  const data1 = [
    { key: 0, section: true, label: "보행속도 입력" },
    { key: 2, label: "느림(2km/h)" },
    { key: 4, label: "보통(4km/h)" },
    { key: 6, label: "빠름(6km/h)" },
  ];

  const data2 = [
    { key: 4, section: true, label: "선호교통수단 입력" },
    { key: 0, label: "상관없음" },
    { key: 1, label: "지하철" },
    { key: 2, label: "버스" },
  ];

  const data3 = [
    { key: 4, section: true, label: "경로우선순위 입력" },
    { key: 0, label: "상관없음" },
    { key: 1, label: "최단시간" },
    { key: 2, label: "최소환승" },
  ];

  const data4 = [
    { key: 0, section: true, label: "출발여유시간 입력" },
    { key: 5, label: "5분" },
    { key: 10, label: "10분" },
    { key: 15, label: "15분" },
  ];

  return (
    <SafeAreaView>
      <ScrollView>
        {profileData && profileData !== null && (
          <ProfileContainer>
            <MenuButton setPopMenu={setPopMenu} />
            <LogoutButtonContainer onPress={() => logout()}>
              <IconLogout name="logout" size={24} />
            </LogoutButtonContainer>
            <UpperContainer>
              <ProfileImage />
              <ProfileNickname>
                {profileData.ggomjilak.nickname}
              </ProfileNickname>
              <ProfileEmail>{profileData.ggomjilak.email}</ProfileEmail>
            </UpperContainer>
            <LowerContainer>
              <ProfileLabelText>장소 즐겨찾기</ProfileLabelText>
              <GuideContainer>
                <GuideLineBox>
                  <GuideText color="#5B79E1">자주가는 장소</GuideText>
                  <GuideText color="rgba(0, 0, 0, 0.5)">를 등록해서</GuideText>
                </GuideLineBox>
                <GuideLineBox>
                  <GuideText color="rgba(0, 0, 0, 0.5)">
                    알림 추가 시{" "}
                  </GuideText>
                  <GuideText color="#CE5A5A">편리하게 </GuideText>
                  <GuideText color="rgba(0, 0, 0, 0.5)">찾아보세요!</GuideText>
                </GuideLineBox>
              </GuideContainer>
              <LocationFavorite location={profileData.location} />
              <ProfileLabelText>사용자 추가 정보</ProfileLabelText>
              <GuideContainer>
                <GuideLineBox>
                  <GuideText color="#5B79E1">프리패스</GuideText>
                  <GuideText color="rgba(0, 0, 0, 0.5)">
                    에서는 사용자 추가 정보 설정을 통해
                  </GuideText>
                </GuideLineBox>
                <GuideLineBox>
                  <GuideText color="#CE5A5A">맞춤 출발시간</GuideText>
                  <GuideText color="rgba(0, 0, 0, 0.5)">과 </GuideText>
                  <GuideText color="#CE5A5A">추천 경로</GuideText>
                  <GuideText color="rgba(0, 0, 0, 0.5)">
                    를 안내해드립니다.
                  </GuideText>
                </GuideLineBox>
              </GuideContainer>
              <UserDataContainer>
                <ModalSelector
                  data={data1}
                  style={{
                    position: "absolute",
                  }}
                  touchableStyle={{ display: "none" }}
                  childrenContainerStyle={{ display: "none" }}
                  initValueTextStyle={{ display: "none" }}
                  sectionStyle={{ padding: 10 }}
                  initValue=""
                  cancelText="닫기"
                  onChange={async (option) => {
                    setSpeed(option.key);
                    const req = {
                      speed: option.key,
                      favorites,
                      priority,
                      sparetime,
                      uid: firebase.auth().currentUser.uid,
                    };
                    const { status } = await updateCustom(req);
                    if (status === 200) {
                      setPopModal1(false);
                    }
                  }}
                  onModalClose={() => {
                    setPopModal1(false);
                  }}
                  visible={popModal1}
                />
                <ModalSelector
                  data={data2}
                  style={{
                    position: "absolute",
                  }}
                  touchableStyle={{ display: "none" }}
                  childrenContainerStyle={{ display: "none" }}
                  initValueTextStyle={{ display: "none" }}
                  sectionStyle={{ padding: 10 }}
                  initValue=""
                  cancelText="닫기"
                  onChange={async (option) => {
                    setFavorites(option.key);
                    const req = {
                      speed,
                      favorites: option.key,
                      priority,
                      sparetime,
                      uid: firebase.auth().currentUser.uid,
                    };
                    const { status } = await updateCustom(req);
                    if (status === 200) {
                      setPopModal2(false);
                    }
                  }}
                  onModalClose={() => {
                    setPopModal2(false);
                  }}
                  visible={popModal2}
                />
                <ModalSelector
                  data={data3}
                  style={{
                    position: "absolute",
                  }}
                  touchableStyle={{ display: "none" }}
                  childrenContainerStyle={{ display: "none" }}
                  initValueTextStyle={{ display: "none" }}
                  sectionStyle={{ padding: 10 }}
                  initValue=""
                  cancelText="닫기"
                  onChange={async (option) => {
                    setPriority(option.key);
                    const req = {
                      speed,
                      favorites,
                      priority: option.key,
                      sparetime,
                      uid: firebase.auth().currentUser.uid,
                    };
                    const { status } = await updateCustom(req);
                    if (status === 200) {
                      setPopModal3(false);
                    }
                  }}
                  onModalClose={() => {
                    setPopModal3(false);
                  }}
                  visible={popModal3}
                />
                <ModalSelector
                  data={data4}
                  style={{
                    position: "absolute",
                  }}
                  touchableStyle={{ display: "none" }}
                  childrenContainerStyle={{ display: "none" }}
                  initValueTextStyle={{ display: "none" }}
                  sectionStyle={{ padding: 10 }}
                  initValue=""
                  cancelText="닫기"
                  onChange={async (option) => {
                    setSparetime(option.key);
                    const req = {
                      speed,
                      favorites,
                      priority,
                      sparetime: option.key,
                      uid: firebase.auth().currentUser.uid,
                    };
                    const { status } = await updateCustom(req);
                    if (status === 200) {
                      setPopModal4(false);
                    }
                  }}
                  onModalClose={() => {
                    setPopModal4(false);
                  }}
                  visible={popModal4}
                />
                <UserData
                  icon="directions-walk"
                  title="보행속도"
                  data={customSpeed[speed]}
                  setPopModal={setPopModal1}
                />
                <UserData
                  icon="time-to-leave"
                  title="선호교통수단"
                  data={customFavorites[favorites]}
                  setPopModal={setPopModal2}
                />
                <UserData
                  icon="map"
                  title="경로우선순위"
                  data={customPriority[priority]}
                  setPopModal={setPopModal3}
                />
                <UserData
                  icon="more-time"
                  title="출발여유시간"
                  data={`${sparetime}분`}
                  setPopModal={setPopModal4}
                />
              </UserDataContainer>
            </LowerContainer>
          </ProfileContainer>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
