import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function DisplayPolitician({ item }) {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={item.image}
          style={styles.politicianDP}
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
    alignItems: "center",
    marginLeft: 15,
    padding: 0,
    marginTop: 10,
    marginBottom: 10,
  },
  politicianDP: {
    height: 80,
    width: 80,
    borderRadius: 42,
    borderWidth: 3,
    borderColor: "green",
  },
});
