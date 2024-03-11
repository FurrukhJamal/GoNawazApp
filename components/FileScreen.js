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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ height: Height }}>
          <View style={{ height: 150, paddingTop: 6 }}>
            <FlatList
              data={data}
              renderItem={DisplayPolitician}
              keyExtractor={(item, index) => index}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          {/* separator */}
          <View style={{ alignItems: "center", width: "100%" }}>
            <View
              style={{
                width: "90%",
                borderTopColor: "rgba(192, 192, 192, 0.5)",
                borderTopWidth: 4,
              }}
            />
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>FileScreen</Text>
          </View>
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

function DisplayPolitician({ item }) {
  console.log("display politican hitting");
  return (
    <View
      style={{
        alignItems: "center",
        marginLeft: 15,
        padding: 0,
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={item.image}
          style={{
            height: 80,
            width: 80,
            borderRadius: 42,
            borderWidth: 3,
            borderColor: "green",
          }}
          resizeMethod="auto"
        />
      </View>
      <View style={{ marginTop: 2 }}>
        <Text>{item.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "pink",
  },
});
