// Tabs.tsx
import React from "react";
import { StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile";
import Chat from "../screens/Chat";
import Cats from "../screens/Cats";

import CatSvg from "../assets/icons/cat.svg";
import ChatSvg from "../assets/icons/chat.svg";
import ProfileSvg from "../assets/icons/profile.svg";
import type { SvgProps } from "react-native-svg";

import theme from "../theme/theme";


type TabsParamList = {
  Cats: undefined;
  Chat: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

const iconByRoute: Record<keyof TabsParamList, React.FC<SvgProps>> = {
  Cats: CatSvg,
  Chat: ChatSvg,
  Profile: ProfileSvg,
};

const TabsStack = () => {
  return (
    <Tab.Navigator
      id={undefined}
      initialRouteName="Cats"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondary,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIcon: ({ color, size }) => {
          const Icon = iconByRoute[route.name as keyof TabsParamList];
          return <Icon width={size} height={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Cats" component={Cats} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default TabsStack;

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 50,
    height: 64,
    borderRadius: theme.borderRadius,
    width: "50%",
    marginHorizontal: theme.screen.width * 0.25,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.30,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabBarItem: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});