import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStackNavigator";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function BottomTabs({ FileScreen, DeleteScreen }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="File"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="folder"
              size={24}
              color={focused ? "green" : "grey"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Delete"
        component={DeleteScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="delete"
              size={24}
              color={focused ? "green" : "grey"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
