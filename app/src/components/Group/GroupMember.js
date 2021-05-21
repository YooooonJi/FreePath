import React, { useState } from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import firebase from "firebase";
import ModalSelector from "react-native-modal-selector";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { findProfileByEmail, createGroup } from "../../api/GroupApi";
import LionProfile from "../../assets/images/lion_profile.png";
import CornProfile from "../../assets/images/corn_profile.png";

const GroupMemberContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 200px;
  background-color: ${(props) => props.theme.profile.bg};
  padding: 0 60px;
`;

const MemberContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const MemberImage = styled.Image`
  width: 60px;
  height: 60px;
  background-color: ${(props) => props.theme.board.bg};
  margin-top: 26px;
`;

const MemberText = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: bold;
  margin-top: 10px;
`;

const IconAddCircle = styled(Icon)`
  color: ${(props) => props.theme.board.bg};
  border-radius: 50px;
  elevation: 3;
`;

const DataView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DataTextInput = styled.TextInput`
  padding: 5px;
  width: 100%;
  text-align: center;
`;

const DataTouchable = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
`;

const GroupMember = ({ members, setIsCreated }) => {
  const memberAddButton = [];

  const [popModal1, setPopModal1] = useState(false);
  const [email1, setEmail1] = useState();
  const [latitude1, setLatitude1] = useState();
  const [longitude1, setLongitude1] = useState();

  const [searchData, setSearchData] = useState("");

  // useEffect(() => {
  //   const asyncGetGroupMember = async () => {
  //     const req = { uid: firebase.auth().currentUser.uid };
  //     const { status, data } = await getGroupMember(req);

  //     if (status === 200 && data !== "") {
  //       console.log(`그룹 멤버 있음 : ${data}`);
  //       setMemberCnt(data.length);
  //     }
  //   };

  //   asyncGetGroupMember();
  // });

  const onPressAddCircle = () => {
    setPopModal1(true);
  };

  for (let cnt = 0; cnt < 4 - members.length; cnt += 1) {
    memberAddButton.push(
      <IconAddCircle
        key={cnt}
        name="add-circle"
        size={60}
        onPress={() => onPressAddCircle()}
      />
    );
  }

  const asyncSearchUser = async () => {
    const req = { email: email1 };

    const { status, data } = await findProfileByEmail(req);

    if (status === 200) {
      setSearchData(data);
      setEmail1(data.nickname);
    }
  };

  const data1 = [
    { key: 0, section: true, label: "그룹 초대하기" },
    {
      key: 1,
      label: "",
      component: (
        <DataView>
          <DataTextInput
            value={email1}
            placeholder="이메일 입력"
            onChangeText={setEmail1}
          />
          <DataTouchable onPress={() => asyncSearchUser()}>
            <MaterialIcons name="search" size={20} color="rgba(0, 0, 0, 1)" />
          </DataTouchable>
        </DataView>
      ),
    },
  ];

  return (
    <GroupMemberContainer>
      <ModalSelector
        data={data1}
        style={{
          position: "absolute",
        }}
        touchableStyle={{ display: "none" }}
        childrenContainerStyle={{ display: "none" }}
        initValueTextStyle={{ display: "none" }}
        optionStyle={{ padding: 0 }}
        optionTextStyle={{ display: "none" }}
        optionContainerStyle={{ padding: 0 }}
        sectionStyle={{ padding: 10 }}
        initValue=""
        cancelText="초대"
        onModalClose={async () => {
          const req = {
            uids: [firebase.auth().currentUser.uid, searchData.uid],
          };

          const { status, data } = await createGroup(req);

          if (status === 200) {
            setIsCreated(true);
            setPopModal1(false);
          }
        }}
        visible={popModal1}
      />
      {members &&
        members.map((mem, index) => (
          <MemberContainer key={index}>
            <MemberImage
              source={index % 2 === 0 ? LionProfile : CornProfile}
              borderRadius={50}
              style={{ borderWidth: 3, borderColor: "#f4e7e7" }}
            />
            <MemberText>{mem.nickname}</MemberText>
          </MemberContainer>
        ))}
      {memberAddButton}
    </GroupMemberContainer>
  );
};

export default GroupMember;
