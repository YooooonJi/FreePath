import React, { useEffect } from "react";
import firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";

const LoadingContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const LoadingText = styled.Text`
  font-size: 24px;
  color: white;
`;

const Loading = ({ setIsLoggedIn, setIsLoaded }) => {
  useEffect(() => {
    console.log("시작");
    const AutoLogin = async () => {
      const value = await AsyncStorage.getItem("credential");
      if (value === null) {
        // 사용자 정보 없을 경우 => 자동 로그인 불가능
        // AsyncStorage에 저장된 대시보드(알림카드) 데이터 가져오기
        setIsLoggedIn(false);
        // 현재 setTimeout으로 3초 로딩 대기 걸어둠
        // AsyncStorage 데이터 state에 넣고 로드 완료 시 페이지 넘어가게 변경 예정
        setTimeout(() => {
          setIsLoaded(true);
        }, 3000);
      } else {
        // 사용자 정보 있을 경우 => 자동 로그인 가능
        // credential 불러온 뒤 자동 로그인 진행
        // DB에 저장된 대시보드(알림카드) 데이터 가져오기
        const credential = JSON.parse(value);
        await firebase
          .auth()
          .signInWithCredential(
            firebase.auth.AuthCredential.fromJSON(credential)
          )
          .then(() => {
            setIsLoggedIn(true);
            // 현재 setTimeout으로 3초 로딩 대기 걸어둠
            // DB 데이터 state에 넣고 로드 완료 시 페이지 넘어가게 변경 예정
            // console.log(firebase.auth().currentUser);
            setTimeout(() => {
              setIsLoaded(true);
            }, 3000);
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            if (errorCode === "auth/account-exists-with-different-credential") {
              alert("Email already associated with another account.");
              // Handle account linking here, if using.
            } else {
              console.error(errorCode);
            }
          });
      }
    };

    AutoLogin();
  }, []);

  return (
    <LoadingContainer>
      <LoadingText>로딩중...</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;
