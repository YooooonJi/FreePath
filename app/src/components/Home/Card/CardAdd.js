import React from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const CardAddContainer = styled.View`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const CardAddBgOpacity = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CardAddInner = styled.View`
  display: flex;
  background-color: white;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: absolute;
  bottom: 0;
  padding: 20px;
`;

const TitleText = styled.Text`
  margin-bottom: 10px;
  color: black;
  font-size: 18px;
  font-weight: bold;
`;

const SubTitleContainer = styled.View`
  margin-top:15px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SubTitleText = styled.Text`
  color: black;
  font-size: 15px;
  font-weight: bold;
`;

const SelectContainer = styled.View`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const SelectBox = styled.TouchableOpacity`
  margin-right: 10px;
  padding: 5px 10px 5px 10px;
  height: 25px;
  border-radius: 8px;
  background-color: #ce5a5a;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SelectText = styled.Text`
  margin-left: 8px;
  color: white;
  font-size: 13px;
  font-weight: bold;
`;

const InputContainer = styled.View`
  margin-top: 10px;
  padding: 5px 10px 5px 10px;
  width: 100%;
  height: 30px;
  border-radius: 10px;
  background-color: #f9f1f7;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  elevation: 3;
`;

const InputBox = styled.TextInput`
  width: 90%;
  height: 30px;
`;

const ButtonContainer = styled.View`
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const ButtonBox = styled.TouchableOpacity`
  width: 150px;
  height: 40px;
  border-radius: 10px;
  background-color: #f9f1f7;
  display: flex;
  justify-content: center;
  align-items: center;
  elevation: 3;
`;

const ButtonText = styled.Text`
  color: rgba(0, 0, 0, 0.25);
  font-size: 18px;
  font-weight: bold;
`;

const CardAdd = ({ setPopCardAdd }) => (
  <CardAddContainer>
    <CardAddBgOpacity onPress={() => setPopCardAdd(false)} />
    <CardAddInner>
      <TitleText>알림 추가</TitleText>
      <SubTitleContainer>
        <SubTitleText>알림 이름</SubTitleText>
      </SubTitleContainer>
      <InputContainer>
        <InputBox placeholder="알림 이름을 입력해주세요. (최대 10글자)" />
      </InputContainer>
      <SubTitleContainer>
        <SubTitleText>종류 선택</SubTitleText>
      </SubTitleContainer>
      <SelectContainer>
        <SelectBox>
          <Icon name="directions-bus" size={15} color="#FFFFFF" />
          <SelectText>버스</SelectText>
        </SelectBox>
        <SelectBox>
          <Icon name="tram" size={15} color="#FFFFFF" />
          <SelectText>지하철</SelectText>
        </SelectBox>
        <SelectBox>
          <Icon name="map" size={15} color="#FFFFFF" />
          <SelectText>경로</SelectText>
        </SelectBox>
      </SelectContainer>
      <InputContainer>
        <InputBox placeholder="정류장을 입력해주세요." />
        <Icon name="search" size={15} color="rgba(0, 0, 0, 0.5)" />
      </InputContainer>
      <InputContainer>
        <InputBox placeholder="버스를 입력해주세요." />
        <Icon name="search" size={15} color="rgba(0, 0, 0, 0.5)" />
      </InputContainer>
      <SubTitleContainer>
        <SubTitleText>출발 시간 설정</SubTitleText>
        <Icon name="info" size={15} color="#000000" />
      </SubTitleContainer>
      <SelectContainer>
        <SelectBox>
          <Icon name="bedtime" size={15} color="#FFFFFF" />
          <SelectText>막차</SelectText>
        </SelectBox>
        <SelectBox>
          <Icon name="access-time" size={15} color="#FFFFFF" />
          <SelectText>시간 선택</SelectText>
        </SelectBox>
      </SelectContainer>
      <ButtonContainer>
        <ButtonBox onPress={() => alert("저장")}>
          <ButtonText>저장</ButtonText>
        </ButtonBox>
        <ButtonBox onPress={() => setPopCardAdd(false)}>
          <ButtonText>취소</ButtonText>
        </ButtonBox>
      </ButtonContainer>
    </CardAddInner>
  </CardAddContainer>
);

export default CardAdd;
