import React from "react";
import styled from "styled-components/native";

const HomeView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  height: 100%;
`;

const MoveButtonContainer = styled.TouchableOpacity`
  background-color: black;
`;

const MoveButtonText = styled.Text`
  color: white;
  padding: 10px 20px;
`;

const Home = ({ navigation }) => {
  const onPressMoveProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <HomeView>
      <MoveButtonContainer onPress={onPressMoveProfile}>
        <MoveButtonText>프로필 이동</MoveButtonText>
      </MoveButtonContainer>
    </HomeView>
  );
};

export default Home;
