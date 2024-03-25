import React, { useContext, useState, useEffect } from "react";
import { Pressable, View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStackNavigator";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { AppContext } from "./context";

const Tab = createBottomTabNavigator();

const CustomSearchButton = ({ children, onPress }) => {
  const { setAppScanning, isAppScanning } = useContext(AppContext);
  const [showTimer, setShowTimer] = useState(false);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    let timerIntervalId;
    if (showTimer && isAppScanning) {
      timerIntervalId = setInterval(() => {
        if (seconds >= 0) {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    }

    return () => {
      setSeconds(60);
      clearInterval(timerIntervalId);
    };
  }, [showTimer]);

  useEffect(() => {
    if (isAppScanning) {
      setShowTimer(true);
    } else {
      setShowTimer(false);
    }
  }, [isAppScanning]);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View
        style={{
          backgroundColor: "green",
          padding: 15,
          borderRadius: 35,
          width: 70,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: -30,
        }}
      >
        <Pressable onPress={() => setAppScanning((prev) => !prev)}>
          {showTimer ? (
            <View>
              <Text style={{ fontSize: 24, color: "white" }}>{seconds}</Text>
            </View>
          ) : (
            <FontAwesome name="search" size={24} color="white" />
          )}

          {children}
        </Pressable>
      </View>
    </View>
  );
};

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
        component={DeleteScreen}
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
