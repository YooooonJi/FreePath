import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Icon from "react-native-vector-icons/MaterialIcons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "대시보드") {
              iconName = "dashboard-customize";
            } else if (route.name === "프로필") {
              iconName = "person-pin";
            }

            return <Icon name={iconName} size={size} color={color}></Icon>;
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
        <Tab.Screen name="대시보드" component={Home} />
        <Tab.Screen name="프로필" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
