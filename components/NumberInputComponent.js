import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import PropTypes from "prop-types";

export default function NumberInputComponent(props) {
  const [value, setValue] = props?.maxRange
    ? useState(Math.floor(props.maxRange / 2))
    : useState(40);

  const stepUp = 10;
  function increment() {
    if (value < props.maxRange && value + stepUp < props.maxRange) {
      setValue((prev) => prev + stepUp);
    }
  }

  function decrement() {
    if (value - stepUp > 0) {
      setValue((prev) => prev - stepUp);
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={{ width: "100%", flexDirection: "row", alignItems: "center" }}
      >
        <Pressable onPress={decrement}>
          <AntDesign
            name="caretleft"
            size={24}
            color={props?.color ? props.color : "black"}
          />
        </Pressable>

        <TextInput
          value={value.toString()}
          readOnly={true}
          style={{
            padding: 10,
            backgroundColor: "lightgray",
            color: "black",
            fontSize: 17,
          }}
        />
        <Pressable onPress={increment}>
          <AntDesign
            name="caretright"
            size={24}
            color={props?.color ? props.color : "black"}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

NumberInputComponent.propTypes = {
  color: PropTypes.string.isRequired,
  maxRange: PropTypes.number.isRequired,
};
