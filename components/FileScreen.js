import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  PanResponder,
  Animated,
} from "react-native";
import React, { useEffect, useState, useContext, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { AppContext } from "./context";

import ModalSettingsContentView from "./ModalSettingsContentView";
import SettingsDrawerTab from "./SettingsDrawerTab";

export default function FileScreen({ route, navigation }) {
  const { showModal } = route.params || {};

  const { Width, Height } = useContext(AppContext);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const { showSettingsModal, setShowSettingsModal } = useContext(AppContext);

  useFocusEffect(
    React.useCallback(() => {
      console.log("home tab visited");
    }, [])
  );

  useEffect(() => {
    if (showSettingsModal) {
      console.log("showSettingsModal is set to True");
      setIsModalVisible(true);
    } else {
      console.log("showSettingsModal is set to False");
      setIsModalVisible(false);
    }
  }, [showSettingsModal]);

  return (
    <View style={styles.container}>
      <Text>FileScreen</Text>
      {isModalVisible && <SettingsDrawerTab />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "yellow",
  },
});
