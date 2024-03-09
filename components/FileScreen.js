import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

export default function FileScreen({ route, navigation }) {
  const { showModal } = route.params || {};
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    if (showModal) {
      setIsModalVisible(true);
    }
  }, [showModal]);
  return (
    <View style={styles.container}>
      <Text>FileScreen</Text>
      {isModalVisible && <Text>Modal showing</Text>}
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
