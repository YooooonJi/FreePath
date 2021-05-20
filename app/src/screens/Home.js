import React, { useCallback, useState } from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import firebase from "firebase";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Carousel from "../assets/images/carousel_0.jpg";
import Card from "../components/Home/Card";
import MenuButton from "../components/Common/MenuButton";
import { getAllRoute } from "../api/RouteApi";

const HomeContainer = styled.View`
  display: flex;
  align-items: center;
  height: 100%;
`;

// 캐러셀 컴포넌트 분리 예정

const CarouselContainer = styled.View`
  position: relative;
  width: 100%;
  height: 200px;
`;

const CarouselImage = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const CarouselBgOpacity = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  background-color: ${(props) => props.theme.carousel.bg};
`;

const CarouselTextBox = styled.View`
  display: flex;
  justify-content: flex-end;
  height: 100%;
  padding-left: 20px;
  padding-bottom: 40px;
`;

const CarouselText = styled.Text`
  color: ${(props) => props.theme.carousel.text};
  font-size: 18px;
  line-height: 20px;
  font-family: "5";
  margin-top: 5px;
`;

// 보드 컴포넌트 분리 예정

const BoardContainer = styled.View`
  display: flex;
  width: 100%;
  min-height: ${(props) => props.boardHeight}px;
  background-color: ${(props) =>
    !props.setup ? props.theme.board.bg : "rgba(0, 0, 0, 0.5)"};
  padding-left: 10px;
  padding-right: 10px;
`;

const BoardLabelBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  margin-top: 20px;
`;

const BoardLabelTagText = styled.Text`
  color: ${(props) => props.theme.board.label.title};
  font-size: 15px;
  line-height: 17px;
  font-family: "5";
`;

const BoardLabelSetupText = styled.Text`
  color: ${(props) => (!props.setup ? props.theme.board.label.setup : "white")};
  font-size: 15px;
  line-height: 17px;
  font-family: "5";
`;

// 카드 컴포넌트 분리 예정

const CardContainer = styled.View`
  margin-top: 15px;
  margin-bottom: 15px;
  width: 100%;
  height: 80px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.card.bg};
  display: flex;
  justify-content: center;
  align-items: center;
  elevation: 3;
`;

const IconAddCircle = styled(Icon)`
  color: ${(props) => props.theme.card.add};
`;

const GuideContainer = styled.View`
  align-self: center;
  margin-top: 20px;
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

const Home = ({
  setPopMenu,
  setPopCardAdd,
  isLoggedIn,
  alarmList,
  setAlarmList,
}) => {
  const screenHeight = Dimensions.get("window").height;

  const [setup, setSetup] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const asyncGetAllRoute = async () => {
        const req = { uid: firebase.auth().currentUser.uid };

        const { status, data } = await getAllRoute(req);

        if (status === 200) {
          // console.log(data);
          setAlarmList(data);
        } else {
          console.log(status);
          console.log(data);
        }
      };

      const asyncGetAllRouteWithout = async () => {
        const alarmArray = [];
        const alarmCount = await AsyncStorage.getItem("alarmCount");
        // console.log(alarmCount);

        for (let i = 0; i < alarmCount; i += 1) {
          const curData = await AsyncStorage.getItem(`alarmData${i}`);
          alarmArray.push(JSON.parse(curData));
        }

        // console.log(alarmArray);
        setAlarmList(alarmArray);
      };

      if (isLoggedIn) {
        asyncGetAllRoute();
      } else {
        asyncGetAllRouteWithout();
      }
    }, [isLoggedIn])
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <HomeContainer>
          <MenuButton setPopMenu={setPopMenu} />
          <CarouselContainer>
            <CarouselImage source={Carousel} />
            <CarouselBgOpacity />
            <CarouselTextBox>
              <CarouselText>늦은 밤,</CarouselText>
              <CarouselText>당신의 귀가를</CarouselText>
              <CarouselText>책임지겠습니다.</CarouselText>
            </CarouselTextBox>
          </CarouselContainer>
          <BoardContainer setup={setup} boardHeight={screenHeight - 273}>
            <BoardLabelBox>
              <BoardLabelTagText>내 알림</BoardLabelTagText>
              {alarmList.length > 0 && (
                <BoardLabelSetupText
                  setup={setup}
                  onPress={() => setSetup(!setup)}
                >
                  {setup ? "완료" : "편집"}
                </BoardLabelSetupText>
              )}
            </BoardLabelBox>
            {alarmList &&
              alarmList.map((al, index) => (
                <Card key={index} data={al} setup={setup} />
              ))}
            {!setup && alarmList && alarmList.length === 0 && (
              <GuideContainer>
                <GuideLineBox>
                  <GuideText color="rgba(0, 0, 0, 0.5)">안녕하세요! </GuideText>
                  <GuideText color="#5B79E1">+ 버튼</GuideText>
                  <GuideText color="rgba(0, 0, 0, 0.5)">을 눌러서</GuideText>
                </GuideLineBox>
                <GuideLineBox>
                  <GuideText color="rgba(0, 0, 0, 0.5)">당신의 </GuideText>
                  <GuideText color="#CE5A5A">첫 알림을</GuideText>
                  <GuideText color="#rgba(0, 0, 0, 0.5)">
                    {" "}
                    등록해보세요!
                  </GuideText>
                </GuideLineBox>
              </GuideContainer>
            )}
            {!setup && (
              <CardContainer>
                <IconAddCircle
                  name="add-circle"
                  size={40}
                  onPress={() => setPopCardAdd(true)}
                />
              </CardContainer>
            )}
          </BoardContainer>
        </HomeContainer>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;
