import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  PanResponder,
  Animated,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useEffect, useState, useContext, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { AppContext } from "./context";

import ModalSettingsContentView from "./ModalSettingsContentView";
import SettingsDrawerTab from "./SettingsDrawerTab";
import { ScrollView } from "react-native-gesture-handler";
import { FlatList } from "react-native";
import { data } from "../constants";
import DisplayPolitician from "./DisplayPolitician";

export default function FileScreen({ route, navigation }) {
  const { showModal } = route.params || {};

  const { Width, Height } = useContext(AppContext);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const { showSettingsModal, setShowSettingsModal, isAppScanning } =
    useContext(AppContext);

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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ height: Height }}>
          <View style={styles.politicianListContainer}>
            {!isAppScanning ? (
              <FlatList
                data={data}
                renderItem={DisplayPolitician}
                keyExtractor={(item, index) => index}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            ) : (
              // Scanning message Area
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 32,
                    color: "lightgray",
                    fontWeight: "bold",
                  }}
                >
                  Scanning
                </Text>
                <Text
                  style={{ marginLeft: 20, fontSize: 18, fontWeight: "800" }}
                >
                  /Downloads
                </Text>
              </View>
            )}
          </View>
          {/* separator */}
          <View style={{ alignItems: "center", width: "100%" }}>
            <View style={styles.lineSeperator} />
          </View>

          <View style={styles.fileSectionContainer}>
            <Text>FileScreen</Text>
          </View>
          {/* settings drawer model */}
          {isModalVisible && (
            <View style={{ position: "absolute", top: 0 }}>
              <SettingsDrawerTab />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "pink",
  },
  politicianListContainer: {
    height: 150,
    paddingTop: 6,
  },
  lineSeperator: {
    width: "90%",
    borderTopColor: "rgba(192, 192, 192, 0.5)",
    borderTopWidth: 4,
  },
  fileSectionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
