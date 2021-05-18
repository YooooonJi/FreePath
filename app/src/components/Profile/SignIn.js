import React, { useState } from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Dimensions } from "react-native";
import firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInContainer = styled.View`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: ${(props) => props.scrHeight}px;
  background-color: ${(props) => props.theme.login.bg};
`;

const SignInUpper = styled.View`
  z-index: 1;
  align-self: center;
  position: absolute;
  width: 90%;
  height: ${(props) => props.scrHeight * 0.5}px;
  margin-top: ${(props) => (props.isFocus ? "10%" : "25%")};
  border-radius: 10px;
  background-color: white;
  elevation: 5;
`;

const IconExitButton = styled.TouchableOpacity`
  padding: 10px;
  margin-left: 5px;
  margin-top: 30px;
`;

const IconExit = styled(Icon)`
  color: white;
`;

const SloganBox = styled.View`
  padding: 0px 20px;
  width: 100%;
  height: 30%;
  justify-content: flex-end;
`;

const SloganText = styled.Text`
  color: black;
  font-size: 28px;
  margin-top: 10px;
  font-weight: bold;
`;

const SignInInputWrapper = styled.View`
  justify-content: center;
  width: 100%;
  height: 70%;
  padding: 0px 15px;
`;

const SignInInputBox = styled.View`
  margin: 20px 0px;
`;

const SignInInputTag = styled.Text`
  font-size: 12px;
  color: #5b79e1;
  margin-bottom: 5px;
  margin-left: 5px;
  font-weight: bold;
`;

const SignInInputInner = styled.View`
  display: flex;
  justify-content: flex-end;
  border-radius: 10px;
  background-color: #f9f1f7;
  elevation: 5;
  padding-left: 10px;
`;

const SignInInputText = styled.TextInput`
  font-size: 12px;
  height: 40px;
`;

const SignInUnder = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: ${(props) => props.scrHeight * 0.45}px;
  height: ${(props) => props.scrHeight * 0.7}px;
  background-color: white;
  elevation: 4;
`;

const SignInButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  border-radius: 10px;
  background-color: #5b79e1;
  elevation: 5;
`;

const SignInButtonText = styled.Text`
  text-align: center;
  color: white;
  font-size: 18px;
  margin-left: 40px;
  font-weight: bold;
`;

const IconArrowForward = styled(Icon)`
  color: white;
  margin-left: 20px;
  margin-bottom: 1px;
`;

const SignUpButton = styled.TouchableOpacity`
  width: 200px;
  height: 50px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const SignUpTagText = styled.Text`
  color: #c29797;
  font-size: 12px;
  margin-bottom: 5px;
`;

const SignUpButtonText = styled.Text`
  color: #c84848;
  font-size: 18px;
  font-weight: bold;
`;

const SignInBottomText = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 12px;
  margin-bottom: 25px;
  color: white;
  text-decoration: underline;
`;

const SignIn = ({ setIsLoggedIn, setPopSignIn, setPopSignUp }) => {
  const screenHeight = Dimensions.get("window").height;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const onPressExit = () => {
    setPopSignIn(false);
  };

  const onPressSignUp = () => {
    setPopSignUp(true);
    setPopSignIn(false);
  };

  const signInWithEmail = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        await AsyncStorage.setItem(
          "credential",
          JSON.stringify(
            firebase.auth.EmailAuthProvider.credential(email, password).toJSON()
          )
        );
        setIsLoggedIn(true);
        setPopSignIn(false);
      })
      .catch((error) => {
        alert(`로그인 실패 : ${error.code}`);
        setIsLoggedIn(false);
      });
  };

  return (
    <SignInContainer scrHeight={screenHeight}>
      <IconExitButton onPress={onPressExit}>
        <IconExit name="close" size={40} />
      </IconExitButton>
      <SignInUpper isFocus={isFocus} scrHeight={screenHeight}>
        <SloganBox>
          <SloganText>어쩌구 저쩌구</SloganText>
          <SloganText>프리패스</SloganText>
        </SloganBox>
        <SignInInputWrapper>
          <SignInInputBox>
            <SignInInputTag>이메일</SignInInputTag>
            <SignInInputInner>
              <SignInInputText
                placeholder="이메일을 입력해주세요."
                onChangeText={setEmail}
                value={email}
                textContentType="emailAddress"
                keyboardType="email-address"
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
              />
            </SignInInputInner>
          </SignInInputBox>
          <SignInInputBox>
            <SignInInputTag>비밀번호</SignInInputTag>
            <SignInInputInner>
              <SignInInputText
                placeholder="비밀번호를 입력해주세요."
                onChangeText={setPassword}
                value={password}
                textContentType="password"
                secureTextEntry
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
              />
            </SignInInputInner>
          </SignInInputBox>
        </SignInInputWrapper>
      </SignInUpper>
      <SignInUnder scrHeight={screenHeight}>
        <SignInButton onPress={signInWithEmail}>
          <SignInButtonText>로그인</SignInButtonText>
          <IconArrowForward name="arrow-forward" size={20} />
        </SignInButton>
        <SignUpButton onPress={onPressSignUp}>
          <SignUpTagText>혹시 계정이 없으신가요?</SignUpTagText>
          <SignUpButtonText>회원가입</SignUpButtonText>
        </SignUpButton>
      </SignInUnder>
      <SignInBottomText>로그인 오류 문의 admin@freepass.com</SignInBottomText>
    </SignInContainer>
  );
};

export default SignIn;
