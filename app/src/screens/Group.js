import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import firebase from "firebase";
import MenuButton from "../components/Common/MenuButton";
import GroupMember from "../components/Group/GroupMember";
import GroupAlarm from "../components/Group/GroupAlarm";
import {
  getGroupMember,
  findProfileByEmail,
  getGroupCount,
  getAllGroupAlarm,
} from "../api/GroupApi";

const GroupScreenContainer = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Group = ({
  setPopMenu,
  setPopLogin,
  popLogin,
  isLoggedIn,
  setPopGroupCardAdd,
  members,
  setMembers,
}) => {
  const [isVisited, setIsVisited] = useState(false);

  const [isActive, setIsActive] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [groupCnt, setGroupCnt] = useState();

  const [groupAlarmList, setGroupAlarmList] = useState([]);

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const asyncFindProfileByEmail = async () => {
        const req = {
          email: firebase.auth().currentUser.email,
        };

        const { status, data } = await findProfileByEmail(req);

        if (status === 200) {
          setMembers([data]);
        }
      };

      const asyncGetGroupMember = async () => {
        const req = { uid: firebase.auth().currentUser.uid };
        const { status, data } = await getGroupMember(req);

        if (status === 500) {
          // 그룹 없을 경우
          asyncFindProfileByEmail();
          setIsActive(true);
        } else if (status === 200) {
          // 그룹 있을 경우
          // 주시 온
          setIsActive(true);
        }
      };

      if (isLoggedIn) {
        asyncGetGroupMember();
      } else if (!isVisited) {
        setPopLogin(true);
        setIsVisited(true);
      } else {
        setIsVisited(false);
        navigation.navigate("Home");
      }
    }, [isCreated, isLoggedIn, popLogin])
  );

  useFocusEffect(
    useCallback(() => {
      const asyncGetGroupMember = async () => {
        const req = { uid: firebase.auth().currentUser.uid };
        const { status, data } = await getGroupMember(req);

        if (status === 200) {
          console.log(data);
          setMembers(data);
        }
      };

      if (isLoggedIn) {
        asyncGetGroupMember();
      }

      if (isActive) {
        setSeconds(seconds + 1);
      }
    }, [isActive])
  );

  useFocusEffect(
    useCallback(() => {
      let timer;
      if (isLoggedIn) {
        if (isActive) {
          timer = setInterval(async () => {
            setSeconds(seconds + 1);
            if (members.length === 1) {
              const req = { uid: firebase.auth().currentUser.uid };
              const { status, data } = await getGroupMember(req);

              if (status === 200) {
                // 그룹 있을 경우
                setMembers(data);
              }
            } else {
              // 그룹알람 카운트 변경 체크
              // 카운트 변경 됐으면 또 트리거 setGroupCnt
              const req = { uid: firebase.auth().currentUser.uid };
              const { status, data } = await getGroupCount(req);

              if (status === 200) {
                console.log("주시 중");
                setGroupCnt(data.galarmcnt);
              }
            }
          }, 3000);
        }
      }
      return () => clearInterval(isActive ? timer : "");
    }, [seconds])
  );

  useFocusEffect(
    useCallback(() => {
      const asyncGetAllGroupAlarm = async () => {
        const req = { uid: firebase.auth().currentUser.uid };
        const { status, data } = await getAllGroupAlarm(req);
        if (status === 200) {
          setGroupAlarmList(data);
        }
      };

      if (isLoggedIn) {
        asyncGetAllGroupAlarm();
      }
    }, [groupCnt])
  );

  return (
    <SafeAreaView>
      <ScrollView>
        {isLoggedIn && members.length !== 0 && (
          <GroupScreenContainer>
            <MenuButton setPopMenu={setPopMenu} />
            <GroupMember
              setIsCreated={setIsCreated}
              members={members}
              setMembers={setMembers}
            />
            <GroupAlarm
              groupAlarmList={groupAlarmList}
              setPopGroupCardAdd={setPopGroupCardAdd}
            />
          </GroupScreenContainer>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Group;
