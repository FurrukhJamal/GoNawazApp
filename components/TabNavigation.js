import React, { useContext, useState, useEffect, useRef } from "react";
import { Pressable, View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStackNavigator";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { AppContext } from "./context";
import { useNavigation } from "@react-navigation/native";
import CustomSearchButton from "./CustomSearchButton";

const Tab = createBottomTabNavigator();

export default function BottomTabs({ FileScreen, DeleteScreen }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          // height: 150,
        },
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
        name="Search"
        component={HomeStack}
        options={{
          tabBarButton: (props) => <CustomSearchButton {...props} />,
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
