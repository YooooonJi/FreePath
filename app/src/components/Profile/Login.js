import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import kakaologo from "../../assets/logos/kakao.png";
import naverlogo from "../../assets/logos/naver.png";
import googlelogo from "../../assets/logos/google.png";

const LoginContainer = styled.View`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0px 20px;
  background-color: ${(props) => props.theme.login.bg};
`;

const LoginTopBox = styled.View`
  width: 100%;
  height: 45%;
`;

const IconExitButton = styled.TouchableOpacity`
  padding: 10px;
  margin-left: -15px;
  margin-bottom: 80px;
  margin-top: 30px;
`;

const IconExit = styled(Icon)`
  color: white;
`;

const SloganText = styled.Text`
  color: white;
  font-size: 28px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const LoginButtonBox = styled.View``;

// 로그인 버튼 컴포넌트화 예정 및 아이콘 추가 + elevation 가려지는거 해결..

const SocialLoginTouch = styled.TouchableOpacity`
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.bgColor};
  border-radius: 10px;
  padding: 0px 30px;
  margin: 10px 0px;
  elevation: 10;
`;

const SocialLoginButtonText = styled.Text`
  width: 100%;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  color: ${(props) => props.textColor};
`;

const SocialLoginButtonIcon = styled.Image`
  width: 28px;
  height: 28px;
`;

const EmailLoginTouch = styled.TouchableOpacity`
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  padding: 0px 30px;
  margin: 10px 0px;
  border: 1px;
  border-color: white;
`;

const EmailLoginButtonText = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const LoginBottomText = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 12px;
  margin-bottom: 25px;
  color: white;
  text-decoration: underline;
`;

const Login = ({ setPopLogin, setPopSignIn }) => {
  const onPressExit = () => {
    setPopLogin(false);
  };

  const onPressEmailLogin = () => {
    setPopSignIn(true);
    setPopLogin(false);
  };

  return (
    <LoginContainer>
      <LoginTopBox>
        <IconExitButton onPress={onPressExit}>
          <IconExit name="close" size={40} />
        </IconExitButton>
        <SloganText style={{ fontSize: 24 }}>개인 맞춤형</SloganText>
        <SloganText style={{ fontSize: 24 }}>대중교통 알림 서비스</SloganText>
        <SloganText style={{ fontSize: 48 }}>프리패스</SloganText>
      </LoginTopBox>
      <LoginButtonBox>
        <SocialLoginTouch bgColor="#FFDC02">
          <SocialLoginButtonIcon source={kakaologo} resizeMode="contain" />
          <SocialLoginButtonText textColor="#000000">
            카카오톡으로 로그인
          </SocialLoginButtonText>
        </SocialLoginTouch>
        <SocialLoginTouch bgColor="#1EC800">
          <SocialLoginButtonIcon source={naverlogo} resizeMode="contain" />
          <SocialLoginButtonText textColor="#FFFFFF">
            네이버로 로그인
          </SocialLoginButtonText>
        </SocialLoginTouch>
        <SocialLoginTouch bgColor="#EA6565">
          <SocialLoginButtonIcon source={googlelogo} resizeMode="contain" />
          <SocialLoginButtonText textColor="#FFFFFF">
            Google로 로그인
          </SocialLoginButtonText>
        </SocialLoginTouch>
        <EmailLoginTouch onPress={onPressEmailLogin}>
          <EmailLoginButtonText>이메일 로그인/회원가입</EmailLoginButtonText>
        </EmailLoginTouch>
      </LoginButtonBox>
      <LoginBottomText>로그인 오류 문의 admin@freepass.com</LoginBottomText>
    </LoginContainer>
  );
};

export default Login;
