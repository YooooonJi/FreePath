import React, { useEffect } from "react";
import firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";

const LoadingContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #5b79e1;
`;

const LoadingText = styled.Text`
  font-size: 32px;
  color: white;
  font-weight: bold;
`;

const Loading = ({ setIsLoggedIn, setIsLoaded }) => {
  useEffect(() => {
    console.log("시작");
    const AutoLogin = async () => {
      const value = await AsyncStorage.getItem("credential");
      if (value === null) {
        // 사용자 정보 없을 경우 => 자동 로그인 불가능
        setIsLoggedIn(false);
        setTimeout(() => {
          setIsLoaded(true);
        }, 3000);
      } else {
        // 사용자 정보 있을 경우 => 자동 로그인 가능
        const credential = JSON.parse(value);
        await firebase
          .auth()
          .signInWithCredential(
            firebase.auth.AuthCredential.fromJSON(credential)
          )
          .then(() => {
            setIsLoggedIn(true);
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
      <LoadingText>프리패스</LoadingText>
      <LoadingText>LOADING</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;
