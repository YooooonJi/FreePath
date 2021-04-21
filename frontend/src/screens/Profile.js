import React from "react";
import styled from "styled-components/native";

const ProfileView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const MoveButton = styled.Button``;

const Profile = ({ navigation }) => {
  const onPressMoveHome = () => {
    navigation.navigate("Home");
  };

  return (
    <ProfileView>
      <MoveButton onPress={onPressMoveHome} title="홈 이동" />
    </ProfileView>
  );
};

export default Profile;
