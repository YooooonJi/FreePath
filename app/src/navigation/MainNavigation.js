import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import Home from "../screens/Home";
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
}) => (
  <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Group"
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
          backgroundColor: "#F9F1F7",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        children={() => (
          <Home setPopMenu={setPopMenu} setPopCardAdd={setPopCardAdd} />
        )}
      />
      <Tab.Screen name="Group" children={() => <Test />} />
      <Tab.Screen
        name="Profile"
        children={() => (
          <Profile
            setPopMenu={setPopMenu}
            setPopLogin={setPopLogin}
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
          />
        )}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default MainNavigation;