import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "styled-components/native";
import Home from "../screens/Home";
import Group from "../screens/Group";
import Profile from "../screens/Profile";
import Test from "../screens/Test";

// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainNavigation = ({
  setPopMenu,
  setPopLogin,
  setIsLoggedIn,
  isLoggedIn,
  setPopCardAdd,
  popLogin,
  alarmList,
  setAlarmList,
}) => {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "dashboard-customize";
            } else if (route.name === "Group") {
              iconName = "groups";
            } else if (route.name === "Profile") {
              iconName = "person-pin";
            }

            return (
              <Icon
                style={
                  focused && {
                    borderBottomWidth: 3,
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 5,
                    paddingBottom: 5,
                  }
                }
                name={iconName}
                size={30}
                color={color}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: "rgba(0,0,0,1)",
          inactiveTintColor: "rgba(0,0,0,0.3)",
          showLabel: false,
          style: {
            backgroundColor: theme.card.bg,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          children={() => (
            <Home
              setPopMenu={setPopMenu}
              setPopCardAdd={setPopCardAdd}
              isLoggedIn={isLoggedIn}
              alarmList={alarmList}
              setAlarmList={setAlarmList}
            />
          )}
        />
        <Tab.Screen
          name="Group"
          children={() => (
            <Group setPopMenu={setPopMenu} isLoggedIn={isLoggedIn} />
          )}
        />
        <Tab.Screen
          name="Profile"
          children={() => (
            <Profile
              setPopMenu={setPopMenu}
              setPopLogin={setPopLogin}
              popLogin={popLogin}
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
            />
          )}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
