import { View, Text, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./context";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

export default function CustomSearchButton({ children, onPress }) {
  const SearchTimeLimit = 10;
  const { setAppScanning, isAppScanning, setShowSettingsModal } =
    useContext(AppContext);
  const [showTimer, setShowTimer] = useState(false);
  const [seconds, setSeconds] = useState(SearchTimeLimit);

  const navigation = useNavigation();

  useEffect(() => {
    let timerIntervalId;
    if (showTimer && isAppScanning) {
      timerIntervalId = setInterval(() => {
        setSeconds((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            setShowTimer(false);
            // setAppScanning(false);

            clearInterval(timerIntervalId);
            // navigation.navigate("File");
            return 0;
          }
        });
      }, 1000);
    } else if (isAppScanning && !showTimer) {
      //bug fix, change status of appscanning ONLY after when timer has finished and rendered a relevant change
      setAppScanning(false);
    }

    return () => {
      setSeconds(SearchTimeLimit);
      // setAppScanning(false);
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
        <Pressable
          onPress={() => {
            setAppScanning((prev) => !prev);
          }}
        >
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
}
