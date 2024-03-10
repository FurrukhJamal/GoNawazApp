import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useContext } from "react";
import ModalSettingsContentView from "./ModalSettingsContentView";
import { AppContext } from "./context";
import { Fontisto, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SettingsDrawerTab() {
  const { Width, Height, setShowSettingsModal } = useContext(AppContext);
  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.container, { width: Width, height: Height }]}
      onPress={() => setShowSettingsModal(false)}
    >
      <ModalSettingsContentView
        style={{
          backgroundColor: "white",
          position: "relative",
          width: Width / 2,
          height: Height,
        }}
      >
        <View>
          <Text style={styles.settingsTitle}>Go Nawaz Go</Text>
          <Pressable
            style={styles.row}
            onPressIn={() => navigation.navigate("Settings")}
          >
            <Fontisto name="player-settings" size={22} color="gray" />
            <Text style={{ marginLeft: 15 }}>Settings</Text>
          </Pressable>

          {/* About Button */}
          <Pressable style={styles.row}>
            <AntDesign name="infocirlceo" size={24} color="black" />
            <Text style={{ marginLeft: 15 }}>About</Text>
          </Pressable>
          <Text style={{ marginLeft: 44, fontSize: 14 }}>1.0.1</Text>
        </View>
      </ModalSettingsContentView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },

  settingsTitle: {
    fontSize: 21,
    fontWeight: "bold",
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 10,
    alignItems: "center",
  },
});
