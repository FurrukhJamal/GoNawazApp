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

  const { showSettingsModal, setShowSettingsModal, isAppScanning, images } =
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
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        nestedScrollEnabled={true}
      >
        <View style={{ height: "100%" }}>
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
              <View style={styles.scanningMessageContainer}>
                <Text style={styles.scanningMessageTitle}>Scanning</Text>
              </View>
            )}
          </View>

          {/* separator */}
          <View style={{ alignItems: "center", width: "100%" }}>
            <View style={styles.lineSeperator} />
          </View>

          {/* View for Images */}
          {!isAppScanning && (
            <View style={styles.fileSectionContainer}>
              {images ? (
                <View style={styles.imagesContainer}>
                  {images?.map((image) => {
                    return (
                      <View
                        key={image.id}
                        style={{
                          width: Width / 3 - 2,
                          height: Width / 3 - 2,
                          padding: 1,
                        }}
                      >
                        <Image
                          source={{ uri: image.uri }}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </View>
                    );
                  })}
                </View>
              ) : (
                <View>
                  <Text>No Images to Show</Text>
                </View>
              )}
            </View>
          )}

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
    marginTop: 10,
    // justifyContent: "center",
  },
  scanningMessageContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  scanningMessageTitle: {
    fontSize: 32,
    color: "lightgray",
    fontWeight: "bold",
  },
  imagesContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
