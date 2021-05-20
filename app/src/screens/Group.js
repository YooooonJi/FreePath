import React from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import MenuButton from "../components/Common/MenuButton";
import GroupMember from "../components/Group/GroupMember";
import GroupAlarm from "../components/Group/GroupAlarm";

const GroupScreenContainer = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Group = ({ setPopMenu, isLoggedIn }) => (
  <SafeAreaView>
    <ScrollView>
      {isLoggedIn && (
        <GroupScreenContainer>
          <MenuButton setPopMenu={setPopMenu} />
          <GroupMember />
          {/* <GroupAlarm /> */}
        </GroupScreenContainer>
      )}
    </ScrollView>
  </SafeAreaView>
);

export default Group;
