import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import firebase from "firebase";
import { getGroupMember } from "../../api/GroupApi";

const GroupMemberContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 200px;
  background-color: ${(props) => props.theme.profile.bg};
  padding: 0 60px;
  padding-top: 70px;
`;

const MemberContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const MemberImage = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: 3px solid #f4e7e7;
  background-color: ${(props) => props.theme.board.bg};
  elevation: 3;
`;

const MemberText = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: bold;
  margin-top: 10px;
`;

const IconAddCircle = styled(Icon)`
  color: ${(props) => props.theme.board.bg};
  elevation: 3;
`;

const GroupMember = () => {
  const [memberCnt, setMemberCnt] = useState(1);
  const member = [
    <MemberContainer>
      <MemberImage />
      <MemberText>닉네임</MemberText>
    </MemberContainer>,
  ];
  const memberAddButton = [];

  useEffect(() => {
    const asyncGetGroupMember = async () => {
      const req = { uid: firebase.auth().currentUser.uid };
      const { status, data } = await getGroupMember(req);

      if (status === 200 && data !== "") {
        console.log(`그룹 멤버 있음 : ${data}`);
        setMemberCnt(data.length);
      }
    };

    asyncGetGroupMember();
  });

  const addGroupMember = () => {
    alert("Add Group Member");
    // email 입력 받고 email 검색 결과를 통해 멤버 추가
  };

  for (let cnt = 0; cnt < 4 - memberCnt; cnt += 1) {
    memberAddButton.push(
      <IconAddCircle
        name="add-circle"
        size={50}
        onPress={() => addGroupMember()}
      />
    );
  }

  return (
    <GroupMemberContainer>
      {member}
      {memberAddButton}
    </GroupMemberContainer>
  );
};

export default GroupMember;
