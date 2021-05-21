import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";
import { useFonts } from "expo-font";
import Constants from "expo-constants";
import firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainNavigation from "./src/navigation/MainNavigation";
import Theme from "./src/styles/Theme";
import Menu from "./src/components/Common/Menu/Menu";
import CardAdd from "./src/components/Home/Card/CardAdd";
import Login from "./src/components/Profile/Login";
import SignIn from "./src/components/Profile/SignIn";
import NotoSansKRBlack from "./src/assets/fonts/NotoSansKR-Black.otf";
import NotoSansKRBold from "./src/assets/fonts/NotoSansKR-Bold.otf";
import NotoSansKRMedium from "./src/assets/fonts/NotoSansKR-Medium.otf";
import NotoSansKRRegular from "./src/assets/fonts/NotoSansKR-Regular.otf";
import NotoSansKRLight from "./src/assets/fonts/NotoSansKR-Light.otf";
import NotoSansKRThin from "./src/assets/fonts/NotoSansKR-Thin.otf";
import SignUp from "./src/components/Profile/SignUp";
import Loading from "./src/screens/Loading";
import GroupCardAdd from "./src/components/Group/GroupCardAdd";

const firebaseConfig = {
  apiKey: Constants.manifest.extra.firebaseApiKey,
  authDomain: Constants.manifest.extra.firebaseAuthDomain,
  projectId: Constants.manifest.extra.firebaseProjectId,
  storageBucket: Constants.manifest.extra.firebaseStorageBucket,
  messagingSenderId: Constants.manifest.extra.firebaseMessagingSenderId,
  appId: Constants.manifest.extra.firebaseAppId,
  measurementId: Constants.manifest.extra.firebaseMeasurementId,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const App = () => {
  const [loaded] = useFonts({
    6: NotoSansKRBlack,
    5: NotoSansKRBold,
    4: NotoSansKRMedium,
    3: NotoSansKRRegular,
    2: NotoSansKRLight,
    1: NotoSansKRThin,
  });

  const [darkMode, setDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [popMenu, setPopMenu] = useState(false);
  const [popCardAdd, setPopCardAdd] = useState(false);
  const [popGroupCardAdd, setPopGroupCardAdd] = useState(false);
  const [popLogin, setPopLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [popSignIn, setPopSignIn] = useState(false);
  const [popSignUp, setPopSignUp] = useState(false);

  // 대시보드 알람 들어있는 전체 리스트
  // 홈 진입 시 로그인/비로그인에 따라 API or Storage 데이터 불러온 뒤 저장
  // 알람카드 추가 시 뒤에 추가됨
  // 상태 변경 시 대시보드 rerendering 됨
  const [alarmList, setAlarmList] = useState([]);
  const [groupAlarmList, setGroupAlarmList] = useState([]);

  const [members, setMembers] = useState([]);

  useEffect(() => {
    const AsyncStorageInit = async () => {
      const alarmCount = await AsyncStorage.getItem("alarmCount");
      // console.log(alarmCount);

      if (alarmCount === null) {
        await AsyncStorage.setItem("alarmCount", "0");
      }
    };

    AsyncStorageInit();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={darkMode ? Theme.DefaultTheme : Theme.DefaultTheme}>
      <SafeAreaProvider>
        {isLoaded && (
          <MainNavigation
            setPopMenu={setPopMenu}
            setPopCardAdd={setPopCardAdd}
            setPopLogin={setPopLogin}
            setIsLoggedIn={setIsLoggedIn}
            popLogin={popLogin}
            isLoggedIn={isLoggedIn}
            alarmList={alarmList}
            setAlarmList={setAlarmList}
            members={members}
            setMembers={setMembers}
            setPopGroupCardAdd={setPopGroupCardAdd}
          />
        )}
      </SafeAreaProvider>
      {!isLoaded && (
        <Loading setIsLoggedIn={setIsLoggedIn} setIsLoaded={setIsLoaded} />
      )}
      {popMenu && (
        <Menu
          setPopMenu={setPopMenu}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}
      {popCardAdd && (
        <CardAdd
          setPopCardAdd={setPopCardAdd}
          isLoggedIn={isLoggedIn}
          alarmList={alarmList}
          setAlarmList={setAlarmList}
        />
      )}
      {popGroupCardAdd && (
        <GroupCardAdd
          setPopGroupCardAdd={setPopGroupCardAdd}
          isLoggedIn={isLoggedIn}
          groupAlarmList={groupAlarmList}
          setGroupAlarmList={setGroupAlarmList}
          members={members}
        />
      )}
      {popLogin && !isLoggedIn && (
        <Login
          setPopLogin={setPopLogin}
          setIsLoggedIn={setIsLoggedIn}
          setPopSignIn={setPopSignIn}
        />
      )}
      {popSignIn && !isLoggedIn && (
        <SignIn
          setIsLoggedIn={setIsLoggedIn}
          setPopSignIn={setPopSignIn}
          setPopSignUp={setPopSignUp}
        />
      )}
      {popSignUp && !isLoggedIn && (
        <SignUp setPopSignIn={setPopSignIn} setPopSignUp={setPopSignUp} />
      )}
    </ThemeProvider>
  );
};

export default App;
