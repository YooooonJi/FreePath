import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Button, Text, Vibration, View } from "react-native";

const TestView = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 50px;
`;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
  handleSuccess: async (notificationId) => {
    console.log(notificationId);
  },
});

const schedulePushNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "융디꿍디님! 지금 멀티캠퍼스 역삼으로 출발하세요! 🚀",
      body: "알람을 끄려면 탭하세요.",
    },
    trigger: { seconds: 10 },
  });
};

const registerForPushNotificationsAsync = async () => {
  let token;

  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Expo 푸시 토큰 획득 실패");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("가상 디바이스에선 일부 푸시알림이 제한됩니다.");
  }

  return token;
};

const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = `0${1 + date.getMonth()}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const Test = () => {
  // axios 테스트 관련
  const [apiStatus, setApiStatus] = useState("");
  const [apiData, setApiData] = useState("");

  // 알림 관련
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener(
        async (notificationListen) => {
          Vibration.vibrate([1000, 1000], true);
          setNotification(notificationListen);
        }
      );

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        async (response) => {
          Vibration.cancel();
          await Notifications.cancelScheduledNotificationAsync(
            response.notification.request.identifier
          );
        }
      );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // const onPressTest1 = () => {
  //   const dateSplit = "2021-05-20 23:35".split(" ");
  //   const split1 = dateSplit[0].split("-");
  //   const split2 = dateSplit[1].split(":");

  //   const arrivetime = new Date(
  //     Date.UTC(split1[0], split1[1] * 1 - 1, split1[2], split2[0], split2[1])
  //   );
  //   const now = new Date();
  //   const nowtime = new Date(
  //     Date.UTC(
  //       now.getFullYear(),
  //       now.getMonth(),
  //       now.getDate(),
  //       now.getHours(),
  //       now.getSeconds()
  //     )
  //   );

  //   console.log(arrivetime);
  //   console.log(nowtime);

  //   console.log((arrivetime - nowtime) / 60000);
  // };

  return (
    <SafeAreaView>
      <TestView>
        <View>
          <Text>
            {"토큰 : "}
            {expoPushToken}
          </Text>
          <Text>
            {"제목 : "}
            {notification && notification.request.content.title}
          </Text>
          <Text>
            {"본문 : "}
            {notification && notification.request.content.body}
          </Text>
          <Button
            title="알람 등록 테스트"
            onPress={async () => {
              await schedulePushNotification();
            }}
          />
          <Button
            title="모든 알람 취소 테스트"
            onPress={async () => {
              Vibration.cancel();
              await Notifications.cancelAllScheduledNotificationsAsync();
            }}
          />
        </View>
        <View>
          <View>
            <Text>
              {"status : "}
              {apiStatus}
            </Text>
            <Text>
              {"data : "}
              {apiData}
            </Text>
          </View>
          <Button title="빈 테스트 1" onPress={onPressTest1} />
          <Button title="빈 테스트 2" onPress={() => {}} />
        </View>
      </TestView>
    </SafeAreaView>
  );
};

export default Test;
